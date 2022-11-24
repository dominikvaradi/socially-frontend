import React from "react";
import { Button } from "@chakra-ui/react";
import {
    CreateCommentFormValues,
    EditCommentFormValues,
    EditPostFormValues,
    IComment,
    IPost,
    TReaction,
} from "../services/commonTypes";
import Post from "./Post";
import ColorModeSpinner from "./ColorModeSpinner";
import { FormikHelpers } from "formik/dist/types";

type TProps = {
    posts: IPost[];
    onPostDeleteButtonClick: (post: IPost) => void;
    onPostReactionCountButtonClick: (post: IPost) => void;
    onCommentDeleteButtonClick: (comment: IComment) => void;
    onCommentReactionCountButtonClick: (comment: IComment) => void;
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

const PostList = ({
    posts,
    onPostDeleteButtonClick,
    onPostReactionCountButtonClick,
    onCommentDeleteButtonClick,
    onCommentReactionCountButtonClick,
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
        <div className="my-10 flex w-full flex-col space-y-10">
            {posts.map((post) => (
                <Post
                    key={post.id}
                    post={post}
                    onDeleteButtonClick={onPostDeleteButtonClick}
                    onReactionCountButtonClick={onPostReactionCountButtonClick}
                    onCommentDeleteButtonClick={onCommentDeleteButtonClick}
                    onCommentReactionCountButtonClick={onCommentReactionCountButtonClick}
                    onTogglePostReaction={onTogglePostReaction}
                    onEditPostSubmit={onEditPostSubmit}
                    onLoadComments={onLoadCommentsForPost}
                    onLoadMoreComments={onLoadMoreCommentsForPost}
                    onCreateCommentSubmit={onCreateCommentForPostSubmit}
                    onToggleCommentReaction={onToggleCommentReaction}
                    onEditCommentSubmit={onEditCommentSubmit}
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
    );
};

export default PostList;
