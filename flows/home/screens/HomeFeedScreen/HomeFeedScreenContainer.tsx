import React, { useEffect, useState } from "react";
import HomeFeedScreenComponent from "./HomeFeedScreenComponent";
import {
    CreateCommentFormValues,
    CreatePostFormValues,
    EditCommentFormValues,
    EditPostFormValues,
    IComment,
    IPost,
    TReaction,
} from "../../../common/services/commonTypes";
import { useHomeContext } from "../../services/homeContext";
import { useCommonContext } from "../../../common/services/commonContext";
import { FormikHelpers } from "formik";

const HomeFeedScreenContainer = () => {
    const { controller: commonController } = useCommonContext();
    const { store, controller } = useHomeContext();

    const [reactionListModalPost, setReactionListModalPost] = useState<IPost | undefined>(undefined);
    const [reactionListModalComment, setReactionListModalComment] = useState<IComment | undefined>(undefined);
    const [reactionListModalReaction, setReactionListModalReaction] = useState<TReaction | undefined>(undefined);

    const [deletePostAlertDialogPost, setDeletePostAlertDialogPost] = useState<IPost | undefined>(undefined);
    const [deletePostAlertDialogConfirmButtonLoading, setDeletePostAlertDialogConfirmButtonLoading] =
        useState<boolean>(false);

    const [deleteCommentAlertDialogComment, setDeleteCommentAlertDialogComment] = useState<IComment | undefined>(
        undefined
    );
    const [deleteCommentAlertDialogConfirmButtonLoading, setDeleteCommentAlertDialogConfirmButtonLoading] =
        useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await commonController.initMainLayout();
            await controller.initFeedScreen();
        })();
    }, [commonController, controller]);

    const handleCreatePostSubmit = (values: CreatePostFormValues, actions: FormikHelpers<CreatePostFormValues>) => {
        controller.createPost(values, actions);
    };

    const handlePostDeleteClick = (post: IPost) => {
        setDeletePostAlertDialogPost(post);
    };

    const handlePostReactionCountButtonClick = async (post: IPost) => {
        if (reactionListModalComment) {
            return;
        }

        const result = await controller.loadReactionsForPost(post);
        if (!result) return;

        setReactionListModalPost(post);
    };

    const handleUserProfileClick = (userId: string) => {
        controller.navigateToUserTimelinePage(userId);
        handleReactionListModalClose();
    };

    const handleCommentDeleteButtonClick = (comment: IComment) => {
        setDeleteCommentAlertDialogComment(comment);
    };

    const handleCommentReactionCountButtonClick = async (comment: IComment) => {
        if (reactionListModalPost) {
            return;
        }

        const result = await controller.loadReactionsForComment(comment);
        if (!result) return;

        setReactionListModalComment(comment);
    };

    const handleReactionListModalClose = () => {
        setReactionListModalPost(undefined);
        setReactionListModalComment(undefined);
        setReactionListModalReaction(undefined);
    };

    const handleReactionListModalTabChange = (reaction?: TReaction) => {
        if (reactionListModalPost) {
            controller.loadReactionsForPost(reactionListModalPost, reaction);
        } else if (reactionListModalComment) {
            controller.loadReactionsForComment(reactionListModalComment, reaction);
        }

        setReactionListModalReaction(reaction);
    };

    const handleReactionListLoadMoreItemsButtonClick = () => {
        if (reactionListModalPost) {
            controller.loadMoreReactionsForPost(reactionListModalPost, reactionListModalReaction);
        } else if (reactionListModalComment) {
            controller.loadMoreReactionsForComment(reactionListModalComment, reactionListModalReaction);
        }
    };

    const handleDeletePostAlertDialogClose = () => {
        setDeletePostAlertDialogPost(undefined);
    };

    const handleDeletePostAlertDialogConfirmButtonClick = async () => {
        if (!deletePostAlertDialogPost) return;

        setDeletePostAlertDialogConfirmButtonLoading(true);

        await controller.deletePost(deletePostAlertDialogPost);

        setDeletePostAlertDialogConfirmButtonLoading(false);
        setDeletePostAlertDialogPost(undefined);
    };

    const handleDeleteCommentAlertDialogClose = () => {
        setDeleteCommentAlertDialogComment(undefined);
    };

    const handleDeleteCommentAlertDialogConfirmButtonClick = async () => {
        if (!deleteCommentAlertDialogComment) return;

        setDeleteCommentAlertDialogConfirmButtonLoading(true);

        await controller.deleteComment(deleteCommentAlertDialogComment);

        setDeleteCommentAlertDialogConfirmButtonLoading(false);
        setDeleteCommentAlertDialogComment(undefined);
    };

    const handleLoadMorePostsButtonClick = () => {
        controller.loadMorePosts();
    };

    const handleTogglePostReaction = async (post: IPost, reaction: TReaction) => {
        await controller.toggleReactionOnPost(post, reaction);
    };

    const handleEditPostSubmit = async (
        post: IPost,
        values: EditPostFormValues,
        actions: FormikHelpers<EditPostFormValues>
    ) => {
        await controller.editPost(post, values, actions);
    };

    const handleLoadCommentsForPost = async (post: IPost) => {
        await controller.loadCommentsForPost(post);
    };

    const handleLoadMoreCommentsForPost = async (post: IPost) => {
        await controller.loadMoreCommentsForPost(post);
    };

    const handleCreateCommentForPostSubmit = (
        post: IPost,
        values: CreateCommentFormValues,
        actions: FormikHelpers<CreateCommentFormValues>
    ) => {
        controller.createCommentForPost(post, values, actions);
    };

    const handleToggleCommentReaction = async (post: IPost, comment: IComment, reaction: TReaction) => {
        await controller.toggleReactionOnComment(post, comment, reaction);
    };

    const handleEditCommentSubmit = async (
        post: IPost,
        comment: IComment,
        values: EditCommentFormValues,
        actions: FormikHelpers<EditCommentFormValues>
    ) => {
        await controller.editComment(post, comment, values, actions);
    };

    return (
        <HomeFeedScreenComponent
            posts={store.feedScreenStore.posts}
            onCreatePostSubmit={handleCreatePostSubmit}
            onPostDeleteClick={handlePostDeleteClick}
            onPostReactionCountButtonClick={handlePostReactionCountButtonClick}
            onUserProfileClick={handleUserProfileClick}
            onCommentDeleteButtonClick={handleCommentDeleteButtonClick}
            onCommentReactionCountButtonClick={handleCommentReactionCountButtonClick}
            reactionListModalVisible={!!reactionListModalPost || !!reactionListModalComment}
            onReactionListModalClose={handleReactionListModalClose}
            onReactionListModalTabChange={handleReactionListModalTabChange}
            reactionListReactionItems={store.feedScreenStore.reactionListReactionItems}
            reactionListLoadMoreItemsButtonVisible={
                store.feedScreenStore.reactionListReactionItems.length <
                store.feedScreenStore.reactionListReactionItemsTotalElementCount
            }
            onReactionListLoadMoreItemsButtonClick={handleReactionListLoadMoreItemsButtonClick}
            reactionListLoading={store.feedScreenStore.reactionListReactionItemsLoading}
            deletePostAlertDialogVisible={!!deletePostAlertDialogPost}
            onDeletePostAlertDialogClose={handleDeletePostAlertDialogClose}
            onDeletePostAlertDialogConfirmButtonClick={handleDeletePostAlertDialogConfirmButtonClick}
            deletePostAlertDialogConfirmButtonLoading={deletePostAlertDialogConfirmButtonLoading}
            deleteCommentAlertDialogVisible={!!deleteCommentAlertDialogComment}
            onDeleteCommentAlertDialogClose={handleDeleteCommentAlertDialogClose}
            onDeleteCommentAlertDialogConfirmButtonClick={handleDeleteCommentAlertDialogConfirmButtonClick}
            deleteCommentAlertDialogConfirmButtonLoading={deleteCommentAlertDialogConfirmButtonLoading}
            postsLoading={store.feedScreenStore.postsLoading}
            loadMorePostsButtonVisible={
                store.feedScreenStore.posts.length < store.feedScreenStore.postsTotalElementCount
            }
            onLoadMorePostsButtonClick={handleLoadMorePostsButtonClick}
            onTogglePostReaction={handleTogglePostReaction}
            onEditPostSubmit={handleEditPostSubmit}
            onLoadCommentsForPost={handleLoadCommentsForPost}
            onLoadMoreCommentsForPost={handleLoadMoreCommentsForPost}
            onCreateCommentForPostSubmit={handleCreateCommentForPostSubmit}
            onToggleCommentReaction={handleToggleCommentReaction}
            onEditCommentSubmit={handleEditCommentSubmit}
        />
    );
};

export default HomeFeedScreenContainer;
