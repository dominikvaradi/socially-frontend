import React, { useEffect, useRef, useState } from "react";
import ConversationScreenComponent from "./ConversationScreenComponent";
import { CreateMessageFormValues, IMessage } from "../../services/conversationTypes";
import { TReaction } from "../../../common/services/commonTypes";
import { FormikHelpers } from "formik";
import { useConversationContext } from "../../services/conversationContext";
import { useCommonContext } from "../../../common/services/commonContext";
import { getConversationTitle } from "../../../common/services/commonUtils";
import tokenStorage from "../../../common/tokenStorage";
import { useRouter } from "next/router";

const ConversationScreenContainer = () => {
    const router = useRouter();
    const { store, controller } = useConversationContext();
    const { controller: commonController } = useCommonContext();

    const messagesBottomPlaceholderRef = useRef<HTMLDivElement>(null);
    const [deleteMessageAlertDialogMessage, setDeleteMessageAlertDialogMessage] = useState<IMessage | undefined>(
        undefined
    );
    const [deleteMessageAlertDialogConfirmButtonLoading, setDeleteMessageAlertDialogConfirmButtonLoading] =
        useState<boolean>(false);
    const [reactionListModalMessage, setReactionListModalMessage] = useState<IMessage | undefined>(undefined);
    const [reactionListModalReaction, setReactionListModalReaction] = useState<TReaction | undefined>(undefined);

    useEffect(() => {
        if (!router.isReady) return;

        (async () => {
            await commonController.initMainLayout();
            await controller.initConversationScreen(router.query.conversationId as string);
        })();
    }, [controller, commonController, router]);

    useEffect(() => {
        messagesBottomPlaceholderRef.current?.scrollIntoView();
    }, [messagesBottomPlaceholderRef]);

    const handleLoadMoreMessagesButtonClick = () => {
        controller.loadMoreMessages();
    };

    const handleMessageReactionCountButtonClick = async (message: IMessage) => {
        const result = await controller.loadReactionsForMessage(message);
        if (!result) return;

        setReactionListModalMessage(message);
    };

    const handleMessageDeleteButtonClick = (message: IMessage) => {
        setDeleteMessageAlertDialogMessage(message);
    };

    const handleDeleteMessageAlertDialogClose = () => {
        setDeleteMessageAlertDialogMessage(undefined);
    };

    const handleDeleteMessageAlertDialogConfirmButtonClick = async () => {
        if (!deleteMessageAlertDialogMessage) return;

        setDeleteMessageAlertDialogConfirmButtonLoading(true);

        await controller.deleteMessage(deleteMessageAlertDialogMessage);

        setDeleteMessageAlertDialogConfirmButtonLoading(false);
        setDeleteMessageAlertDialogMessage(undefined);
    };

    const handleReactionListModalClose = () => {
        setReactionListModalMessage(undefined);
        setReactionListModalReaction(undefined);
    };

    const handleReactionListModalTabChange = (reaction?: TReaction) => {
        if (reactionListModalMessage) {
            controller.loadReactionsForMessage(reactionListModalMessage, reaction);
        }

        setReactionListModalReaction(reaction);
    };

    const handleReactionListLoadMoreItemsButtonClick = () => {
        if (!reactionListModalMessage) return;

        controller.loadMoreReactionsForMessage(reactionListModalMessage, reactionListModalReaction);
    };

    const handleUserProfileClick = (userId: string) => {
        controller.navigateToUserTimelinePage(userId);
    };

    const handleConversationMembersButtonClick = () => {
        const conversationId = store.conversationScreenStore.conversation?.id;
        if (!conversationId) return;

        controller.navigateToConversationMembersPage(conversationId);
    };

    const handleBackButtonClick = () => {
        controller.navigateToConversationsListPage();
    };

    const handleMessageSubmit = async (
        values: CreateMessageFormValues,
        actions: FormikHelpers<CreateMessageFormValues>
    ) => {
        const result = await controller.createMessage(values, actions);
        if (!result) return;

        setTimeout(() => {
            messagesBottomPlaceholderRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
    };

    const handleConversationTitleClick = () => {
        const userId =
            store.conversationScreenStore.conversation?.type === "DIRECT" &&
            store.conversationScreenStore.conversation.members
                .filter((member) => member.userId !== tokenStorage.getUserId())
                .map((member) => member.userId)[0];
        if (!userId) return;

        controller.navigateToUserTimelinePage(userId);
    };

    const handleToggleMessageReaction = async (message: IMessage, reaction: TReaction) => {
        controller.toggleReactionOnMessage(message, reaction);
    };

    return (
        <ConversationScreenComponent
            messages={store.conversationScreenStore.messages}
            messagesBottomPlaceholderRef={messagesBottomPlaceholderRef}
            messagesLoading={store.conversationScreenStore.messagesLoading}
            loadMoreMessagesButtonVisible={
                store.conversationScreenStore.messages.length < store.conversationScreenStore.messagesTotalElementCount
            }
            onLoadMoreMessagesButtonClick={handleLoadMoreMessagesButtonClick}
            onMessageReactionCountButtonClick={handleMessageReactionCountButtonClick}
            onMessageDeleteButtonClick={handleMessageDeleteButtonClick}
            deleteMessageAlertDialogVisible={!!deleteMessageAlertDialogMessage}
            onDeleteMessageAlertDialogClose={handleDeleteMessageAlertDialogClose}
            deleteMessageAlertDialogConfirmButtonLoading={deleteMessageAlertDialogConfirmButtonLoading}
            onDeleteMessageAlertDialogConfirmButtonClick={handleDeleteMessageAlertDialogConfirmButtonClick}
            reactionListModalVisible={!!reactionListModalMessage}
            onReactionListModalClose={handleReactionListModalClose}
            onReactionListModalTabChange={handleReactionListModalTabChange}
            reactionListReactionItems={store.conversationScreenStore.reactionListReactionItems}
            reactionListLoadMoreItemsButtonVisible={
                store.conversationScreenStore.reactionListReactionItems.length <
                store.conversationScreenStore.reactionListReactionItemsTotalElementCount
            }
            onReactionListLoadMoreItemsButtonClick={handleReactionListLoadMoreItemsButtonClick}
            reactionListLoading={store.conversationScreenStore.reactionListReactionItemsLoading}
            onUserProfileClick={handleUserProfileClick}
            conversationTitle={
                store.conversationScreenStore.conversation
                    ? getConversationTitle(
                          store.conversationScreenStore.conversation.type,
                          store.conversationScreenStore.conversation.members,
                          100
                      )
                    : "Betöltés alatt..."
            }
            onConversationTitleClick={handleConversationTitleClick}
            groupConversation={store.conversationScreenStore.conversation?.type === "GROUP"}
            onConversationMembersButtonClick={handleConversationMembersButtonClick}
            onBackButtonClick={handleBackButtonClick}
            onMessageSubmit={handleMessageSubmit}
            onToggleMessageReaction={handleToggleMessageReaction}
        />
    );
};

export default ConversationScreenContainer;
