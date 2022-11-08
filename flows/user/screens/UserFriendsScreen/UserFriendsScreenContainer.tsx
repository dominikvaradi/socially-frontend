import React from "react";
import UserFriendsScreenComponent from "./UserFriendsScreenComponent";
import { IFriendItem } from "../../services/userTypes";

const UserFriendsScreenContainer = () => {
    const handleLoadMoreFriendsButtonClick = () => {};

    const handleUserProfileClick = (userId: string) => {
        console.log("handleUserProfileClick: " + userId);
    };

    return (
        <UserFriendsScreenComponent
            friends={mockFriends}
            friendsLoading={false}
            loadMoreFriendsButtonVisible={true}
            onLoadMoreFriendsButtonClick={handleLoadMoreFriendsButtonClick}
            onUserProfileClick={handleUserProfileClick}
        />
    );
};

const mockFriends: IFriendItem[] = [
    {
        id: "0",
        userId: "0",
        userName: "Naruto Uzumaki",
    },
    {
        id: "1",
        userId: "1",
        userName: "Sasuke Uchiha",
    },
    {
        id: "2",
        userId: "2",
        userName: "Hinata Hyuga",
    },
    {
        id: "3",
        userId: "3",
        userName: "Sakura Haruno",
    },
    {
        id: "4",
        userId: "4",
        userName: "Sakura Haruno",
    },
    {
        id: "5",
        userId: "4",
        userName: "Sakura Haruno",
    },
    {
        id: "6",
        userId: "4",
        userName: "Sakura Haruno",
    },
    {
        id: "7",
        userId: "4",
        userName: "Sakura Haruno",
    },
    {
        id: "8",
        userId: "4",
        userName: "Sakura Haruno",
    },
    {
        id: "9",
        userId: "4",
        userName: "Sakura Haruno",
    },
    {
        id: "10",
        userId: "4",
        userName: "Sakura Haruno",
    },
];

export default UserFriendsScreenContainer;
