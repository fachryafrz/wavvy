"use client";

import { userStore } from "@/zustand/user";
import HomeTabs from "./Tabs";
import LoginBanner from "../../LoginBanner";
import RecentlyPlayed from "./RecentlyPlayed";
import { useEffect, useState } from "react";
import { checkToken } from "@/helper/checkToken";
import axios from "axios";
import Category from "./Category";

export default function LeftContent({ categories, categoriesPlaylists }) {
  const { user } = userStore();

  return (
    <div className={`flex flex-col gap-4 @container`}>
      {/* Categories */}
      {categories.items?.slice(0, 1).map((category, i) => {
        return (
          <section key={category.id}>
            <Category
              id={category.id}
              title={category.name}
              data={categoriesPlaylists.find(
                (cp) => cp.message === category.name,
              )}
            />
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

      {categories.items?.slice(1, categories.length).map((category, i) => {
        return (
          <section key={category.id}>
            <Category
              id={category.id}
              title={category.name}
              data={categoriesPlaylists.find(
                (cp) => cp.message === category.name,
              )}
            />
          </section>
        );
      })}
    </div>
  );
}
