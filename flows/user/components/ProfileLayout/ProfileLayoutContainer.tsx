import React, { useState } from "react";
import { TProfileLayoutTab } from "../../services/userTypes";
import ProfileLayoutComponent from "./ProfileLayoutComponent";

type TProps = {
    userName: string;
    activeTab: TProfileLayoutTab;
    userSelf: boolean;
    alreadyFriend: boolean;
    friendRequestIncoming: boolean;
    friendRequestAlreadySent: boolean;
};

const ProfileLayoutContainer = ({
    userName,
    activeTab,
    children,
    userSelf,
    alreadyFriend,
    friendRequestIncoming,
    friendRequestAlreadySent,
}: React.PropsWithChildren<TProps>) => {
    const [deleteFriendAlertDialogVisible, setDeleteFriendAlertDialogVisible] = useState<boolean>(false);

    const handleDeleteFriendButtonClick = () => {
        setDeleteFriendAlertDialogVisible(true);
    };

    const handleRevokeOutgoingFriendRequestButtonClick = () => {
        console.log("handleRevokeOutgoingFriendRequestButtonClick");
    };

    const handleAddFriendButtonClick = () => {
        console.log("handleAddFriendButtonClick");
    };

    const handleAcceptIncomingFriendRequestButtonClick = () => {
        console.log("handleAcceptIncomingFriendRequestButtonClick");
    };

    const handleDeclineIncomingFriendRequestButtonClick = () => {
        console.log("handleDeclineIncomingFriendRequestButtonClick");
    };

    const handleDeleteFriendAlertDialogClose = () => {
        setDeleteFriendAlertDialogVisible(false);
    };

    const handleDeleteFriendAlertDialogConfirmButtonClick = () => {
        console.log("handleDeleteFriendAlertDialogConfirmButtonClick");
        setDeleteFriendAlertDialogVisible(false);
    };

    return (
        <ProfileLayoutComponent
            userName={userName}
            activeTab={activeTab}
            userSelf={userSelf}
            alreadyFriend={alreadyFriend}
            friendRequestIncoming={friendRequestIncoming}
            friendRequestAlreadySent={friendRequestAlreadySent}
            onDeleteFriendButtonClick={handleDeleteFriendButtonClick}
            onRevokeOutgoingFriendRequestButtonClick={handleRevokeOutgoingFriendRequestButtonClick}
            onAddFriendButtonClick={handleAddFriendButtonClick}
            onAcceptIncomingFriendRequestButtonClick={handleAcceptIncomingFriendRequestButtonClick}
            onDeclineIncomingFriendRequestButtonClick={handleDeclineIncomingFriendRequestButtonClick}
            deleteFriendAlertDialogVisible={deleteFriendAlertDialogVisible}
            onDeleteFriendAlertDialogClose={handleDeleteFriendAlertDialogClose}
            onDeleteFriendAlertDialogConfirmButtonClick={handleDeleteFriendAlertDialogConfirmButtonClick}
        >
            {children}
        </ProfileLayoutComponent>
    );
};

export default ProfileLayoutContainer;
