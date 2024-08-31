"use client";

import { userStore } from "@/zustand/user";
import HomeTabs from "./Tabs";
import LoginBanner from "../../LoginBanner";
import RecentlyPlayed from "./RecentlyPlayed";
import { useEffect, useState } from "react";
import { checkToken } from "@/helper/checkToken";
import axios from "axios";
import Category from "./Category";

export default function LeftContent() {
  const { user } = userStore();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchSeveralBrowseCategories = async () => {
      const { data } = await axios.get(`/api/browse/categories`);

      console.log(data.categories);
      setCategories(data.categories);
    };

    checkToken(fetchSeveralBrowseCategories);
  }, [user]);

  return (
    <div className={`flex flex-col gap-4 @container`}>
      {!user && (
        <section>
          <LoginBanner />
        </section>
      )}

      {user && (
        <>
          {/* Categories */}
          {categories.items?.slice(0, 1).map((category, i) => {
            return (
              <section key={category.id}>
                <Category id={category.id} title={category.name} />
              </section>
            );
          })}

          {/* Playlists, Artists, Albums, Streams */}
          <section>
            <HomeTabs />
          </section>

          <section>
            <RecentlyPlayed />
          </section>

          {categories?.items?.slice(1, categories.items.length).map((category, i) => {
            return (
              <section key={category.id}>
                <Category id={category.id} title={category.name} />
              </section>
            );
          })}
        </>
      )}

      {/* Playlist of the Day & Video */}
      {/* <section className={`flex flex-col gap-4 @2xl:flex-row`}> */}
      {/* Playlist of the Day */}
      {/* <div className={`flex justify-center md:justify-start`}>
          <PlaylistOfTheDay />
        </div> */}

      {/* Video */}
      {/* <span>Video</span> */}
      {/* </section> */}
    </div>
  );
}
