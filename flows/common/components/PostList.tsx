import React from "react";
import { Button } from "@chakra-ui/react";
import { EditPostFormValues, IPost, TReaction } from "../services/commonTypes";
import Post from "./Post";
import ColorModeSpinner from "./ColorModeSpinner";
import { FormikHelpers } from "formik/dist/types";

type TProps = {
    posts: IPost[];
    onPostDeleteButtonClick: (postId: string) => void;
    onPostReactionCountButtonClick: (postId: string) => void;
    onCommentDeleteButtonClick: (commentId: string) => void;
    onCommentReactionCountButtonClick: (commentId: string) => void;
    postsLoading: boolean;
    loadMorePostsButtonVisible: boolean;
    onLoadMorePostsButtonClick: () => void;
    onTogglePostReaction: (postId: string, reaction: TReaction) => Promise<void>;
    onEditPostSubmit: (postId: string, values: EditPostFormValues, actions: FormikHelpers<EditPostFormValues>) => void;
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
