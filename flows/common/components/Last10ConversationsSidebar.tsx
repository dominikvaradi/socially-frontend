import { Icon, IconButton, useColorMode } from "@chakra-ui/react";
import React, { Fragment } from "react";
import UserNameAvatar from "./UserNameAvatar";
import { FiPlus } from "react-icons/fi";
import { IConversation } from "../services/commonTypes";
import { getConversationTitle } from "../services/commonUtils";
import GroupAvatar from "./GroupAvatar";

type TProps = {
    drawerExpanded: boolean;
    last10Conversations: IConversation[];
    onLastConversationClick: (lastConversationId: string) => void;
    onCreateNewConversationButtonClick: () => void;
};

const Last10ConversationsSidebar = ({
    drawerExpanded,
    last10Conversations,
    onLastConversationClick,
    onCreateNewConversationButtonClick,
}: TProps) => {
    const { colorMode } = useColorMode();

    return (
        <div
            className={`absolute top-0 left-0 z-[2] hidden h-full ${
                colorMode === "dark" ? "bg-slate-700" : "bg-white"
            } drop-shadow-lg transition-all duration-500 ease-in-out sm:block ${
                drawerExpanded ? "-translate-x-28" : ""
            }`}
        >
            <div className="flex h-full flex-col space-y-2 overflow-y-auto p-2">
                {last10Conversations.map((conversation) => (
                    <Fragment key={conversation.id}>
                        {conversation.type === "DIRECT" && (
                            <UserNameAvatar
                                className="select-none"
                                userName={getConversationTitle(conversation.type, conversation.members, 100)}
                                clickable
                                onClick={() => onLastConversationClick(conversation.id)}
                            />
                        )}
                        {conversation.type === "GROUP" && (
                            <GroupAvatar
                                className="select-none"
                                clickable
                                onClick={() => onLastConversationClick(conversation.id)}
                            />
                        )}
                    </Fragment>
                ))}
                <IconButton
                    colorScheme="brand"
                    icon={<Icon as={FiPlus} />}
                    className="!h-12 !w-12 shrink-0 !rounded-full !text-xl"
                    onClick={onCreateNewConversationButtonClick}
                    aria-label={"Create new conversation"}
                />
            </div>
        </div>
    );
};

export default Last10ConversationsSidebar;
