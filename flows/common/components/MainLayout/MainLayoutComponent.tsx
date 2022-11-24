import React, { PropsWithChildren } from "react";
import HeaderBar from "../HeaderBar";
import Last10ConversationsDrawer from "../Last10ConversationsDrawer";
import Last10ConversationsSidebar from "../Last10ConversationsSidebar";
import { useColorMode } from "@chakra-ui/react";
import { IConversation } from "../../services/commonTypes";

type TProps = {
    onLastConversationsExpandButtonClick: () => void;
    last10Conversations: IConversation[];
    onLastConversationClick: (conversationId: string) => void;
    onCreateNewConversationButtonClick: () => void;
    lastConversationsExpandButtonRef: React.RefObject<HTMLButtonElement>;
    last10ConversationsDrawerExpanded: boolean;
    onLast10ConversationsDrawerClose: () => void;
};

const MainLayoutComponent = ({
    onLastConversationsExpandButtonClick,
    last10Conversations,
    onLastConversationClick,
    onCreateNewConversationButtonClick,
    lastConversationsExpandButtonRef,
    last10ConversationsDrawerExpanded,
    onLast10ConversationsDrawerClose,
    children,
}: PropsWithChildren<TProps>) => {
    const { colorMode } = useColorMode();

    return (
        <div className="absolute top-0 left-0 flex h-screen w-screen flex-col">
            <HeaderBar
                lastConversationsExpandButtonRef={lastConversationsExpandButtonRef}
                onLastConversationsExpandButtonClick={onLastConversationsExpandButtonClick}
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
