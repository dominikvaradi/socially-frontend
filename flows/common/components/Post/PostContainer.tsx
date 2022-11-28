import React, { useEffect, useRef, useState } from "react";
import PostComponent from "./PostComponent";
import {
    CreateCommentFormValues,
    EditCommentFormValues,
    EditPostFormValues,
    IComment,
    IPost,
    TReaction,
} from "../../services/commonTypes";
import { FormikHelpers } from "formik";
import { useCommonContext } from "../../services/commonContext";

type TProps = {
    post: IPost;
    onDeleteButtonClick: (post: IPost) => void;
    onReactionCountButtonClick: (post: IPost) => void;
    onCommentDeleteButtonClick: (comment: IComment) => void;
    onCommentReactionCountButtonClick: (comment: IComment) => void;
    onTogglePostReaction: (post: IPost, reaction: TReaction) => Promise<void>;
    onEditPostSubmit: (
        post: IPost,
        values: EditPostFormValues,
        actions: FormikHelpers<EditPostFormValues>
    ) => Promise<void>;
    onLoadComments: (post: IPost) => Promise<void>;
    onLoadMoreComments: (post: IPost) => Promise<void>;
    onCreateCommentSubmit: (
        post: IPost,
        values: CreateCommentFormValues,
        actions: FormikHelpers<CreateCommentFormValues>
    ) => void;
    onToggleCommentReaction: (post: IPost, comment: IComment, reaction: TReaction) => Promise<void>;
    onEditCommentSubmit: (
        post: IPost,
        comment: IComment,
        values: EditCommentFormValues,
        actions: FormikHelpers<EditCommentFormValues>
    ) => Promise<void>;
    showAddressee?: boolean;
};

const PostContainer = ({
    post,
    onDeleteButtonClick,
    onReactionCountButtonClick,
    onCommentDeleteButtonClick,
    onCommentReactionCountButtonClick,
    onTogglePostReaction,
    onEditPostSubmit,
    onLoadComments,
    onLoadMoreComments,
    onCreateCommentSubmit,
    onToggleCommentReaction,
    onEditCommentSubmit,
    showAddressee,
}: TProps) => {
    const { controller } = useCommonContext();

    const contentRef = useRef<HTMLParagraphElement>(null);
    const createCommentInputRef = useRef<HTMLTextAreaElement>(null);
    const [contentExpanded, setContentExpanded] = useState<boolean>(false);
    const [contentNeedExpand, setContentNeedExpand] = useState<boolean>(false);
    const [reactionPopoverVisible, setReactionPopoverVisible] = useState<boolean>(false);
    const [commentsVisible, setCommentsVisible] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [commentsLoading, setCommentsLoading] = useState(false);

    useEffect(() => {
        if (!contentRef.current) return;

        setContentNeedExpand(contentRef.current ? contentRef.current.scrollHeight > 200 : false);
    }, [contentRef, setContentNeedExpand]);

    const reactionCountSum: number = Object.values(post.reactionCount).reduce(
        (acc: number, count: number) => acc + count,
        0
    );

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleDeleteClick = () => {
        onDeleteButtonClick(post);
    };

    const handleContentExpandClick = () => {
        setContentExpanded((currentlyExpanded) => !currentlyExpanded);
    };

    const handleCommentButtonClick = async () => {
        if (!commentsVisible) {
            setCommentsLoading(true);
            setCommentsVisible(true);

            await onLoadComments(post);

            setCommentsLoading(false);
        }

        setTimeout(() => {
            createCommentInputRef.current?.focus();
        }, 50);
    };

    const handleAuthorProfileClick = () => {
        controller.navigateToUserTimelinePage(post.authorId);
    };

    const handleReactionCountButtonClick = () => {
        onReactionCountButtonClick(post);
    };

    const handleCommentCountButtonClick = async () => {
        if (!commentsVisible) {
            setCommentsLoading(true);
            setCommentsVisible(true);

            await onLoadComments(post);

            setCommentsLoading(false);
        } else {
            setCommentsVisible(false);
        }
    };

    const handleReactionPopoverToggleButtonClick = async (reaction: TReaction) => {
        await onTogglePostReaction(post, reaction);

        setReactionPopoverVisible(false);
    };

    const handleReactionButtonClick = () => {
        setReactionPopoverVisible((visible) => !visible);
    };

    const handleReactionPopoverClose = () => {
        setReactionPopoverVisible(false);
    };

    const handleCreateCommentSubmit = (
        values: CreateCommentFormValues,
        actions: FormikHelpers<CreateCommentFormValues>
    ) => {
        onCreateCommentSubmit(post, values, actions);
    };

    const handleLoadMoreCommentsButtonClick = async () => {
        setCommentsLoading(true);

        await onLoadMoreComments(post);

        setCommentsLoading(false);
    };

    const handleEditPostSubmit = async (values: EditPostFormValues, actions: FormikHelpers<EditPostFormValues>) => {
        await onEditPostSubmit(post, values, actions);
        setEditing(false);
    };

    const handleEditPostCancelButtonClick = () => {
        setEditing(false);
    };

    const handleToggleCommentReaction = async (comment: IComment, reaction: TReaction) => {
        await onToggleCommentReaction(post, comment, reaction);
    };

    const handleEditCommentSubmit = async (
        comment: IComment,
        values: EditCommentFormValues,
        actions: FormikHelpers<EditCommentFormValues>
    ) => {
        await onEditCommentSubmit(post, comment, values, actions);
    };

    const handleAddresseeProfileClick = () => {
        controller.navigateToUserTimelinePage(post.addresseeId);
    };

    return (
        <PostComponent
            header={post.header}
            content={post.content}
            authorName={post.authorName}
            commentCount={post.commentCount}
            createdTimeString={post.createdTimeString}
            editable={post.editable}
            deletable={post.deletable}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            reactionCount={post.reactionCount}
            reactionCountSum={reactionCountSum}
            contentRef={contentRef}
            contentNeedExpand={contentNeedExpand}
            contentExpanded={contentExpanded}
            onContentExpandClick={handleContentExpandClick}
            onCommentButtonClick={handleCommentButtonClick}
            onAuthorProfileClick={handleAuthorProfileClick}
            onReactionCountButtonClick={handleReactionCountButtonClick}
            onCommentCountButtonClick={handleCommentCountButtonClick}
            activeReaction={post.activeReactionOfUser}
            reactionPopoverVisible={reactionPopoverVisible}
            onReactionButtonClick={handleReactionButtonClick}
            onReactionPopoverToggleButtonClick={handleReactionPopoverToggleButtonClick}
            onReactionPopoverClose={handleReactionPopoverClose}
            comments={post.comments}
            commentsVisible={commentsVisible}
            createCommentInputRef={createCommentInputRef}
            onCreateCommentSubmit={handleCreateCommentSubmit}
            onCommentDeleteButtonClick={onCommentDeleteButtonClick}
            onCommentReactionCountButtonClick={onCommentReactionCountButtonClick}
            commentsLoading={commentsLoading}
            loadMoreCommentsButtonVisible={post.comments.length < post.commentCount}
            onLoadMoreCommentsButtonClick={handleLoadMoreCommentsButtonClick}
            editing={editing}
            onEditPostSubmit={handleEditPostSubmit}
            onEditPostCancelButtonClick={handleEditPostCancelButtonClick}
            onToggleCommentReaction={handleToggleCommentReaction}
            onEditCommentSubmit={handleEditCommentSubmit}
            showAddressee={!!showAddressee && post.addresseeId !== post.authorId}
            addresseeName={post.addresseeName}
            onAddresseeProfileClick={handleAddresseeProfileClick}
        />
    );
};

export default PostContainer;
