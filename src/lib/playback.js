import axios from "axios";

const checkUser = (user) => {
  if (!user) {
    document.getElementById("loginAlert").showModal();
    return;
  }
};

export const playSong = async ({ user, device, uri, uris = [] }) => {
  checkUser(user);

  const types = ["album", "playlist"];

  const [spotify, type, id] = uri.split(":");

  await axios.request({
    method: "PUT",
    url: `/api/me/player/play`,
    params: {
      device_id: device.device_id,
    },
    data: JSON.stringify(
      types.includes(type) ? { context_uri: uri } : { uris: [uri, ...uris] },
    ),
  });
};

export const startRadio = async ({ user, device, uri, artists }) => {
  checkUser(user);

  const [artist] = artists;
  const [spotify, type, id] = uri.split(":");

  const [genres] = await Promise.all([
    axios.get(`/api/artists/${artist.id}`).then(({ data: { genres } }) => genres),
  ]);

  // Get Recommendations
  const {
    data: { tracks: queues },
  } = await axios.get(`/api/recommendations`, {
    params: {
      seed_tracks: id,
      seed_artists: artists.map(({ id }) => id).join(","),
      seed_genres: genres.filter((genre) => genresSeed.includes(genre)),
    },
  });

  // Play Song
  playSong({ user, device, uri, uris: queues.map(({ uri }) => uri) });
};