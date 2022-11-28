import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Icon,
    useColorMode,
} from "@chakra-ui/react";
import React from "react";
import UserNameAvatar from "./UserNameAvatar";
import { FiPlus } from "react-icons/fi";
import { IConversation } from "../services/commonTypes";
import { getConversationTitle } from "../services/commonUtils";
import GroupAvatar from "./GroupAvatar";

type TProps = {
    expanded: boolean;
    onClose: () => void;
    expandButtonRef: React.RefObject<HTMLButtonElement>;
    last10Conversations: IConversation[];
    onLastConversationClick: (lastConversationId: string) => void;
    onCreateNewConversationButtonClick: () => void;
};

const Last10ConversationsDrawer = ({
    expanded,
    onClose,
    expandButtonRef,
    last10Conversations,
    onLastConversationClick,
    onCreateNewConversationButtonClick,
}: TProps) => {
    const { colorMode } = useColorMode();

    const itemHoverStyle = `lg:hover:bg-brand-100 ${colorMode === "dark" ? "lg:hover:text-black" : ""}`;
    const itemActiveStyle = `active:bg-brand-300 lg:hover:bg-brand-100 lg:hover:active:bg-brand-300 ${
        colorMode === "dark" ? "active:text-black" : ""
    }`;

    return (
        <Drawer isOpen={expanded} onClose={onClose} placement="left" finalFocusRef={expandButtonRef}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton className="!top-3 !right-3" />
                <DrawerHeader>Utolsó 10 beszélgetés</DrawerHeader>
                <DrawerBody>
                    <div className="flex h-full w-full flex-col space-y-1 overflow-y-auto p-3">
                        {last10Conversations.map((conversation) => (
                            <div
                                onClick={() => onLastConversationClick(conversation.id)}
                                key={conversation.id}
                                className={`flex cursor-pointer select-none items-center gap-2 rounded-lg p-1 ${itemHoverStyle} ${itemActiveStyle}`}
                            >
                                {conversation.type === "DIRECT" && (
                                    <UserNameAvatar
                                        userName={getConversationTitle(conversation.type, conversation.members, 100)}
                                    />
                                )}
                                {conversation.type === "GROUP" && <GroupAvatar />}
                                <span className="leading-none">
                                    {getConversationTitle(conversation.type, conversation.members, 100)}
                                </span>
                            </div>
                        ))}
                        <div
                            className={`flex cursor-pointer items-center space-x-2 rounded-xl p-1 ${itemHoverStyle} ${itemActiveStyle}`}
                            onClick={onCreateNewConversationButtonClick}
                        >
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-xl text-white`}
                            >
                                <Icon as={FiPlus} />
                            </div>

                            <span className="select-none text-xl">Új beszélgetés</span>
                        </div>
                    </div>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default Last10ConversationsDrawer;
