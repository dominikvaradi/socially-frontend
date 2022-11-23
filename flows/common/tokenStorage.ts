import { TokenStorageKey } from "./services/commonTypes";

class TokenStorage {
    save = (accessToken: string, refreshToken: string, userId: string, userName: string) => {
        localStorage.setItem(TokenStorageKey.ACCESS_TOKEN, accessToken);
        localStorage.setItem(TokenStorageKey.REFRESH_TOKEN, refreshToken);
        localStorage.setItem(TokenStorageKey.USER_ID, userId);
        localStorage.setItem(TokenStorageKey.USER_NAME, userName);
    };

    removeAll = () => {
        localStorage.removeItem(TokenStorageKey.ACCESS_TOKEN);
        localStorage.removeItem(TokenStorageKey.REFRESH_TOKEN);
        localStorage.removeItem(TokenStorageKey.USER_ID);
        localStorage.removeItem(TokenStorageKey.USER_NAME);
    };

    getAccessToken = () => localStorage.getItem(TokenStorageKey.ACCESS_TOKEN);

    setAccessToken = (accessToken: string) => {
        localStorage.setItem(TokenStorageKey.ACCESS_TOKEN, accessToken);
    };

    getRefreshToken = () => localStorage.getItem(TokenStorageKey.REFRESH_TOKEN);

    setRefreshToken = (refreshToken: string) => {
        localStorage.setItem(TokenStorageKey.REFRESH_TOKEN, refreshToken);
    };

    getUserId = () => localStorage.getItem(TokenStorageKey.USER_ID);

    getUserName = () => localStorage.getItem(TokenStorageKey.USER_NAME);
}

export default new TokenStorage();
