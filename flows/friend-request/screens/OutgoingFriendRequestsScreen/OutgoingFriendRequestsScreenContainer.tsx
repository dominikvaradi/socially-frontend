import React, { useEffect, useState } from "react";
import OutgoingFriendRequestsScreenComponent from "./OutgoingFriendRequestsScreenComponent";
import { useCommonContext } from "../../../common/services/commonContext";
import { useFriendRequestContext } from "../../services/friendRequestContext";

const OutgoingFriendRequestsScreenContainer = () => {
    const { controller: commonController } = useCommonContext();
    const { store, controller } = useFriendRequestContext();

    const [loadingRevokeFriendRequestButtonList, setLoadingRevokeFriendRequestButtonList] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            await commonController.initMainLayout();
            await controller.initOutgoingFriendRequestsScreen();
        })();
    }, [commonController, controller]);

    const handleUserProfileClick = (userId: string) => {
        controller.navigateToUserTimelinePage(userId);
    };

    const handleRevokeFriendRequestButtonClick = async (friendRequestId: string) => {
        setLoadingRevokeFriendRequestButtonList((currentList) => [...currentList, friendRequestId]);

        await controller.revokeOutgoingFriendRequest(friendRequestId);

        setLoadingRevokeFriendRequestButtonList((currentList) =>
            currentList.filter((value) => value !== friendRequestId)
        );
    };

    const handleLoadMoreFriendRequestItemsButtonClick = () => {
        controller.loadMoreOutgoingFriendRequests();
    };

    const isRevokeFriendRequestButtonLoading = (friendRequestId: string): boolean => {
        return !!loadingRevokeFriendRequestButtonList.find((value) => value === friendRequestId);
    };

    const handleIncomingFriendRequestsButtonClick = () => {
        controller.navigateToIncomingFriendRequestsPage();
    };

    const handleOutgoingFriendRequestsButtonClick = () => {
        controller.navigateToOutgoingFriendRequestsPage();
    };

    return (
        <OutgoingFriendRequestsScreenComponent
            friendRequestItems={store.outgoingFriendRequestsScreenStore.friendRequestItems}
            onUserProfileClick={handleUserProfileClick}
            onRevokeFriendRequestButtonClick={handleRevokeFriendRequestButtonClick}
            friendRequestItemsLoading={store.outgoingFriendRequestsScreenStore.friendRequestItemsLoading}
            loadMoreFriendRequestItemsButtonVisible={
                store.outgoingFriendRequestsScreenStore.friendRequestItems.length <
                store.outgoingFriendRequestsScreenStore.friendRequestItemsTotalElementCount
            }
            onLoadMoreFriendRequestItemsButtonClick={handleLoadMoreFriendRequestItemsButtonClick}
            isRevokeFriendRequestButtonLoading={isRevokeFriendRequestButtonLoading}
            onIncomingFriendRequestsButtonClick={handleIncomingFriendRequestsButtonClick}
            onOutgoingFriendRequestsButtonClick={handleOutgoingFriendRequestsButtonClick}
        />
    );
};

export default OutgoingFriendRequestsScreenContainer;
