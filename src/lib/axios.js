import Axios from "axios";
import { cookies } from "next/headers";
import { SPOTIFY_AUTHORIZATION } from "./constants";

const cookiesStore = cookies();

const axios = Axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${cookiesStore.get(SPOTIFY_AUTHORIZATION)}`,
  },
});

export default axios;
