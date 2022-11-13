import React from "react";
import IncomingFriendRequestsScreenComponent from "./IncomingFriendRequestsScreenComponent";
import { IFriendRequestItem } from "../../services/friendRequestTypes";

const IncomingFriendRequestsScreenContainer = () => {
    const handleUserProfileClick = (userId: string) => {
        console.log("handleUserProfileClick: " + userId);
    };

    const handleAcceptFriendRequestButtonClick = (friendRequestId: string) => {
        console.log("handleAcceptFriendRequestButtonClick: " + friendRequestId);
    };

    const handleDeclineFriendRequestButtonClick = (friendRequestId: string) => {
        console.log("handleDeclineFriendRequestButtonClick: " + friendRequestId);
    };

    const handleLoadMoreFriendRequestItemsButtonClick = () => {
        console.log("handleLoadMoreFriendRequestItemsButtonClick");
    };

    return (
        <IncomingFriendRequestsScreenComponent
            friendRequestItems={mockFriendRequestItems}
            onUserProfileClick={handleUserProfileClick}
            onAcceptFriendRequestButtonClick={handleAcceptFriendRequestButtonClick}
            onDeclineFriendRequestButtonClick={handleDeclineFriendRequestButtonClick}
            friendRequestItemsLoading={false}
            loadMoreFriendRequestItemsButtonVisible={true}
            onLoadMoreFriendRequestItemsButtonClick={handleLoadMoreFriendRequestItemsButtonClick}
        />
    );
};

export default IncomingFriendRequestsScreenContainer;

const mockFriendRequestItems: IFriendRequestItem[] = [
    { id: "0", userId: "0", userName: "Naruto Uzumaki" },
    { id: "1", userId: "1", userName: "Sasuke Uchiha" },
    { id: "2", userId: "2", userName: "Tanjiro Kamado" },
    { id: "3", userId: "3", userName: "Takumi Fujiwara" },
    { id: "4", userId: "4", userName: "Hinata Hyuga" },
];
