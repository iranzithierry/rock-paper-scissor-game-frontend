export const BACKEND_HOST = "http://127.0.0.1:8000"
const BACKEND_URLS = {
    SIGNUP: `${BACKEND_HOST}/api/v1/users/`,
    LOGIN: `${BACKEND_HOST}/api/v1/token/`,
    GET_NEW_ACCESS_TOKEN: `${BACKEND_HOST}/api/v1/token/refresh/`,
    SEARCH: `${BACKEND_HOST}/api/v1/users/?search={query}&ordering=username&limit=10`,
    GAMES: `${BACKEND_HOST}/api/v1/games/`,

}

export default BACKEND_URLS;
