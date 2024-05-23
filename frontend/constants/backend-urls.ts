const HOST = "http://127.0.0.1:8000"
const BACKEND_URLS = {
    SIGNUP: `${HOST}/api/v1/users/`,
    LOGIN: `${HOST}/api/v1/token/`,
    GET_NEW_ACCESS_TOKEN: `${HOST}/api/v1/token/refresh/`,
    SEARCH: `${HOST}/api/v1/users/?search={query}&ordering=username&limit=10`,
    GAMES: `${HOST}/api/v1/games/`,

}

export default BACKEND_URLS;
