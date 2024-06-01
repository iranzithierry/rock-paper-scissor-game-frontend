import  axios  from "../axios";
import { getCookie } from "../cookies";
import COOKIE_NAMES from "@/constants/cookies-names";

const axiosAuth = axios

axiosAuth.interceptors.request.use(
    async (config) => {
        if (!config.headers["Authorization"]) {
            const accessToken = await getCookie(COOKIE_NAMES.ACCESS_TOKEN)
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosAuth.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
);
export default axiosAuth;