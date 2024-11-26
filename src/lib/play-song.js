import { fetchData } from "@/server/actions";

export const playSong = async (user, device, uri, artists) => {
  if (!user) {
    document.getElementById("loginAlert").showModal();
    return;
  }

  const types = ["album", "playlist"];
  const seedTypes = ["artist", "track", "genre"];

  const [app, type, id] = uri.split(":");

  // const {
  //   data: { tracks: queues },
  // } = await fetchData(`/recommendations`, {
  //   params: {
  //     seed_tracks: id,
  //     seed_artists: artists.map(({ id }) => id).join(","),
  //   },
  // });

  await fetchData(`/me/player/play`, {
    params: {
      device_id: device.device_id,
    },
    method: "PUT",
    data: JSON.stringify(
      types.includes(type) ? { context_uri: uri } : { uris: [uri] },
    ),
  }).then(() => {
    const volumeStateLocalStorage = localStorage.getItem("volume-state");

    fetchData(`/me/player/volume`, {
      method: "PUT",
      params: {
        volume_percent: Number(volumeStateLocalStorage) || 0,
        device_id: device.id,
      },
    });
  });
};
