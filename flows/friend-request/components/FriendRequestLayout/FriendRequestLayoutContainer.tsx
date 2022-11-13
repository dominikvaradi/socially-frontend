import React from "react";
import FriendRequestLayoutComponent from "./FriendRequestLayoutComponent";
import { TFriendRequestLayoutTab } from "../../services/friendRequestTypes";

type TProps = {
    activeTab: TFriendRequestLayoutTab;
};

const FriendRequestLayoutContainer = ({ activeTab, children }: React.PropsWithChildren<TProps>) => {
    return <FriendRequestLayoutComponent activeTab={activeTab}>{children}</FriendRequestLayoutComponent>;
};

export default FriendRequestLayoutContainer;
