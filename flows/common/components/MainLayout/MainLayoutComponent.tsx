import React, { PropsWithChildren } from "react";
import HeaderBarComponent from "../HeaderBar";
import { ILastConversation } from "../../services/commonTypes";
import Last10ConversationsDrawer from "../Last10ConversationsDrawer";
import Last10ConversationsSidebar from "../Last10ConversationsSidebar";
import { useColorMode } from "@chakra-ui/react";

type TProps = {
    onLastConversationsExpandButtonClick: () => void;
    onProfileButtonClick: () => void;
    onSettingsButtonClick: () => void;
    onSignOutButtonClick: () => void;
    last10Conversations: ILastConversation[];
    onLastConversationClick: (conversationId: string) => void;
    onCreateNewConversationButtonClick: () => void;
    lastConversationsExpandButtonRef: React.RefObject<HTMLButtonElement>;
    last10ConversationsDrawerExpanded: boolean;
    onLast10ConversationsDrawerClose: () => void;
};

const MainLayoutComponent = ({
    children,
    onLastConversationsExpandButtonClick,
    onProfileButtonClick,
    onSettingsButtonClick,
    onSignOutButtonClick,
    last10Conversations,
    onLastConversationClick,
    onCreateNewConversationButtonClick,
    lastConversationsExpandButtonRef,
    last10ConversationsDrawerExpanded,
    onLast10ConversationsDrawerClose,
}: PropsWithChildren<TProps>) => {
    const { colorMode } = useColorMode();

    return (
        <div className="absolute top-0 left-0 flex h-screen w-screen flex-col">
            <HeaderBarComponent
                userName="Naruto Uzumaki"
                lastConversationsExpandButtonRef={lastConversationsExpandButtonRef}
                onLastConversationsExpandButtonClick={onLastConversationsExpandButtonClick}
                onProfileButtonClick={onProfileButtonClick}
                onSettingsButtonClick={onSettingsButtonClick}
                onSignOutButtonClick={onSignOutButtonClick}
            />

            <div className="relative h-full w-full overflow-hidden">
                <Last10ConversationsSidebar
                    drawerExpanded={last10ConversationsDrawerExpanded}
                    last10Conversations={last10Conversations}
                    onLastConversationClick={onLastConversationClick}
                    onCreateNewConversationButtonClick={onCreateNewConversationButtonClick}
                />

                <div className={`h-full w-full overflow-y-auto ${colorMode === "light" ? "bg-slate-200" : ""}`}>
                    {children}
                </div>
            </div>

            <Last10ConversationsDrawer
                expanded={last10ConversationsDrawerExpanded}
                onClose={onLast10ConversationsDrawerClose}
                expandButtonRef={lastConversationsExpandButtonRef}
                last10Conversations={last10Conversations}
                onLastConversationClick={onLastConversationClick}
                onCreateNewConversationButtonClick={onCreateNewConversationButtonClick}
            />
        </div>
    );
};

export default MainLayoutComponent;
