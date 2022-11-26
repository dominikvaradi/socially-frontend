import { IUser } from "../../userTypes";
import { UserProfileResponseDto } from "../../../../../generated/api";

export const transformUserProfileResponseDto2IUser = (userProfileResponseDto: UserProfileResponseDto): IUser => {
    return {
        id: userProfileResponseDto.id,
        name: `${userProfileResponseDto.lastName} ${userProfileResponseDto.firstName}`,
        birthDate: new Date(userProfileResponseDto.birthDate),
        birthCountry: userProfileResponseDto.birthCountry,
        birthCity: userProfileResponseDto.birthCity,
        currentCountry: userProfileResponseDto.currentCountry,
        currentCity: userProfileResponseDto.currentCity,
        userEqualSelf: userProfileResponseDto.equalToCurrentUser,
        userAlreadyFriend: userProfileResponseDto.friendshipStatusOfCurrentUser === "FRIENDSHIP_REQUEST_ACCEPTED",
        friendRequestIncomingOfUser:
            userProfileResponseDto.friendshipStatusOfCurrentUser === "FRIENDSHIP_REQUEST_SENT" &&
            !userProfileResponseDto.friendshipStatusLastModifierEqualToCurrentUser,
        friendRequestAlreadySentToUser:
            userProfileResponseDto.friendshipStatusOfCurrentUser === "FRIENDSHIP_REQUEST_SENT" &&
            !!userProfileResponseDto.friendshipStatusLastModifierEqualToCurrentUser,
        friendshipId: userProfileResponseDto.friendshipId,
    };
};
