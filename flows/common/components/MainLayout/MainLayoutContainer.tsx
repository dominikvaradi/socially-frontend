import React, { useState } from "react";
import MainLayoutComponent from "./MainLayoutComponent";
import { useCommonContext } from "../../services/commonContext";

const MainLayoutContainer = ({ children }: React.PropsWithChildren) => {
    const { store, controller } = useCommonContext();

    const lastConversationsExpandButtonRef = React.useRef<HTMLButtonElement>(null);
    const [last10ConversationsDrawerExpanded, setLast10ConversationsDrawerExpanded] = useState<boolean>(false);

    const handleLastConversationsExpandButtonClick = () => {
        setLast10ConversationsDrawerExpanded((expanded) => !expanded);
    };

    const handleLastConversationClick = (conversationId: string) => {
        controller.navigateToConversationPage(conversationId);
    };

    const handleCreateNewConversationButtonClick = () => {
        controller.navigateToCreateNewConversationPage();
    };

    const handleLast10ConversationsDrawerClose = () => {
        setLast10ConversationsDrawerExpanded(false);
    };

    return (
        <MainLayoutComponent
            onLastConversationsExpandButtonClick={handleLastConversationsExpandButtonClick}
            last10Conversations={store.last10Conversations}
            onLastConversationClick={handleLastConversationClick}
            onCreateNewConversationButtonClick={handleCreateNewConversationButtonClick}
            lastConversationsExpandButtonRef={lastConversationsExpandButtonRef}
            last10ConversationsDrawerExpanded={last10ConversationsDrawerExpanded}
            onLast10ConversationsDrawerClose={handleLast10ConversationsDrawerClose}
        >
            {children}
        </MainLayoutComponent>
    );
};

export default MainLayoutContainer;
