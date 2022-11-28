import axios, { AxiosInstance } from "axios";
import {
    AuthControllerApi,
    CommentControllerApi,
    Configuration,
    ConfigurationParameters,
    ConversationControllerApi,
    FriendshipControllerApi,
    MessageControllerApi,
    PostControllerApi,
    UserControllerApi,
} from "../../generated/api";
import tokenStorage from "./tokenStorage";

const defaultApiConfigurationParameters: ConfigurationParameters = {
    basePath: "/api",
};

const createConfiguration = (): Configuration => new Configuration(defaultApiConfigurationParameters);

const retrieveAccessToken = (): string => tokenStorage.getAccessToken() ?? "undefined";

const createAxiosInstance = (useAuthorization: boolean = true): AxiosInstance => {
    const axiosInstance = axios.create();

    if (!useAuthorization) {
        axiosInstance.defaults.validateStatus = () => true;
        return axiosInstance;
    }

    axiosInstance.interceptors.request.use(
        async (config) => {
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${retrieveAccessToken()}`,
            };

            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const config = error?.config;

            if (error?.response?.status === 401 && !config?.sent) {
                config.sent = true;

                const refreshTokenResponse = await authApi().refreshToken({
                    refreshToken: tokenStorage.getRefreshToken() ?? "undefined",
                });

                if (!refreshTokenResponse?.data?.data || refreshTokenResponse.status === 401) {
                    tokenStorage.removeAll();
                    window.location.assign("/login");
                    return Promise.resolve(refreshTokenResponse);
                }

                tokenStorage.setAccessToken(refreshTokenResponse.data.data.accessToken.token);
                tokenStorage.setRefreshToken(refreshTokenResponse.data.data.refreshToken.token);

                config.headers = {
                    ...config.headers,
                    authorization: `Bearer ${retrieveAccessToken()}`,
                };

                return axiosInstance(config);
            }
            return Promise.resolve(error.response);
        }
    );

    return axiosInstance;
};

export const authApi = () => new AuthControllerApi(createConfiguration(), undefined, createAxiosInstance(false));
export const userApi = () => new UserControllerApi(createConfiguration(), undefined, createAxiosInstance());
export const conversationApi = () =>
    new ConversationControllerApi(createConfiguration(), undefined, createAxiosInstance());
export const postApi = () => new PostControllerApi(createConfiguration(), undefined, createAxiosInstance());
export const commentApi = () => new CommentControllerApi(createConfiguration(), undefined, createAxiosInstance());
export const friendshipApi = () => new FriendshipControllerApi(createConfiguration(), undefined, createAxiosInstance());
export const messageApi = () => new MessageControllerApi(createConfiguration(), undefined, createAxiosInstance());
