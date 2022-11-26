import { UserProfileResponseDto } from "../../../../../generated/api";
import { UserEditFormValues } from "../../userTypes";

export const transformUserProfileResponseDto2UserEditFormValues = (
    userProfileResponseDto: UserProfileResponseDto
): UserEditFormValues => {
    return {
        firstName: userProfileResponseDto.firstName,
        lastName: userProfileResponseDto.lastName,
        birthDate: new Date(userProfileResponseDto.birthDate),
        birthCountry: userProfileResponseDto.birthCountry ?? "",
        birthCity: userProfileResponseDto.birthCity ?? "",
        currentCountry: userProfileResponseDto.currentCountry ?? "",
        currentCity: userProfileResponseDto.currentCity ?? "",
    };
};
