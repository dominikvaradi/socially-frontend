import React, { useEffect, useRef, useState } from "react";
import ConversationScreenComponent from "./ConversationScreenComponent";
import { CreateMessageFormValues, IConversationMember, IMessage } from "../../services/conversationTypes";
import { IReactionListItem, TReaction } from "../../../common/services/commonTypes";
import { FormikHelpers } from "formik";

const CONVERSATION_TITLE_MAX_LENGTH = 55;

const ConversationScreenContainer = () => {
    const messagesBottomPlaceholderRef = useRef<HTMLDivElement>(null);
    const [deleteMessageAlertDialogMessageId, setDeleteMessageAlertDialogMessageId] = useState<string | undefined>(
        undefined
    );
    const [reactionListModalVisible, setReactionListModalVisible] = useState<boolean>(false);

    useEffect(() => {
        //messagesBottomPlaceholderRef.current?.scrollIntoView({ behavior: 'smooth' })
        messagesBottomPlaceholderRef.current?.scrollIntoView();
    }, [messagesBottomPlaceholderRef]);

    /*const conversationTitle = "Naruto Uzumaki"*/
    let conversationTitle = mockMembers.map((member) => member.userName).join(", ");
    conversationTitle =
        conversationTitle.length > CONVERSATION_TITLE_MAX_LENGTH
            ? conversationTitle.substring(0, CONVERSATION_TITLE_MAX_LENGTH).concat("...")
            : conversationTitle;

    const handleLoadMoreMessagesButtonClick = () => {
        console.log("handleLoadMoreMessagesButtonClick");
    };

    const handleMessageReactionCountButtonClick = (messageId: string) => {
        setReactionListModalVisible(true);
        console.log("handleMessageReactionCountButtonClick: " + messageId);
    };

    const handleMessageDeleteButtonClick = (messageId: string) => {
        setDeleteMessageAlertDialogMessageId(messageId);
    };

    const handleDeleteMessageAlertDialogClose = () => {
        setDeleteMessageAlertDialogMessageId(undefined);
    };

    const handleDeleteMessageAlertDialogConfirmButtonClick = () => {
        if (!deleteMessageAlertDialogMessageId) return;

        console.log("handleDeleteMessageAlertDialogConfirmButtonClick: " + deleteMessageAlertDialogMessageId);
        setDeleteMessageAlertDialogMessageId(undefined);
    };

    const handleReactionListModalClose = () => {
        setReactionListModalVisible(false);
    };

    const handleReactionListModalTabChange = (reaction?: TReaction) => {
        console.log("handleReactionListModalTabChange: " + reaction);
    };

    const handleReactionListLoadMoreItemsButtonClick = () => {
        console.log("handleReactionListLoadMoreItemsButtonClick");
    };

    const handleUserProfileClick = (userId: string) => {
        console.log("handleUserProfileClick: " + userId);
    };

    const handleConversationMembersButtonClick = () => {
        console.log("handleConversationMembersButtonClick");
    };

    const handleBackButtonClick = () => {
        console.log("handleBackButtonClick");
    };

    const handleMessageSubmit = (values: CreateMessageFormValues, actions: FormikHelpers<CreateMessageFormValues>) => {
        setTimeout(() => {
            console.log("handleMessageSubmit:\n" + JSON.stringify(values, null, 2));
            actions.resetForm();
        }, 1500);
    };

    const handleConversationTitleClick = () => {
        console.log("handleConversationTitleClick");
    };

    return (
        <ConversationScreenComponent
            messages={mockMessages}
            messagesBottomPlaceholderRef={messagesBottomPlaceholderRef}
            messagesLoading={false}
            loadMoreMessagesButtonVisible={true}
            onLoadMoreMessagesButtonClick={handleLoadMoreMessagesButtonClick}
            onMessageReactionCountButtonClick={handleMessageReactionCountButtonClick}
            onMessageDeleteButtonClick={handleMessageDeleteButtonClick}
            deleteMessageAlertDialogVisible={!!deleteMessageAlertDialogMessageId}
            onDeleteMessageAlertDialogClose={handleDeleteMessageAlertDialogClose}
            onDeleteMessageAlertDialogConfirmButtonClick={handleDeleteMessageAlertDialogConfirmButtonClick}
            reactionListModalVisible={reactionListModalVisible}
            onReactionListModalClose={handleReactionListModalClose}
            onReactionListModalTabChange={handleReactionListModalTabChange}
            reactionListReactionItems={mockReactionListReactionItems}
            reactionListLoadMoreItemsButtonVisible={true}
            onReactionListLoadMoreItemsButtonClick={handleReactionListLoadMoreItemsButtonClick}
            reactionListLoading={false}
            onUserProfileClick={handleUserProfileClick}
            conversationTitle={conversationTitle}
            onConversationTitleClick={handleConversationTitleClick}
            groupConversation={true}
            onConversationMembersButtonClick={handleConversationMembersButtonClick}
            onBackButtonClick={handleBackButtonClick}
            onMessageSubmit={handleMessageSubmit}
        />
    );
};

export default ConversationScreenContainer;

const mockMessages: IMessage[] = (
    [
        {
            id: "0",
            userId: "0",
            userName: "Naruto Uzumaki",
            content: "Lorem Ipsum.",
            writtenBySelf: true,
            reactionCount: {
                likeCount: 1,
                heartCount: 1,
                funnyCount: 0,
                angryCount: 0,
            },
            createdTimeString: "1 perce",
            activeReactionOfUser: "HEART",
        },
        {
            id: "1",
            userId: "0",
            userName: "Naruto Uzumaki",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            writtenBySelf: true,
            reactionCount: {
                likeCount: 0,
                heartCount: 0,
                funnyCount: 0,
                angryCount: 0,
            },
            createdTimeString: "2 perce",
        },
        {
            id: "2",
            userId: "1",
            userName: "Sasuke Uchiha",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            writtenBySelf: false,
            reactionCount: {
                likeCount: 2,
                heartCount: 2,
                funnyCount: 2,
                angryCount: 2,
            },
            createdTimeString: "5 perce",
            activeReactionOfUser: "LIKE",
        },
        {
            id: "3",
            userId: "1",
            userName: "Sasuke Uchiha",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            writtenBySelf: false,
            reactionCount: {
                likeCount: 0,
                heartCount: 0,
                funnyCount: 1,
                angryCount: 0,
            },
            createdTimeString: "6 perce",
        },
        {
            id: "4",
            userId: "0",
            userName: "Naruto Uzumaki",
            content:
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            writtenBySelf: true,
            reactionCount: {
                likeCount: 2,
                heartCount: 0,
                funnyCount: 5,
                angryCount: 0,
            },
            createdTimeString: "12 perce",
            activeReactionOfUser: "ANGRY",
        },
        {
            id: "5",
            userId: "1",
            userName: "Sasuke Uchiha",
            content: "Lorem ipsum dolor sit amet.",
            writtenBySelf: false,
            reactionCount: {
                likeCount: 0,
                heartCount: 0,
                funnyCount: 0,
                angryCount: 1,
            },
            createdTimeString: "22 perce",
            activeReactionOfUser: "LIKE",
        },
        {
            id: "6",
            userId: "0",
            userName: "Naruto Uzumaki",
            content: "Lorem ipsum dolor sit amet.",
            writtenBySelf: true,
            reactionCount: {
                likeCount: 0,
                heartCount: 0,
                funnyCount: 0,
                angryCount: 0,
            },
            createdTimeString: "25 perce",
            activeReactionOfUser: "LIKE",
        },
        {
            id: "7",
            userId: "0",
            userName: "Naruto Uzumaki",
            content: "A.",
            writtenBySelf: true,
            reactionCount: {
                likeCount: 1,
                heartCount: 1,
                funnyCount: 1,
                angryCount: 1,
            },
            createdTimeString: "2 órája",
        },
        {
            id: "8",
            userId: "1",
            userName: "Sasuke Uchiha",
            content: "A.",
            writtenBySelf: false,
            reactionCount: {
                likeCount: 1,
                heartCount: 1,
                funnyCount: 1,
                angryCount: 1,
            },

            createdTimeString: "1 napja",
            activeReactionOfUser: "LIKE",
        },
    ] as IMessage[]
).reverse();

const mockReactionListReactionItems: IReactionListItem[] = [
    {
        id: "0",
        userId: "0",
        userName: "Naruto Uzumaki",
        reaction: "LIKE",
    },
    {
        id: "1",
        userId: "1",
        userName: "Sasuke Uchiha",
        reaction: "FUNNY",
    },
    {
        id: "2",
        userId: "2",
        userName: "Sakura Haruno",
        reaction: "ANGRY",
    },
    {
        id: "3",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "4",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "5",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "6",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "7",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "8",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "9",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "10",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "11",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "12",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
];

const mockMembers: IConversationMember[] = [
    {
        userId: "0",
        userName: "Naruto Uzumaki",
        role: "ADMIN",
    },
    {
        userId: "1",
        userName: "Sasuke Uchiha",
        role: "ADMIN",
    },
    {
        userId: "2",
        userName: "Hinata Hyuga",
        role: "NORMAL",
    },
    {
        userId: "3",
        userName: "Teszt Elek",
        role: "NORMAL",
    },
    {
        userId: "4",
        userName: "Uchiha Sasuke",
        role: "NORMAL",
    },
    {
        userId: "5",
        userName: "Himawari Uzumaki",
        role: "NORMAL",
    },
    {
        userId: "6",
        userName: "Boruto Uzumaki",
        role: "NORMAL",
    },
];
