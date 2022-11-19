import React, { useState } from "react";
import MessageComponent from "./MessageComponent";
import { IMessage } from "../../services/conversationTypes";
import { TReaction } from "../../../common/services/commonTypes";

type TProps = {
    message: IMessage;
    showUserName: boolean;
    onReactionCountButtonClick: (messageId: string) => void;
    onDeleteButtonClick: (messageId: string) => void;
};

const MessageContainer = ({ message, showUserName, onReactionCountButtonClick, onDeleteButtonClick }: TProps) => {
    const [reactionPopoverVisible, setReactionPopoverVisible] = useState<boolean>(false);

    const reactionCountSum: number = Object.values(message.reactionCount).reduce(
        (acc: number, count: number) => acc + count,
        0
    );

    const handleReactionCountButtonClick = () => {
        onReactionCountButtonClick(message.id);
    };

    const handleReactionButtonClick = () => {
        setReactionPopoverVisible((visible) => !visible);
    };

    const handleReactionPopoverClose = () => {
        setReactionPopoverVisible(false);
    };

    const handleReactionPopoverToggleButtonClick = (reaction: TReaction) => {
        setReactionPopoverVisible(false);
        console.log("handleReactionPopoverToggleButtonClick: " + reaction);
    };

    const handleDeleteButtonClick = () => {
        onDeleteButtonClick(message.id);
    };

    return (
        <MessageComponent
            userName={message.userName}
            content={message.content}
            writtenBySelf={message.writtenBySelf}
            showUserName={showUserName}
            reactionCount={message.reactionCount}
            reactionCountSum={reactionCountSum}
            createdTimeString={message.createdTimeString}
            onReactionCountButtonClick={handleReactionCountButtonClick}
            onReactionButtonClick={handleReactionButtonClick}
            activeReaction={message.activeReactionOfUser}
            reactionPopoverVisible={reactionPopoverVisible}
            onReactionPopoverClose={handleReactionPopoverClose}
            onReactionPopoverToggleButtonClick={handleReactionPopoverToggleButtonClick}
            onDeleteButtonClick={handleDeleteButtonClick}
        />
    );
};

export default MessageContainer;
