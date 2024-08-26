import Axios from "axios";
import { cookies } from "next/headers";
import { spotify_authorization } from "./constants";

const cookiesStore = cookies();

const axios = Axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${cookiesStore.get(spotify_authorization)}`,
  },
});

export default axios;
