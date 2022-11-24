import React, { useEffect, useState } from "react";
import HomeFeedScreenComponent from "./HomeFeedScreenComponent";
import { IComment, IPost, TReaction } from "../../../common/services/commonTypes";
import { useHomeContext } from "../../services/homeContext";
import { useCommonContext } from "../../../common/services/commonContext";

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

    const handleCreatePostSubmit = controller.createPost;

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

    const handleUserProfileClick = controller.navigateToUserTimelinePage;

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

    const handleTogglePostReaction = controller.toggleReactionOnPost;

    const handleEditPostSubmit = controller.editPost;

    const handleLoadCommentsForPost = controller.loadCommentsForPost;

    const handleLoadMoreCommentsForPost = controller.loadMoreCommentsForPost;

    const handleCreateCommentForPostSubmit = controller.createCommentForPost;

    const handleToggleCommentReaction = controller.toggleReactionOnComment;

    const handleEditCommentSubmit = controller.editComment;

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
