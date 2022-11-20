import axios, { AxiosInstance } from "axios";
import { AuthControllerApi, Configuration, ConfigurationParameters } from "../../../generated/api";
import tokenStorage from "./tokenStorage";

const defaultApiConfigurationParameters: ConfigurationParameters = {
    basePath: "/api",
};

const createConfiguration = (): Configuration => new Configuration(defaultApiConfigurationParameters);

const retrieveAccessToken = (): string => tokenStorage.getAccessToken() ?? "undefined";

const handleRefreshToken = async (): Promise<boolean> => {
    const api = new AuthControllerApi(createConfiguration());

    try {
        const response = await api.refreshToken({
            refreshToken: tokenStorage.getRefreshToken() ?? "undefined",
        });

        if (!response.data.data) return false;

        tokenStorage.setAccessToken(response.data.data.accessToken.token);
        tokenStorage.setRefreshToken(response.data.data.refreshToken.token);

        return true;
    } catch (error) {
        tokenStorage.removeAll();
        window.location.assign("/login");
        return false;
    }
};

const createAxiosInstance = (useAuthorization: boolean): AxiosInstance => {
    const axiosInstance = axios.create();

    if (!useAuthorization) return axiosInstance;

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

                const result = await handleRefreshToken();
                if (!result) {
                    return Promise.reject(error);
                }

                config.headers = {
                    ...config.headers,
                    authorization: `Bearer ${retrieveAccessToken()}`,
                };

                return axiosInstance(config);
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const authApi = (useAuthorization: boolean = true) =>
    new AuthControllerApi(createConfiguration(), undefined, createAxiosInstance(useAuthorization));
