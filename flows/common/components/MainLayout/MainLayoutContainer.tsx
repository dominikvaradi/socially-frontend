import React, { useState } from "react";
import MainLayoutComponent from "./MainLayoutComponent";
import { ILastConversation } from "../../services/commonTypes";

const MainLayoutContainer = ({ children }: React.PropsWithChildren) => {
    const lastConversationsExpandButtonRef = React.useRef<HTMLButtonElement>(null);
    const [last10ConversationsDrawerExpanded, setLast10ConversationsDrawerExpanded] = useState<boolean>(false);

    const handleLastConversationsExpandButtonClick = () => {
        setLast10ConversationsDrawerExpanded((expanded) => !expanded);
    };

    const handleProfileButtonClick = () => {
        console.log("Profile button click");
    };

    const handleSettingsButtonClick = () => {
        console.log("Settings button click");
    };

    const handleSignOutButtonClick = () => {
        console.log("Sign out button click");
    };

    const handleLastConversationClick = (conversationId: string) => {
        console.log("Last conversation button click: " + conversationId);
    };

    const handleCreateNewConversationButtonClick = () => {
        console.log("Create new conversation button click");
    };

    const handleLast10ConversationsDrawerClose = () => {
        setLast10ConversationsDrawerExpanded(false);
    };

    return (
        <MainLayoutComponent
            onLastConversationsExpandButtonClick={handleLastConversationsExpandButtonClick}
            onProfileButtonClick={handleProfileButtonClick}
            onSettingsButtonClick={handleSettingsButtonClick}
            onSignOutButtonClick={handleSignOutButtonClick}
            last10Conversations={mockLastConversations}
            onLastConversationClick={handleLastConversationClick}
            onCreateNewConversationButtonClick={handleCreateNewConversationButtonClick}
            lastConversationsExpandButtonRef={lastConversationsExpandButtonRef}
            last10ConversationsDrawerExpanded={last10ConversationsDrawerExpanded}
            onLast10ConversationsDrawerClose={handleLast10ConversationsDrawerClose}>
            {children}
        </MainLayoutComponent>
    );
};

export default MainLayoutContainer;

const mockLastConversations: ILastConversation[] = [
    {
        id: "1",
        userName: "Uzumaki Naruto",
    },
    {
        id: "2",
        userName: "Sasuke Uchiha",
    },
    {
        id: "3",
        userName: "Mikasa Ackermann",
    },
    {
        id: "4",
        userName: "itachi Uchiha",
    },
    {
        id: "5",
        userName: "Sakura Haruno",
    },
    {
        id: "6",
        userName: "Hinata Hyuga",
    },
    {
        id: "7",
        userName: "Sasuke Uchiha",
    },
    {
        id: "8",
        userName: "Tanjiro Kamado",
    },
    {
        id: "9",
        userName: "Kanao Tsuyuri",
    },
    {
        id: "10",
        userName: "Takumi Fujiwara",
    },
];
