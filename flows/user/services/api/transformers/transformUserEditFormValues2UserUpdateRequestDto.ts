import { UserEditFormValues } from "../../userTypes";
import { UserUpdateRequestDto } from "../../../../../generated/api";
import { formatDateToJSONString } from "../../../../common/services/commonUtils";

export const transformUserEditFormValues2UserUpdateRequestDto = (
    userEditFormValues: UserEditFormValues
): UserUpdateRequestDto => {
    return {
        firstName: userEditFormValues.firstName,
        lastName: userEditFormValues.lastName,
        birthDate: formatDateToJSONString(userEditFormValues.birthDate),
        birthCountry: userEditFormValues.birthCountry ? userEditFormValues.birthCountry : undefined,
        birthCity: userEditFormValues.birthCity ? userEditFormValues.birthCity : undefined,
        currentCountry: userEditFormValues.currentCountry ? userEditFormValues.currentCountry : undefined,
        currentCity: userEditFormValues.currentCity ? userEditFormValues.currentCity : undefined,
    };
};
