import React, { useEffect, useState } from "react";
import IncomingFriendRequestsScreenComponent from "./IncomingFriendRequestsScreenComponent";
import { useCommonContext } from "../../../common/services/commonContext";
import { useFriendRequestContext } from "../../services/friendRequestContext";

const IncomingFriendRequestsScreenContainer = () => {
    const { controller: commonController } = useCommonContext();
    const { store, controller } = useFriendRequestContext();

    const [loadingAcceptFriendRequestButtonList, setLoadingAcceptFriendRequestButtonList] = useState<string[]>([]);
    const [loadingDeclineFriendRequestButtonList, setLoadingDeclineFriendRequestButtonList] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            await commonController.initMainLayout();
            await controller.initIncomingFriendRequestsScreen();
        })();
    }, [commonController, controller]);

    const handleUserProfileClick = (userId: string) => {
        controller.navigateToUserTimelinePage(userId);
    };

    const handleAcceptFriendRequestButtonClick = async (friendRequestId: string) => {
        setLoadingAcceptFriendRequestButtonList((currentList) => [...currentList, friendRequestId]);

        await controller.acceptIncomingFriendRequest(friendRequestId);

        setTimeout(() => {
            setLoadingAcceptFriendRequestButtonList((currentList) =>
                currentList.filter((value) => value !== friendRequestId)
            );
        }, 1500);
    };

    const handleDeclineFriendRequestButtonClick = async (friendRequestId: string) => {
        setLoadingDeclineFriendRequestButtonList((currentList) => [...currentList, friendRequestId]);

        await controller.declineIncomingFriendRequest(friendRequestId);

        setTimeout(() => {
            setLoadingDeclineFriendRequestButtonList((currentList) =>
                currentList.filter((value) => value !== friendRequestId)
            );
        }, 1500);
    };

    const handleLoadMoreFriendRequestItemsButtonClick = () => {
        controller.loadMoreIncomingFriendRequests();
    };

    const handleIncomingFriendRequestsButtonClick = () => {
        controller.navigateToIncomingFriendRequestsPage();
    };

    const handleOutgoingFriendRequestsButtonClick = () => {
        controller.navigateToOutgoingFriendRequestsPage();
    };

    const isAcceptFriendRequestButtonLoading = (friendRequestId: string): boolean => {
        return !!loadingAcceptFriendRequestButtonList.find((value) => value === friendRequestId);
    };

    const isDeclineFriendRequestButtonLoading = (friendRequestId: string): boolean => {
        return !!loadingDeclineFriendRequestButtonList.find((value) => value === friendRequestId);
    };

    return (
        <IncomingFriendRequestsScreenComponent
            friendRequestItems={store.incomingFriendRequestsScreenStore.friendRequestItems}
            onUserProfileClick={handleUserProfileClick}
            onAcceptFriendRequestButtonClick={handleAcceptFriendRequestButtonClick}
            onDeclineFriendRequestButtonClick={handleDeclineFriendRequestButtonClick}
            friendRequestItemsLoading={store.incomingFriendRequestsScreenStore.friendRequestItemsLoading}
            loadMoreFriendRequestItemsButtonVisible={
                store.incomingFriendRequestsScreenStore.friendRequestItems.length <
                store.incomingFriendRequestsScreenStore.friendRequestItemsTotalElementCount
            }
            onLoadMoreFriendRequestItemsButtonClick={handleLoadMoreFriendRequestItemsButtonClick}
            onIncomingFriendRequestsButtonClick={handleIncomingFriendRequestsButtonClick}
            onOutgoingFriendRequestsButtonClick={handleOutgoingFriendRequestsButtonClick}
            isAcceptFriendRequestButtonLoading={isAcceptFriendRequestButtonLoading}
            isDeclineFriendRequestButtonLoading={isDeclineFriendRequestButtonLoading}
        />
    );
};

export default IncomingFriendRequestsScreenContainer;
