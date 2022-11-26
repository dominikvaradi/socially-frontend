import React, { useEffect } from "react";
import UserFriendsScreenComponent from "./UserFriendsScreenComponent";
import { useUserContext } from "../../services/userContext";
import { useRouter } from "next/router";
import { useCommonContext } from "../../../common/services/commonContext";

const UserFriendsScreenContainer = () => {
    const router = useRouter();
    const { controller: commonController } = useCommonContext();
    const { store, controller } = useUserContext();

    useEffect(() => {
        if (!router.isReady) return;

        (async () => {
            await commonController.initMainLayout();
            await controller.initFriendsScreen(router.query.userId as string);
        })();
    }, [controller, commonController, router]);

    const handleLoadMoreFriendsButtonClick = () => {
        controller.loadMoreFriends();
    };

    const handleUserProfileClick = (userId: string) => {
        controller.navigateToUserTimelinePage(userId);
    };

    const handleRevokeOutgoingFriendRequestButtonClick = () => {
        controller.revokeFriendsScreenOutgoingFriendRequest();
    };

    const handleAddFriendButtonClick = () => {
        controller.sendFriendsScreenFriendRequest();
    };

    const handleAcceptIncomingFriendRequestButtonClick = () => {
        controller.acceptFriendsScreenIncomingFriendRequest();
    };

    const handleDeclineIncomingFriendRequestButtonClick = () => {
        controller.declineFriendsScreenIncomingFriendRequest();
    };

    const handleDeleteFriend = async () => {
        await controller.deleteFriendsScreenFriend();
    };

    const handleTimelineButtonClick = () => {
        controller.navigateToUserTimelinePage(store.friendsScreenStore.user!.id);
    };

    const handleFriendsButtonClick = () => {
        controller.navigateToUserFriendsPage(store.friendsScreenStore.user!.id);
    };

    return (
        <UserFriendsScreenComponent
            userName={store.friendsScreenStore.user?.name ?? "Betöltés alatt..."}
            friends={store.friendsScreenStore.friends}
            friendsLoading={store.friendsScreenStore.friendsLoading}
            loadMoreFriendsButtonVisible={
                store.friendsScreenStore.friends.length < store.friendsScreenStore.friendsTotalElementCount
            }
            onLoadMoreFriendsButtonClick={handleLoadMoreFriendsButtonClick}
            onUserProfileClick={handleUserProfileClick}
            userEqualSelf={!!store.friendsScreenStore.user?.userEqualSelf}
            alreadyFriend={!!store.friendsScreenStore.user?.userAlreadyFriend}
            friendRequestIncoming={!!store.friendsScreenStore.user?.friendRequestIncomingOfUser}
            friendRequestAlreadySent={!!store.friendsScreenStore.user?.friendRequestAlreadySentToUser}
            userLoading={store.friendsScreenStore.userLoading}
            onRevokeOutgoingFriendRequestButtonClick={handleRevokeOutgoingFriendRequestButtonClick}
            onAddFriendButtonClick={handleAddFriendButtonClick}
            onAcceptIncomingFriendRequestButtonClick={handleAcceptIncomingFriendRequestButtonClick}
            onDeclineIncomingFriendRequestButtonClick={handleDeclineIncomingFriendRequestButtonClick}
            onDeleteFriend={handleDeleteFriend}
            onTimelineButtonClick={handleTimelineButtonClick}
            onFriendsButtonClick={handleFriendsButtonClick}
        />
    );
};

export default UserFriendsScreenContainer;
