import React, { useState } from "react";
import CommentComponent from "./CommentComponent";
import { EditCommentFormValues, IComment, TReaction } from "../../services/commonTypes";
import { FormikHelpers } from "formik/dist/types";

type TProps = {
    comment: IComment;
    editable: boolean;
    deletable: boolean;
    onDeleteButtonClick: (commentId: string) => void;
    onReactionCountButtonClick: (commentId: string) => void;
};

const CommentContainer = ({
    comment,
    editable,
    deletable,
    onDeleteButtonClick,
    onReactionCountButtonClick,
}: TProps) => {
    const [reactionPopoverVisible, setReactionPopoverVisible] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    const reactionCountSum: number = Object.values(comment.reactionCount).reduce(
        (acc: number, count: number) => acc + count,
        0
    );

    const handleReactionPopoverToggleButtonClick = (reaction: TReaction) => {
        setReactionPopoverVisible(false);
        console.log("handleReactionPopoverToggleButtonClick: " + reaction);
    };

    const handleReactionButtonClick = () => {
        setReactionPopoverVisible((visible) => !visible);
    };

    const handleReactionPopoverClose = () => {
        setReactionPopoverVisible(false);
    };

    const handleAuthorProfileClick = () => {
        console.log("handleAuthorProfileClick: " + comment.authorId);
    };

    const handleEditButtonClick = () => {
        setEditing(true);
    };

    const handleDeleteButtonClick = () => {
        onDeleteButtonClick(comment.id);
    };

    const handleReactionCountButtonClick = () => {
        onReactionCountButtonClick(comment.id);
    };

    const handleEditCommentSubmit = (values: EditCommentFormValues, actions: FormikHelpers<EditCommentFormValues>) => {
        setTimeout(() => {
            console.log(`handleEditCommentSubmit:\nvalues: ${JSON.stringify(values, null, 2)}`);
            setEditing(false);
            actions.resetForm();
        }, 1000);
    };

    const handleEditCommentCancelButtonClick = () => {
        setEditing(false);
    };

    return (
        <CommentComponent
            authorName={comment.authorName}
            content={comment.content}
            createdTimeString={comment.createdTimeString}
            editable={editable}
            deletable={deletable}
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
