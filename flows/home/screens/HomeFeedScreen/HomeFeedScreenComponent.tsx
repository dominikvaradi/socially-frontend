import React from "react";
import MainLayoutComponent from "../../../common/components/MainLayout";
import { CreatePostFormValues, IPost, IReactionListItem, TReaction } from "../../../common/services/commonTypes";
import CreatePost from "../../../common/components/CreatePost";
import { FormikHelpers } from "formik";
import ReactionListModal from "../../../common/components/ReactionListModal";
import DeletePostAlertDialog from "../../../common/components/DeletePostAlertDialog";
import DeleteCommentAlertDialog from "../../../common/components/DeleteCommentAlertDialog";
import PostList from "../../../common/components/PostList";

export type TProps = {
    posts: IPost[];
    onCreatePostSubmit: (values: CreatePostFormValues, actions: FormikHelpers<CreatePostFormValues>) => void;
    onPostDeleteClick: (postId: string) => void;
    onPostReactionCountButtonClick: (postId: string) => void;
    onUserProfileClick: (userId: string) => void;
    onCommentDeleteButtonClick: (commentId: string) => void;
    onCommentReactionCountButtonClick: (commentId: string) => void;
    reactionListModalVisible: boolean;
    onReactionListModalClose: () => void;
    onReactionListModalTabChange: (reaction?: TReaction) => void;
    reactionListReactionItems: IReactionListItem[];
    reactionListLoadMoreItemsButtonVisible: boolean;
    onReactionListLoadMoreItemsButtonClick: () => void;
    reactionListLoading: boolean;
    deletePostAlertDialogVisible: boolean;
    onDeletePostAlertDialogClose: () => void;
    onDeletePostAlertDialogConfirmButtonClick: () => void;
    deleteCommentAlertDialogVisible: boolean;
    onDeleteCommentAlertDialogClose: () => void;
    onDeleteCommentAlertDialogConfirmButtonClick: () => void;
    postsLoading: boolean;
    loadMorePostsButtonVisible: boolean;
    onLoadMorePostsButtonClick: () => void;
};

const HomeFeedScreenComponent = ({
    posts,
    onCreatePostSubmit,
    onPostDeleteClick,
    onPostReactionCountButtonClick,
    onUserProfileClick,
    onCommentDeleteButtonClick,
    onCommentReactionCountButtonClick,
    reactionListModalVisible,
    onReactionListModalClose,
    onReactionListModalTabChange,
    reactionListReactionItems,
    reactionListLoadMoreItemsButtonVisible,
    onReactionListLoadMoreItemsButtonClick,
    reactionListLoading,
    deletePostAlertDialogVisible,
    onDeletePostAlertDialogClose,
    onDeletePostAlertDialogConfirmButtonClick,
    deleteCommentAlertDialogVisible,
    onDeleteCommentAlertDialogClose,
    onDeleteCommentAlertDialogConfirmButtonClick,
    postsLoading,
    loadMorePostsButtonVisible,
    onLoadMorePostsButtonClick,
}: TProps) => {
    return (
        <MainLayoutComponent>
            <div className="flex w-full justify-center px-8 sm:px-0 sm:pl-16 md:pl-0">
                <div className="flex w-full flex-col items-center sm:w-3/4 md:w-1/2 xl:w-[40%]">
                    <CreatePost
                        placeholder="Mi jár a fejedben, Naruto?"
                        onSubmit={onCreatePostSubmit}
                        className="mt-4"
                    />
                    <PostList
                        posts={posts}
                        onPostDeleteButtonClick={onPostDeleteClick}
                        onPostReactionCountButtonClick={onPostReactionCountButtonClick}
                        onCommentDeleteButtonClick={onCommentDeleteButtonClick}
                        onCommentReactionCountButtonClick={onCommentReactionCountButtonClick}
                        postsLoading={postsLoading}
                        loadMorePostsButtonVisible={loadMorePostsButtonVisible}
                        onLoadMorePostsButtonClick={onLoadMorePostsButtonClick}
                    />
                </div>
            </div>
            <ReactionListModal
                visible={reactionListModalVisible}
                onClose={onReactionListModalClose}
                onTabChange={onReactionListModalTabChange}
                reactionItems={reactionListReactionItems}
                loadMoreItemsButtonVisible={reactionListLoadMoreItemsButtonVisible}
                onLoadMoreItemsButtonClick={onReactionListLoadMoreItemsButtonClick}
                onUserProfileClick={onUserProfileClick}
                loading={reactionListLoading}
            />
            <DeletePostAlertDialog
                visible={deletePostAlertDialogVisible}
                onClose={onDeletePostAlertDialogClose}
                onConfirmButtonClick={onDeletePostAlertDialogConfirmButtonClick}
            />
            <DeleteCommentAlertDialog
                visible={deleteCommentAlertDialogVisible}
                onClose={onDeleteCommentAlertDialogClose}
                onConfirmButtonClick={onDeleteCommentAlertDialogConfirmButtonClick}
            />
        </MainLayoutComponent>
    );
};

export default HomeFeedScreenComponent;
