import React from "react";
import MainLayoutComponent from "../../../common/components/MainLayout";
import PostComponent from "../../../common/components/Post";
import {
    CreateCommentFormValues,
    CreatePostFormValues,
    IPost,
    IReactionListItem,
    TReaction,
} from "../../../common/services/commonTypes";
import CreatePostComponent from "../../../common/components/CreatePost";
import { FormikHelpers } from "formik";
import ReactionListModal from "../../../common/components/ReactionListModal";
import DeletePostAlertDialog from "../../../common/components/DeletePostAlertDialog";
import DeleteCommentAlertDialog from "../../../common/components/DeleteCommentAlertDialog";
import ColorModeSpinner from "../../../common/components/ColorModeSpinner";
import { Button } from "@chakra-ui/react";

export type TProps = {
    posts: IPost[];
    onCreatePostSubmit: (values: CreatePostFormValues, actions: FormikHelpers<CreatePostFormValues>) => void;
    onPostEditClick: (postId: string) => void;
    onPostDeleteClick: (postId: string) => void;
    onPostReactionCountButtonClick: (postId: string) => void;
    onPostToggleReactionButtonClick: (postId: string, reaction: TReaction) => void;
    onUserProfileClick: (userId: string) => void;
    onCommentToggleReactionButtonClick: (commentId: string, reaction: TReaction) => void;
    onCreateCommentSubmit: (
        postId: string,
        values: CreateCommentFormValues,
        actions: FormikHelpers<CreateCommentFormValues>
    ) => void;
    onCommentEditButtonClick: (commentId: string) => void;
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
    onPostEditClick,
    onPostDeleteClick,
    onPostReactionCountButtonClick,
    onPostToggleReactionButtonClick,
    onUserProfileClick,
    onCommentToggleReactionButtonClick,
    onCreateCommentSubmit,
    onCommentEditButtonClick,
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
            <div className={`flex w-full justify-center px-8 sm:px-0 sm:pl-16 md:pl-0 `}>
                <div className="flex w-full flex-col items-center sm:w-3/4 md:w-1/2 xl:w-[40%]">
                    <CreatePostComponent
                        placeholder="Mi jár a fejedben, Naruto?"
                        onSubmit={onCreatePostSubmit}
                        className="mt-4"
                    />

                    <div className="my-10 flex w-full flex-col space-y-10">
                        {posts.map((p) => (
                            <PostComponent
                                key={p.id}
                                header={p.header}
                                content={p.content}
                                authorName={p.authorName}
                                commentCount={p.commentCount}
                                createdTimeString={p.createdTimeString}
                                editable={true}
                                deletable={true}
                                onEditClick={() => onPostEditClick(p.id)}
                                onDeleteClick={() => onPostDeleteClick(p.id)}
                                reactionCount={p.reactionCount}
                                activeReaction={p.activeReactionOfUser}
                                onReactionCountButtonClick={() => onPostReactionCountButtonClick(p.id)}
                                onToggleReactionButtonClick={(reaction) =>
                                    onPostToggleReactionButtonClick(p.id, reaction)
                                }
                                onAuthorProfileClick={() => onUserProfileClick(p.authorId)}
                                onCommentToggleReactionButtonClick={onCommentToggleReactionButtonClick}
                                onCreateCommentSubmit={(values, actions) =>
                                    onCreateCommentSubmit(p.id, values, actions)
                                }
                                onCommentAuthorProfileClick={onUserProfileClick}
                                onCommentEditButtonClick={onCommentEditButtonClick}
                                onCommentDeleteButtonClick={onCommentDeleteButtonClick}
                                onCommentReactionCountButtonClick={onCommentReactionCountButtonClick}
                            />
                        ))}
                        {posts.length === 0 && postsLoading && (
                            <div className="flex justify-center">
                                <ColorModeSpinner size="xl" />
                            </div>
                        )}
                        {posts.length === 0 && !postsLoading && (
                            <p className="text-center">Nincsen egyetlen megjeleníthető poszt sem.</p>
                        )}
                        {posts.length > 0 && loadMorePostsButtonVisible && (
                            <div className="flex justify-center">
                                <Button
                                    colorScheme="brand"
                                    variant="ghost"
                                    onClick={onLoadMorePostsButtonClick}
                                    isLoading={postsLoading}
                                    spinner={<ColorModeSpinner size="lg" />}
                                >
                                    Több poszt betöltése
                                </Button>
                            </div>
                        )}
                    </div>
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
