import { Button, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, useColorMode } from "@chakra-ui/react";
import React from "react";
import MainLayout from "../../../common/components/MainLayout";
import UserNameAvatar from "../../../common/components/UserNameAvatar";
import { FiArrowLeft, FiMoreVertical, FiUsers } from "react-icons/fi";
import Message from "../../components/Message";
import { CreateMessageFormValues, IMessage } from "../../services/conversationTypes";
import ColorModeSpinner from "../../../common/components/ColorModeSpinner";
import DeleteMessageAlertDialog from "../../components/DeleteMessageAlertDialog";
import { IReactionListItem, TReaction } from "../../../common/services/commonTypes";
import ReactionListModal from "../../../common/components/ReactionListModal";
import GroupAvatar from "../../../common/components/GroupAvatar";
import CreateMessage from "../../components/CreateMessage";
import { FormikHelpers } from "formik";

type TProps = {
    messages: IMessage[];
    messagesBottomPlaceholderRef: React.RefObject<HTMLDivElement>;
    messagesLoading: boolean;
    loadMoreMessagesButtonVisible: boolean;
    onLoadMoreMessagesButtonClick: () => void;
    onMessageReactionCountButtonClick: (message: IMessage) => void;
    onMessageDeleteButtonClick: (message: IMessage) => void;
    deleteMessageAlertDialogVisible: boolean;
    onDeleteMessageAlertDialogClose: () => void;
    deleteMessageAlertDialogConfirmButtonLoading: boolean;
    onDeleteMessageAlertDialogConfirmButtonClick: () => void;
    reactionListModalVisible: boolean;
    onReactionListModalClose: () => void;
    onReactionListModalTabChange: (reaction?: TReaction) => void;
    reactionListReactionItems: IReactionListItem[];
    reactionListLoadMoreItemsButtonVisible: boolean;
    onReactionListLoadMoreItemsButtonClick: () => void;
    reactionListLoading: boolean;
    onUserProfileClick: (userId: string) => void;
    conversationTitle: string;
    onConversationTitleClick: () => void;
    groupConversation: boolean;
    onConversationMembersButtonClick: () => void;
    onBackButtonClick: () => void;
    onMessageSubmit: (values: CreateMessageFormValues, actions: FormikHelpers<CreateMessageFormValues>) => void;
    onToggleMessageReaction: (message: IMessage, reaction: TReaction) => Promise<void>;
};

const ConversationScreenComponent = ({
    messages,
    messagesBottomPlaceholderRef,
    messagesLoading,
    loadMoreMessagesButtonVisible,
    onLoadMoreMessagesButtonClick,
    onMessageReactionCountButtonClick,
    onMessageDeleteButtonClick,
    deleteMessageAlertDialogVisible,
    onDeleteMessageAlertDialogClose,
    deleteMessageAlertDialogConfirmButtonLoading,
    onDeleteMessageAlertDialogConfirmButtonClick,
    reactionListModalVisible,
    onReactionListModalClose,
    onReactionListModalTabChange,
    reactionListReactionItems,
    reactionListLoadMoreItemsButtonVisible,
    onReactionListLoadMoreItemsButtonClick,
    reactionListLoading,
    onUserProfileClick,
    conversationTitle,
    onConversationTitleClick,
    groupConversation,
    onConversationMembersButtonClick,
    onBackButtonClick,
    onMessageSubmit,
    onToggleMessageReaction,
}: TProps) => {
    const { colorMode } = useColorMode();

    const itemHoverStyle = `lg:hover:bg-brand-100 ${colorMode === "dark" ? "lg:hover:text-black" : ""}`;
    const itemActiveStyle = `active:bg-brand-300 lg:hover:bg-brand-100 lg:hover:active:bg-brand-300 ${
        colorMode === "dark" ? "active:text-black" : ""
    }`;

    return (
        <MainLayout>
            <div className="flex h-full justify-center sm:pl-16">
                <div
                    className={`m-4 flex w-full max-w-[1000px] flex-col rounded-md drop-shadow-md sm:m-8 sm:w-[80%] ${
                        colorMode === "dark" ? "bg-slate-600" : "bg-white"
                    }`}
                >
                    <div className="flex items-center justify-between gap-4 border-b p-4">
                        <div className="flex items-center gap-4">
                            <IconButton
                                onClick={onBackButtonClick}
                                colorScheme="brand"
                                icon={<Icon as={FiArrowLeft} />}
                                aria-label={"Go back"}
                                variant="ghost"
                                size="lg"
                            />
                            {groupConversation && (
                                <div className="flex items-center gap-2">
                                    <GroupAvatar />
                                    <span className="leading-none">{conversationTitle}</span>
                                </div>
                            )}
                            {!groupConversation && (
                                <div
                                    onClick={onConversationTitleClick}
                                    className={`flex cursor-pointer select-none items-center gap-2 rounded-lg p-1 ${itemHoverStyle} ${itemActiveStyle}`}
                                >
                                    <UserNameAvatar userName={conversationTitle} />
                                    <span className="text-lg">{conversationTitle}</span>
                                </div>
                            )}
                        </div>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                icon={<Icon as={FiMoreVertical} />}
                                aria-label={"Actions"}
                                variant="ghost"
                                colorScheme="brand"
                                size="lg"
                            />
                            <MenuList>
                                <MenuItem
                                    onClick={onConversationMembersButtonClick}
                                    icon={<Icon as={FiUsers} />}
                                    className={colorMode === "dark" ? "!text-brand-200" : "!text-brand-800"}
                                >
                                    Résztvevők
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                    <div className="flex flex-grow flex-col-reverse space-y-12 space-y-reverse overflow-y-auto overflow-x-hidden border-b p-2 shadow-inner sm:p-6">
                        <div className="!h-0" ref={messagesBottomPlaceholderRef}>
                            &nbsp;
                        </div>
                        {messages.map((message, index) => (
                            <Message
                                className={index === 0 ? "!m-0" : undefined}
                                key={message.id}
                                message={message}
                                showUserName={groupConversation}
                                onReactionCountButtonClick={onMessageReactionCountButtonClick}
                                onDeleteButtonClick={onMessageDeleteButtonClick}
                                onToggleMessageReaction={onToggleMessageReaction}
                            />
                        ))}
                        {messages.length === 0 && (
                            <div className="flex flex-grow items-center justify-center">
                                {messagesLoading && <ColorModeSpinner size="lg" />}
                                {!messagesLoading && (
                                    <p className="text-center">Nincsen egyetlen megjeleníthető üzenet sem.</p>
                                )}
                            </div>
                        )}
                        {messages.length > 0 && loadMoreMessagesButtonVisible && (
                            <div className="flex justify-center">
                                <Button
                                    colorScheme="brand"
                                    variant="ghost"
                                    onClick={onLoadMoreMessagesButtonClick}
                                    isLoading={messagesLoading}
                                    spinner={<ColorModeSpinner size="lg" />}
                                >
                                    Több üzenet betöltése
                                </Button>
                            </div>
                        )}
                    </div>
                    <CreateMessage onSubmit={onMessageSubmit} />
                </div>
            </div>
            <DeleteMessageAlertDialog
                visible={deleteMessageAlertDialogVisible}
                onClose={onDeleteMessageAlertDialogClose}
                onConfirmButtonClick={onDeleteMessageAlertDialogConfirmButtonClick}
                confirmButtonLoading={deleteMessageAlertDialogConfirmButtonLoading}
            />
            <ReactionListModal
                visible={reactionListModalVisible}
                onClose={onReactionListModalClose}
                onTabChange={onReactionListModalTabChange}
                reactionItems={reactionListReactionItems}
                loadMoreItemsButtonVisible={reactionListLoadMoreItemsButtonVisible}
                onLoadMoreItemsButtonClick={onReactionListLoadMoreItemsButtonClick}
                onUserProfileClick={onUserProfileClick}
                loading={reactionListLoading}
            />
        </MainLayout>
    );
};

export default ConversationScreenComponent;
