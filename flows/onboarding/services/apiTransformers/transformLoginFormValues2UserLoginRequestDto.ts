import { LoginFormValues } from "../onboardingTypes";
import { UserLoginRequestDto } from "../../../../generated/api";

export const transformLoginFormValues2UserLoginRequestDto = (loginFormValues: LoginFormValues): UserLoginRequestDto => {
    return {
        email: loginFormValues.email,
        password: loginFormValues.password,
    };
};
