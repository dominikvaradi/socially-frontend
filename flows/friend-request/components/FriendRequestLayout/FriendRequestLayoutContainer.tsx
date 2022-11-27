import React from "react";
import FriendRequestLayoutComponent from "./FriendRequestLayoutComponent";
import { TFriendRequestLayoutTab } from "../../services/friendRequestTypes";

type TProps = {
    activeTab: TFriendRequestLayoutTab;
    onIncomingFriendRequestsButtonClick: () => void;
    onOutgoingFriendRequestsButtonClick: () => void;
};

const FriendRequestLayoutContainer = ({
    activeTab,
    onIncomingFriendRequestsButtonClick,
    onOutgoingFriendRequestsButtonClick,
    children,
}: React.PropsWithChildren<TProps>) => {
    return (
        <FriendRequestLayoutComponent
            activeTab={activeTab}
            onIncomingFriendRequestsButtonClick={onIncomingFriendRequestsButtonClick}
            onOutgoingFriendRequestsButtonClick={onOutgoingFriendRequestsButtonClick}
        >
            {children}
        </FriendRequestLayoutComponent>
    );
};

export default FriendRequestLayoutContainer;
