import React, { useEffect, useState } from "react";
import HomeFeedScreenComponent from "./HomeFeedScreenComponent";
import { TReaction } from "../../../common/services/commonTypes";
import { useHomeContext } from "../../services/homeContext";
import { useCommonContext } from "../../../common/services/commonContext";

const HomeFeedScreenContainer = () => {
    const { controller: commonController } = useCommonContext();
    const { store, controller } = useHomeContext();

    const [reactionListModalVisible, setReactionListModalVisible] = useState<boolean>(false);
    const [deletePostAlertDialogPostId, setDeletePostAlertDialogPostId] = useState<string | undefined>(undefined);
    const [deletePostAlertDialogConfirmButtonLoading, setDeletePostAlertDialogConfirmButtonLoading] =
        useState<boolean>(false);
    const [deleteCommentAlertDialogCommentId, setDeleteCommentAlertDialogCommentId] = useState<string | undefined>(
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

    const handlePostDeleteClick = (postId: string) => {
        setDeletePostAlertDialogPostId(postId);
    };

    const handlePostReactionCountButtonClick = (postId: string) => {
        setReactionListModalVisible(true);
        console.log("handlePostReactionCountButtonClick: " + postId);
    };

    const handleUserProfileClick = controller.navigateToUserTimelinePage;

    const handleCommentDeleteButtonClick = (commentId: string) => {
        setDeleteCommentAlertDialogCommentId(commentId);
    };

    const handleCommentReactionCountButtonClick = (commentId: string) => {
        console.log("handleCommentReactionCountButtonClick: " + commentId);
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

    const handleDeletePostAlertDialogClose = () => {
        setDeletePostAlertDialogPostId(undefined);
    };

    const handleDeletePostAlertDialogConfirmButtonClick = async () => {
        if (!deletePostAlertDialogPostId) return;

        setDeletePostAlertDialogConfirmButtonLoading(true);

        await controller.deletePost(deletePostAlertDialogPostId);

        setDeletePostAlertDialogConfirmButtonLoading(false);
        setDeletePostAlertDialogPostId(undefined);
    };

    const handleDeleteCommentAlertDialogClose = () => {
        setDeleteCommentAlertDialogCommentId(undefined);
    };

    const handleDeleteCommentAlertDialogConfirmButtonClick = async () => {
        if (!deleteCommentAlertDialogCommentId) return;

        setDeleteCommentAlertDialogConfirmButtonLoading(true);

        // await controller....
        console.log("handleDeleteCommentAlertDialogConfirmButtonClick: " + deleteCommentAlertDialogCommentId);

        setDeleteCommentAlertDialogConfirmButtonLoading(false);
        setDeleteCommentAlertDialogCommentId(undefined);
    };

    const handleLoadMorePostsButtonClick = () => {
        controller.loadMorePosts();
    };

    const handleTogglePostReaction = controller.toggleReactionOnPost;

    const handleEditPostSubmit = controller.editPost;

    return (
        <HomeFeedScreenComponent
            posts={store.feedScreenStore.posts}
            onCreatePostSubmit={handleCreatePostSubmit}
            onPostDeleteClick={handlePostDeleteClick}
            onPostReactionCountButtonClick={handlePostReactionCountButtonClick}
            onUserProfileClick={handleUserProfileClick}
            onCommentDeleteButtonClick={handleCommentDeleteButtonClick}
            onCommentReactionCountButtonClick={handleCommentReactionCountButtonClick}
            reactionListModalVisible={reactionListModalVisible}
            onReactionListModalClose={handleReactionListModalClose}
            onReactionListModalTabChange={handleReactionListModalTabChange}
            reactionListReactionItems={store.feedScreenStore.reactionListReactionItems}
            reactionListLoadMoreItemsButtonVisible={store.feedScreenStore.reactionListLoadMoreItemsButtonVisible}
            onReactionListLoadMoreItemsButtonClick={handleReactionListLoadMoreItemsButtonClick}
            reactionListLoading={store.feedScreenStore.reactionListLoading}
            deletePostAlertDialogVisible={!!deletePostAlertDialogPostId}
            onDeletePostAlertDialogClose={handleDeletePostAlertDialogClose}
            onDeletePostAlertDialogConfirmButtonClick={handleDeletePostAlertDialogConfirmButtonClick}
            deletePostAlertDialogConfirmButtonLoading={deletePostAlertDialogConfirmButtonLoading}
            deleteCommentAlertDialogVisible={!!deleteCommentAlertDialogCommentId}
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
        />
    );
};

export default HomeFeedScreenContainer;
