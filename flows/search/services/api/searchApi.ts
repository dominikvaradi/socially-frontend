import { AxiosPromise } from "axios";
import { RestApiResponseDtoPageResponseDtoUserSearchResponseDto } from "../../../../generated/api";
import { userApi } from "../../../common/apiHandler";

export const searchApi = {
    fetchSearchItemUsers: (
        searchTerm: string,
        page: number,
        size: number
    ): AxiosPromise<RestApiResponseDtoPageResponseDtoUserSearchResponseDto> =>
        userApi().findAllUsersByName(searchTerm, page, size),
};
