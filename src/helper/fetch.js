import axios from "axios";

export const fetchCurrentUserPlaybackState = async ({
  setPlayback,
  setIsLoading,
}) => {
  setIsLoading(true);
  const { data } = await axios.get(`/api/me/player`);
  setIsLoading(false);

  setPlayback(data);
};
