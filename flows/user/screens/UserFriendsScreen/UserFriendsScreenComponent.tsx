import React from "react";
import MainLayout from "../../../common/components/MainLayout";
import UserNameAvatar from "../../../common/components/UserNameAvatar";
import ProfileLayout from "../../components/ProfileLayout";
import { IFriendItem } from "../../services/userTypes";
import ColorModeSpinner from "../../../common/components/ColorModeSpinner";
import { Button, useColorMode } from "@chakra-ui/react";

type TProps = {
    userName: string;
    friends: IFriendItem[];
    friendsLoading: boolean;
    loadMoreFriendsButtonVisible: boolean;
    onLoadMoreFriendsButtonClick: () => void;
    onUserProfileClick: (userId: string) => void;
    userSelf: boolean;
    alreadyFriend: boolean;
    friendRequestIncoming: boolean;
    friendRequestAlreadySent: boolean;
};

const UserFriendsScreenComponent = ({
    userName,
    friends,
    friendsLoading,
    loadMoreFriendsButtonVisible,
    onLoadMoreFriendsButtonClick,
    onUserProfileClick,
    userSelf,
    alreadyFriend,
    friendRequestIncoming,
    friendRequestAlreadySent,
}: TProps) => {
    const { colorMode } = useColorMode();

    const itemHoverStyle = `lg:hover:bg-brand-100 ${colorMode === "dark" ? "lg:hover:text-black" : ""}`;
    const itemActiveStyle = `active:bg-brand-300 lg:hover:bg-brand-100 lg:hover:active:bg-brand-300 ${
        colorMode === "dark" ? "active:text-black" : ""
    }`;

    return (
        <MainLayout>
            <ProfileLayout
                userName={userName}
                activeTab="friends"
                userSelf={userSelf}
                alreadyFriend={alreadyFriend}
                friendRequestIncoming={friendRequestIncoming}
                friendRequestAlreadySent={friendRequestAlreadySent}
            >
                <div className="flex w-full justify-center py-8 px-4 sm:px-0 sm:pl-16">
                    {(userSelf || alreadyFriend) && (
                        <div
                            className={`flex w-full max-w-[1200px] flex-col gap-2 rounded-md p-4 drop-shadow-md sm:w-[80%] ${
                                colorMode === "dark" ? "bg-slate-600" : "bg-white"
                            }`}
                        >
                            <span className="mb-2 text-2xl font-medium">Barátok</span>
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
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
                            </div>
                            {friends.length === 0 && !friendsLoading && (
                                <p className="text-center">Nem található barát.</p>
                            )}
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
                    )}
                    {!userSelf && !alreadyFriend && (
                        <div
                            className={`flex w-full max-w-[1200px] flex-col gap-2 rounded-md p-4 drop-shadow-md sm:w-[80%] ${
                                colorMode === "dark" ? "bg-slate-600" : "bg-white"
                            }`}
                        >
                            <p>
                                <span className="font-semibold">{userName}</span> még nem a barátod, ezért nem láthatod
                                a barátait.
                            </p>
                        </div>
                    )}
                </div>
            </ProfileLayout>
        </MainLayout>
    );
};

export default UserFriendsScreenComponent;
