import React, { useState } from "react";
import CommentComponent from "./CommentComponent";
import { EditCommentFormValues, IComment, TReaction } from "../../services/commonTypes";
import { FormikHelpers } from "formik/dist/types";
import { useCommonContext } from "../../services/commonContext";

type TProps = {
    comment: IComment;
    onDeleteButtonClick: (comment: IComment) => void;
    onReactionCountButtonClick: (comment: IComment) => void;
    onToggleCommentReaction: (comment: IComment, reaction: TReaction) => Promise<void>;
    onEditCommentSubmit: (
        comment: IComment,
        values: EditCommentFormValues,
        actions: FormikHelpers<EditCommentFormValues>
    ) => Promise<void>;
};

const CommentContainer = ({
    comment,
    onDeleteButtonClick,
    onReactionCountButtonClick,
    onToggleCommentReaction,
    onEditCommentSubmit,
}: TProps) => {
    const { controller } = useCommonContext();

    const [reactionPopoverVisible, setReactionPopoverVisible] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    const reactionCountSum: number = Object.values(comment.reactionCount).reduce(
        (acc: number, count: number) => acc + count,
        0
    );

    const handleReactionPopoverToggleButtonClick = async (reaction: TReaction) => {
        await onToggleCommentReaction(comment, reaction);

        setReactionPopoverVisible(false);
    };

    const handleReactionButtonClick = () => {
        setReactionPopoverVisible((visible) => !visible);
    };

    const handleReactionPopoverClose = () => {
        setReactionPopoverVisible(false);
    };

    const handleAuthorProfileClick = () => {
        controller.navigateToUserTimelinePage(comment.authorId);
    };

    const handleEditButtonClick = () => {
        setEditing(true);
    };

    const handleDeleteButtonClick = () => {
        onDeleteButtonClick(comment);
    };

    const handleReactionCountButtonClick = () => {
        onReactionCountButtonClick(comment);
    };

    const handleEditCommentSubmit = async (
        values: EditCommentFormValues,
        actions: FormikHelpers<EditCommentFormValues>
    ) => {
        await onEditCommentSubmit(comment, values, actions);
        setEditing(false);
    };

    const handleEditCommentCancelButtonClick = () => {
        setEditing(false);
    };

    return (
        <CommentComponent
            authorName={comment.authorName}
            content={comment.content}
            createdTimeString={comment.createdTimeString}
            editable={comment.editable}
            deletable={comment.deletable}
            reactionCount={comment.reactionCount}
            reactionCountSum={reactionCountSum}
            activeReaction={comment.activeReactionOfUser}
            reactionPopoverVisible={reactionPopoverVisible}
            onReactionButtonClick={handleReactionButtonClick}
            onReactionPopoverToggleButtonClick={handleReactionPopoverToggleButtonClick}
            onReactionPopoverClose={handleReactionPopoverClose}
            onAuthorProfileClick={handleAuthorProfileClick}
            onEditButtonClick={handleEditButtonClick}
            onDeleteButtonClick={handleDeleteButtonClick}
            onReactionCountButtonClick={handleReactionCountButtonClick}
            editing={editing}
            onEditCommentSubmit={handleEditCommentSubmit}
            onEditCommentCancelButtonClick={handleEditCommentCancelButtonClick}
        />
    );
};

export default CommentContainer;
