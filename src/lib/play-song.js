import { fetchData } from "@/server/actions";

export const playSong = async (user, device, type, uri) => {
  if (!user) document.getElementById("loginAlert").showModal();

  const types = ["album", "playlist"];

  await fetchData(`/me/player/play`, {
    params: {
      device_id: device.device_id,
    },
    method: "PUT",
    data: JSON.stringify(
      types.includes(type) ? { context_uri: uri } : { uris: [uri] },
    ),
  });
};
