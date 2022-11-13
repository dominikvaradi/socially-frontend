import React, { useState } from "react";
import OutgoingFriendRequestsScreenComponent from "./OutgoingFriendRequestsScreenComponent";
import { IFriendRequestItem } from "../../services/friendRequestTypes";

const OutgoingFriendRequestsScreenContainer = () => {
    const [loadingRevokeFriendRequestButtonList, setLoadingRevokeFriendRequestButtonList] = useState<string[]>([]);

    const handleUserProfileClick = (userId: string) => {
        console.log("handleUserProfileClick: " + userId);
    };

    const handleRevokeFriendRequestButtonClick = (friendRequestId: string) => {
        setLoadingRevokeFriendRequestButtonList((currentList) => [...currentList, friendRequestId]);

        setTimeout(() => {
            setLoadingRevokeFriendRequestButtonList((currentList) =>
                currentList.filter((value) => value !== friendRequestId)
            );
            console.log("handleRevokeFriendRequestButtonClick: " + friendRequestId);
        }, 1500);
    };

    const handleLoadMoreFriendRequestItemsButtonClick = () => {
        console.log("handleLoadMoreFriendRequestItemsButtonClick");
    };

    const isRevokeFriendRequestButtonLoading = (friendRequestId: string): boolean => {
        return !!loadingRevokeFriendRequestButtonList.find((value) => value === friendRequestId);
    };

    return (
        <OutgoingFriendRequestsScreenComponent
            friendRequestItems={mockFriendRequestItems}
            onUserProfileClick={handleUserProfileClick}
            onRevokeFriendRequestButtonClick={handleRevokeFriendRequestButtonClick}
            friendRequestItemsLoading={false}
            loadMoreFriendRequestItemsButtonVisible={true}
            onLoadMoreFriendRequestItemsButtonClick={handleLoadMoreFriendRequestItemsButtonClick}
            isRevokeFriendRequestButtonLoading={isRevokeFriendRequestButtonLoading}
        />
    );
};

export default OutgoingFriendRequestsScreenContainer;

const mockFriendRequestItems: IFriendRequestItem[] = [
    { id: "0", userId: "0", userName: "Naruto Uzumaki" },
    { id: "1", userId: "1", userName: "Sasuke Uchiha" },
    { id: "2", userId: "2", userName: "Tanjiro Kamado" },
    { id: "3", userId: "3", userName: "Takumi Fujiwara" },
    { id: "4", userId: "4", userName: "Hinata Hyuga" },
];
