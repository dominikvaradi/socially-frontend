import { RegisterFormValues } from "../onboardingTypes";
import { UserCreateRequestDto } from "../../../../generated/api";

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
const formatDateToJSONString = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;
};
