import React, { useEffect } from "react";
import ConversationsListScreenComponent from "./ConversationsListScreenComponent";
import { useConversationContext } from "../../services/conversationContext";
import { useCommonContext } from "../../../common/services/commonContext";

const ConversationsListScreenContainer = () => {
    const { store, controller } = useConversationContext();
    const { controller: commonController } = useCommonContext();

    useEffect(() => {
        (async () => {
            await commonController.initMainLayout();
            await controller.initConversationsListScreen();
        })();
    }, [commonController, controller]);

    const handleConversationClick = (conversationId: string) => {
        controller.navigateToConversationPage(conversationId);
    };

    const handleLoadMoreConversationsButtonClick = () => {
        controller.loadMoreConversations();
    };

    const handleCreateNewConversationButtonClick = () => {
        controller.navigateToNewConversationPage();
    };

    return (
        <ConversationsListScreenComponent
            conversations={store.conversationsListScreenStore.conversations}
            onConversationClick={handleConversationClick}
            conversationsLoading={store.conversationsListScreenStore.conversationsLoading}
            loadMoreConversationsButtonVisible={
                store.conversationsListScreenStore.conversations.length <
                store.conversationsListScreenStore.conversationsTotalElementCount
            }
            onLoadMoreConversationsButtonClick={handleLoadMoreConversationsButtonClick}
            onCreateNewConversationButtonClick={handleCreateNewConversationButtonClick}
        />
    );
};

export default ConversationsListScreenContainer;
