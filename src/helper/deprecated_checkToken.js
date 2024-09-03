import axios from "axios";

export const checkToken = async (fetch) => {
  const interval = setInterval(async () => {
    const { data } = await axios.get(`/api/check-token`);

    if (data) {
      clearInterval(interval);
      fetch();
    }
  }, 1000);
};
