import React, { useState } from "react";
import CommentComponent from "./CommentComponent";
import { IReactionCount, TReaction } from "../../services/commonTypes";

type TProps = {
    authorName: string;
    content: string;
    createdTimeString: string;
    editable: boolean;
    deletable: boolean;
    reactionCount: IReactionCount;
    activeReaction?: TReaction;
    onToggleReactionButtonClick: (reaction: TReaction) => void;
    onAuthorProfileClick: () => void;
    onEditButtonClick: () => void;
    onDeleteButtonClick: () => void;
    onReactionCountButtonClick: () => void;
};

const CommentContainer = ({
    authorName,
    content,
    createdTimeString,
    editable,
    deletable,
    reactionCount,
    activeReaction,
    onToggleReactionButtonClick,
    onAuthorProfileClick,
    onEditButtonClick,
    onDeleteButtonClick,
    onReactionCountButtonClick,
}: TProps) => {
    const [reactionPopoverVisible, setReactionPopoverVisible] = useState<boolean>(false);

    const reactionCountSum: number = Object.values(reactionCount).reduce(
        (acc: number, count: number) => acc + count,
        0
    );

    const handleReactionPopoverToggleButtonClick = (reaction: TReaction) => {
        setReactionPopoverVisible(false);
        onToggleReactionButtonClick(reaction);
    };

    const handleReactionButtonClick = () => {
        setReactionPopoverVisible((visible) => !visible);
    };

    const handleReactionPopoverClose = () => {
        setReactionPopoverVisible(false);
    };

    return (
        <CommentComponent
            authorName={authorName}
            content={content}
            createdTimeString={createdTimeString}
            editable={editable}
            deletable={deletable}
            reactionCount={reactionCount}
            reactionCountSum={reactionCountSum}
            activeReaction={activeReaction}
            reactionPopoverVisible={reactionPopoverVisible}
            onReactionButtonClick={handleReactionButtonClick}
            onReactionPopoverToggleButtonClick={handleReactionPopoverToggleButtonClick}
            onReactionPopoverClose={handleReactionPopoverClose}
            onAuthorProfileClick={onAuthorProfileClick}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
            onReactionCountButtonClick={onReactionCountButtonClick}
        />
    );
};

export default CommentContainer;
