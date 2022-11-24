import { AxiosPromise } from "axios";
import {
    RestApiResponseDtoUserCreateResponseDto,
    RestApiResponseDtoUserLoginResponseDto,
    UserCreateRequestDto,
    UserLoginRequestDto,
} from "../../../../generated/api";
import { authApi } from "../../../common/apiHandler";

export const onboardingApi = {
    loginUser: (userLoginRequestDto: UserLoginRequestDto): AxiosPromise<RestApiResponseDtoUserLoginResponseDto> =>
        authApi().loginUser(userLoginRequestDto),

    createUser: (userCreateRequestDto: UserCreateRequestDto): AxiosPromise<RestApiResponseDtoUserCreateResponseDto> =>
        authApi().createUser(userCreateRequestDto),
};
