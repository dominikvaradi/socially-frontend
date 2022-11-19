import React from "react";
import ConversationsScreenComponent from "./ConversationsScreenComponent";
import { IConversation } from "../../services/conversationTypes";

const ConversationsScreenContainer = () => {
    const handleConversationClick = (conversationId: string) => {
        console.log("handleConversationClick: " + conversationId);
    };

    const handleLoadMoreConversationsButtonClick = () => {
        console.log("handleLoadMoreConversationsButtonClick");
    };

    const handleCreateNewConversationButtonClick = () => {
        console.log("handleCreateNewConversationButtonClick");
    };

    return (
        <ConversationsScreenComponent
            conversations={mockConversations}
            onConversationClick={handleConversationClick}
            conversationsLoading={false}
            loadMoreConversationsButtonVisible={true}
            onLoadMoreConversationsButtonClick={handleLoadMoreConversationsButtonClick}
            onCreateNewConversationButtonClick={handleCreateNewConversationButtonClick}
        />
    );
};

export default ConversationsScreenContainer;

const mockConversations: IConversation[] = [
    {
        id: "0",
        members: [{ userId: "0", userName: "Naruto Uzumaki", role: "NORMAL" }],
        type: "DIRECT",
    },
    {
        id: "1",
        members: [{ userId: "1", userName: "Sasuke Uchiha", role: "NORMAL" }],
        type: "DIRECT",
    },
    {
        id: "2",
        members: [
            { userId: "0", userName: "Naruto Uzumaki", role: "ADMIN" },
            { userId: "0", userName: "Sasuke Uchiha", role: "NORMAL" },
        ],
        type: "GROUP",
    },
    {
        id: "3",
        members: [{ userId: "2", userName: "Hinata Hyuga", role: "NORMAL" }],
        type: "DIRECT",
    },
    {
        id: "4",
        members: [
            { userId: "0", userName: "Naruto Uzumaki", role: "NORMAL" },
            { userId: "1", userName: "Sasuke Uchiha", role: "ADMIN" },
            { userId: "2", userName: "Hinata Hyuga", role: "NORMAL" },
            { userId: "3", userName: "Sakura Haruno", role: "ADMIN" },
            { userId: "4", userName: "Kiba Inuzuka", role: "NORMAL" },
            { userId: "5", userName: "Rock Lee", role: "NORMAL" },
        ],
        type: "GROUP",
    },
];
