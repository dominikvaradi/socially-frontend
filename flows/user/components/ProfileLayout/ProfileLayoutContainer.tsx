import React, { useState } from "react";
import { TProfileLayoutTab } from "../../services/userTypes";
import ProfileLayoutComponent from "./ProfileLayoutComponent";

type TProps = {
    userName: string;
    activeTab: TProfileLayoutTab;
    userEqualSelf: boolean;
    alreadyFriend: boolean;
    friendRequestIncoming: boolean;
    friendRequestAlreadySent: boolean;
    userLoading: boolean;
    onRevokeOutgoingFriendRequestButtonClick: () => void;
    onAddFriendButtonClick: () => void;
    onAcceptIncomingFriendRequestButtonClick: () => void;
    onDeclineIncomingFriendRequestButtonClick: () => void;
    onDeleteFriend: () => Promise<void>;
    onTimelineButtonClick: () => void;
    onFriendsButtonClick: () => void;
};

const ProfileLayoutContainer = ({
    userName,
    activeTab,
    children,
    userEqualSelf,
    alreadyFriend,
    friendRequestIncoming,
    friendRequestAlreadySent,
    userLoading,
    onRevokeOutgoingFriendRequestButtonClick,
    onAddFriendButtonClick,
    onAcceptIncomingFriendRequestButtonClick,
    onDeclineIncomingFriendRequestButtonClick,
    onDeleteFriend,
    onTimelineButtonClick,
    onFriendsButtonClick,
}: React.PropsWithChildren<TProps>) => {
    const [deleteFriendAlertDialogVisible, setDeleteFriendAlertDialogVisible] = useState<boolean>(false);
    const [deleteFriendAlertDialogConfirmButtonLoading, setDeleteFriendAlertDialogConfirmButtonLoading] =
        useState<boolean>(false);

    const handleDeleteFriendButtonClick = () => {
        setDeleteFriendAlertDialogVisible(true);
    };

    const handleDeleteFriendAlertDialogClose = () => {
        setDeleteFriendAlertDialogVisible(false);
    };

    const handleDeleteFriendAlertDialogConfirmButtonClick = async () => {
        setDeleteFriendAlertDialogConfirmButtonLoading(true);

        await onDeleteFriend();

        setDeleteFriendAlertDialogConfirmButtonLoading(false);
        setDeleteFriendAlertDialogVisible(false);
    };

    return (
        <ProfileLayoutComponent
            userName={userName}
            activeTab={activeTab}
            userEqualSelf={userEqualSelf}
            alreadyFriend={alreadyFriend}
            friendRequestIncoming={friendRequestIncoming}
            friendRequestAlreadySent={friendRequestAlreadySent}
            onDeleteFriendButtonClick={handleDeleteFriendButtonClick}
            onRevokeOutgoingFriendRequestButtonClick={onRevokeOutgoingFriendRequestButtonClick}
            onAddFriendButtonClick={onAddFriendButtonClick}
            onAcceptIncomingFriendRequestButtonClick={onAcceptIncomingFriendRequestButtonClick}
            onDeclineIncomingFriendRequestButtonClick={onDeclineIncomingFriendRequestButtonClick}
            deleteFriendAlertDialogVisible={deleteFriendAlertDialogVisible}
            onDeleteFriendAlertDialogClose={handleDeleteFriendAlertDialogClose}
            onDeleteFriendAlertDialogConfirmButtonClick={handleDeleteFriendAlertDialogConfirmButtonClick}
            deleteFriendAlertDialogConfirmButtonLoading={deleteFriendAlertDialogConfirmButtonLoading}
            userLoading={userLoading}
            onTimelineButtonClick={onTimelineButtonClick}
            onFriendsButtonClick={onFriendsButtonClick}
        >
            {children}
        </ProfileLayoutComponent>
    );
};

export default ProfileLayoutContainer;
