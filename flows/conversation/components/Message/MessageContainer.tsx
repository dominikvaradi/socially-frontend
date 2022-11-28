import React, { useState } from "react";
import MessageComponent from "./MessageComponent";
import { IMessage } from "../../services/conversationTypes";
import { TReaction } from "../../../common/services/commonTypes";

type TProps = {
    className?: string;
    message: IMessage;
    showUserName: boolean;
    onReactionCountButtonClick: (message: IMessage) => void;
    onDeleteButtonClick: (message: IMessage) => void;
    onToggleMessageReaction: (message: IMessage, reaction: TReaction) => Promise<void>;
};

const MessageContainer = ({
    className,
    message,
    showUserName,
    onReactionCountButtonClick,
    onDeleteButtonClick,
    onToggleMessageReaction,
}: TProps) => {
    const [reactionPopoverVisible, setReactionPopoverVisible] = useState<boolean>(false);

    const reactionCountSum: number = Object.values(message.reactionCount).reduce(
        (acc: number, count: number) => acc + count,
        0
    );

    const handleReactionCountButtonClick = () => {
        onReactionCountButtonClick(message);
    };

    const handleReactionButtonClick = () => {
        setReactionPopoverVisible((visible) => !visible);
    };

    const handleReactionPopoverClose = () => {
        setReactionPopoverVisible(false);
    };

    const handleReactionPopoverToggleButtonClick = async (reaction: TReaction) => {
        await onToggleMessageReaction(message, reaction);

        setReactionPopoverVisible(false);
    };

    const handleDeleteButtonClick = () => {
        onDeleteButtonClick(message);
    };

    return (
        <MessageComponent
            className={className}
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
