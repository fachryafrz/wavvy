import LoadingCard from "@/components/Loading/Card";
import PlaylistCardLong from "@/components/Playlist/CardLong";
import { checkToken } from "@/helper/checkToken";
import { useAuth } from "@/hooks/auth";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TabPlaylists() {
  const { user } = useAuth();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchCurrentUserPlaylists = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`/api/me/playlists`);
      setIsLoading(false);

      setData(data);
    };

    checkToken(fetchCurrentUserPlaylists);
  }, [user]);

  return (
    <div>
      {isLoading && (
        <div className={`flex flex-col`}>
          {[...Array(3)].map((_, i) => (
            <LoadingCard responsive={true} info={false} />
          ))}
        </div>
      )}

      {!isLoading &&
        data?.items.length > 0 &&
        data.items.map((playlist, i) => {
          return <PlaylistCardLong key={playlist.id} playlist={playlist} />;
        })}
    </div>
  );
}
