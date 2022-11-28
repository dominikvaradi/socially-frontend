import React from "react";
import MainLayoutComponent from "../../../common/components/MainLayout";
import {
    CreateCommentFormValues,
    CreatePostFormValues,
    EditCommentFormValues,
    EditPostFormValues,
    IComment,
    IPost,
    IReactionListItem,
    TReaction,
} from "../../../common/services/commonTypes";
import CreatePost from "../../../common/components/CreatePost";
import { FormikHelpers } from "formik";
import ReactionListModal from "../../../common/components/ReactionListModal";
import DeletePostAlertDialog from "../../../common/components/DeletePostAlertDialog";
import DeleteCommentAlertDialog from "../../../common/components/DeleteCommentAlertDialog";
import PostList from "../../../common/components/PostList";

export type TProps = {
    posts: IPost[];
    onCreatePostSubmit: (values: CreatePostFormValues, actions: FormikHelpers<CreatePostFormValues>) => void;
    onPostDeleteClick: (post: IPost) => void;
    onPostReactionCountButtonClick: (post: IPost) => void;
    onUserProfileClick: (userId: string) => void;
    onCommentDeleteButtonClick: (comment: IComment) => void;
    onCommentReactionCountButtonClick: (comment: IComment) => void;
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
    deletePostAlertDialogConfirmButtonLoading: boolean;
    deleteCommentAlertDialogVisible: boolean;
    onDeleteCommentAlertDialogClose: () => void;
    onDeleteCommentAlertDialogConfirmButtonClick: () => void;
    deleteCommentAlertDialogConfirmButtonLoading: boolean;
    postsLoading: boolean;
    loadMorePostsButtonVisible: boolean;
    onLoadMorePostsButtonClick: () => void;
    onTogglePostReaction: (post: IPost, reaction: TReaction) => Promise<void>;
    onEditPostSubmit: (
        post: IPost,
        values: EditPostFormValues,
        actions: FormikHelpers<EditPostFormValues>
    ) => Promise<void>;
    onLoadCommentsForPost: (post: IPost) => Promise<void>;
    onLoadMoreCommentsForPost: (post: IPost) => Promise<void>;
    onCreateCommentForPostSubmit: (
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
    deletePostAlertDialogConfirmButtonLoading,
    deleteCommentAlertDialogVisible,
    onDeleteCommentAlertDialogClose,
    onDeleteCommentAlertDialogConfirmButtonClick,
    deleteCommentAlertDialogConfirmButtonLoading,
    postsLoading,
    loadMorePostsButtonVisible,
    onLoadMorePostsButtonClick,
    onTogglePostReaction,
    onEditPostSubmit,
    onLoadCommentsForPost,
    onLoadMoreCommentsForPost,
    onCreateCommentForPostSubmit,
    onToggleCommentReaction,
    onEditCommentSubmit,
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
                        onTogglePostReaction={onTogglePostReaction}
                        onEditPostSubmit={onEditPostSubmit}
                        onLoadCommentsForPost={onLoadCommentsForPost}
                        onLoadMoreCommentsForPost={onLoadMoreCommentsForPost}
                        onCreateCommentForPostSubmit={onCreateCommentForPostSubmit}
                        onToggleCommentReaction={onToggleCommentReaction}
                        onEditCommentSubmit={onEditCommentSubmit}
                        showAddressee
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
                confirmButtonLoading={deletePostAlertDialogConfirmButtonLoading}
            />
            <DeleteCommentAlertDialog
                visible={deleteCommentAlertDialogVisible}
                onClose={onDeleteCommentAlertDialogClose}
                onConfirmButtonClick={onDeleteCommentAlertDialogConfirmButtonClick}
                confirmButtonLoading={deleteCommentAlertDialogConfirmButtonLoading}
            />
        </MainLayoutComponent>
    );
};

export default HomeFeedScreenComponent;
