import { RegisterFormValues } from "../../onboardingTypes";
import { UserCreateRequestDto } from "../../../../../generated/api";
import { formatDateToJSONString } from "../../../../common/services/commonUtils";

export const transformRegisterFormValues2UserCreateRequestDto = (
    registerFormValues: RegisterFormValues
): UserCreateRequestDto => {
    return {
        email: registerFormValues.email,
        password: registerFormValues.password,
        firstName: registerFormValues.firstName,
        lastName: registerFormValues.lastName,
        birthDate: formatDateToJSONString(registerFormValues.birthDate),
        birthCountry: registerFormValues.birthCountry ? registerFormValues.birthCountry : undefined,
        birthCity: registerFormValues.birthCity ? registerFormValues.birthCity : undefined,
        currentCountry: registerFormValues.currentCountry ? registerFormValues.currentCountry : undefined,
        currentCity: registerFormValues.currentCity ? registerFormValues.currentCity : undefined,
    };
};
