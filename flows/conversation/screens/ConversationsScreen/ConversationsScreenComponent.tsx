import { Button, Icon, IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import MainLayout from "../../../common/components/MainLayout";
import GroupAvatar from "../../../common/components/GroupAvatar";
import { getConversationTitle } from "../../../common/services/commonUtils";
import UserNameAvatar from "../../../common/components/UserNameAvatar";
import ColorModeSpinner from "../../../common/components/ColorModeSpinner";
import { FiPlus } from "react-icons/fi";
import { IConversation } from "../../../common/services/commonTypes";

type TProp = {
    conversations: IConversation[];
    onConversationClick: (conversationId: string) => void;
    conversationsLoading: boolean;
    loadMoreConversationsButtonVisible: boolean;
    onLoadMoreConversationsButtonClick: () => void;
    onCreateNewConversationButtonClick: () => void;
};

const ConversationsScreenComponent = ({
    conversations,
    onConversationClick,
    conversationsLoading,
    loadMoreConversationsButtonVisible,
    onLoadMoreConversationsButtonClick,
    onCreateNewConversationButtonClick,
}: TProp) => {
    const { colorMode } = useColorMode();

    const itemHoverStyle = `lg:hover:bg-brand-100 ${colorMode === "dark" ? "lg:hover:text-black" : ""}`;
    const itemActiveStyle = `active:bg-brand-300 lg:hover:bg-brand-100 lg:hover:active:bg-brand-300 ${
        colorMode === "dark" ? "active:text-black" : ""
    }`;

    return (
        <MainLayout>
            <div className="flex items-center justify-center sm:pl-16">
                <div
                    className={`m-4 flex w-full max-w-[1000px] flex-col gap-6 rounded-md p-4 drop-shadow-md sm:m-8 sm:w-[80%] ${
                        colorMode === "dark" ? "bg-slate-600" : "bg-white"
                    }`}
                >
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-xl">Beszélgetések</span>
                        <Button
                            onClick={onCreateNewConversationButtonClick}
                            className="!hidden sm:!flex"
                            colorScheme="brand"
                            leftIcon={<Icon as={FiPlus} />}
                            aria-label="New conversation"
                        >
                            Új beszélgetés
                        </Button>
                        <IconButton
                            onClick={onCreateNewConversationButtonClick}
                            className="sm:!hidden"
                            colorScheme="brand"
                            icon={<Icon as={FiPlus} />}
                            aria-label="New conversation"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        {conversations.map((conversation) => (
                            <div
                                onClick={() => onConversationClick(conversation.id)}
                                key={conversation.id}
                                className={`flex cursor-pointer select-none items-center gap-2 rounded-lg p-1 ${itemHoverStyle} ${itemActiveStyle}`}
                            >
                                {conversation.type === "DIRECT" && (
                                    <UserNameAvatar userName={getConversationTitle(conversation.members, 100)} />
                                )}
                                {conversation.type === "GROUP" && <GroupAvatar />}
                                <span className="leading-none">{getConversationTitle(conversation.members, 100)}</span>
                            </div>
                        ))}
                        {conversations.length === 0 && !conversationsLoading && (
                            <p className="text-center">Nem található beszélgetés.</p>
                        )}
                        {conversations.length === 0 && conversationsLoading && (
                            <div className="flex justify-center">
                                <ColorModeSpinner size="lg" />
                            </div>
                        )}
                        {conversations.length > 0 && loadMoreConversationsButtonVisible && (
                            <div className="flex justify-center">
                                <Button
                                    colorScheme="brand"
                                    variant="ghost"
                                    onClick={onLoadMoreConversationsButtonClick}
                                    isLoading={conversationsLoading}
                                    spinner={<ColorModeSpinner size="lg" />}
                                >
                                    Több beszélgetés betöltése
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ConversationsScreenComponent;
