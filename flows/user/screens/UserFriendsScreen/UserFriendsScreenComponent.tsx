import React from "react";
import MainLayout from "../../../common/components/MainLayout";
import UserNameAvatar from "../../../common/components/UserNameAvatar";
import ProfileLayout from "../../components/ProfileLayout";
import { IFriendItem } from "../../services/userTypes";
import ColorModeSpinner from "../../../common/components/ColorModeSpinner";
import { Button, useColorMode } from "@chakra-ui/react";

type TProps = {
    friends: IFriendItem[];
    friendsLoading: boolean;
    loadMoreFriendsButtonVisible: boolean;
    onLoadMoreFriendsButtonClick: () => void;
    onUserProfileClick: (userId: string) => void;
};

const UserFriendsScreenComponent = ({
    friends,
    friendsLoading,
    loadMoreFriendsButtonVisible,
    onLoadMoreFriendsButtonClick,
    onUserProfileClick,
}: TProps) => {
    const { colorMode } = useColorMode();

    const itemHoverStyle = `lg:hover:bg-brand-100 ${colorMode === "dark" ? "lg:hover:text-black" : ""}`;
    const itemActiveStyle = `active:bg-brand-300 lg:hover:bg-brand-100 lg:hover:active:bg-brand-300 ${
        colorMode === "dark" ? "active:text-black" : ""
    }`;

    return (
        <MainLayout>
            <ProfileLayout userName="Naruto Uzumaki" activeTab="friends">
                <div className="flex w-full justify-center py-8 px-4 sm:px-0 sm:pl-16">
                    <div
                        className={`flex w-full flex-col space-y-2 rounded-md p-4 drop-shadow-md sm:w-max sm:max-w-[80%] lg:min-w-[400px] lg:max-w-[800px] ${
                            colorMode === "dark" ? "bg-slate-600" : "bg-white"
                        }`}
                    >
                        <span className="mb-2 text-2xl font-medium">Barátok</span>
                        {friends.map((f) => (
                            <div
                                key={f.id}
                                onClick={() => onUserProfileClick(f.userId)}
                                className={`flex cursor-pointer select-none items-center space-x-2 rounded-lg p-1 ${itemHoverStyle} ${itemActiveStyle}`}
                            >
                                <UserNameAvatar size="lg" userName={f.userName} />
                                <span className="text-lg leading-none">{f.userName}</span>
                            </div>
                        ))}
                        {friends.length === 0 && !friendsLoading && <p className="text-center">Nem található barát.</p>}
                        {friends.length === 0 && friendsLoading && (
                            <div className="flex justify-center">
                                <ColorModeSpinner size="lg" />
                            </div>
                        )}
                        {friends.length > 0 && loadMoreFriendsButtonVisible && (
                            <div className="flex justify-center">
                                <Button
                                    colorScheme="brand"
                                    variant="ghost"
                                    onClick={onLoadMoreFriendsButtonClick}
                                    isLoading={friendsLoading}
                                    spinner={<ColorModeSpinner size="lg" />}
                                >
                                    Több barát betöltése
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </ProfileLayout>
        </MainLayout>
    );
};

export default UserFriendsScreenComponent;
