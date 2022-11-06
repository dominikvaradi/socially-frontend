import React from "react";
import { Button } from "@chakra-ui/react";
import { IPost } from "../services/commonTypes";
import Post from "./Post";
import ColorModeSpinner from "./ColorModeSpinner";

type TProps = {
    posts: IPost[];
    onPostEditButtonClick: (postId: string) => void;
    onPostDeleteButtonClick: (postId: string) => void;
    onPostReactionCountButtonClick: (postId: string) => void;
    onCommentEditButtonClick: (commentId: string) => void;
    onCommentDeleteButtonClick: (commentId: string) => void;
    onCommentReactionCountButtonClick: (commentId: string) => void;
    postsLoading: boolean;
    loadMorePostsButtonVisible: boolean;
    onLoadMorePostsButtonClick: () => void;
};

const PostList = ({
    posts,
    onPostEditButtonClick,
    onPostDeleteButtonClick,
    onPostReactionCountButtonClick,
    onCommentEditButtonClick,
    onCommentDeleteButtonClick,
    onCommentReactionCountButtonClick,
    postsLoading,
    loadMorePostsButtonVisible,
    onLoadMorePostsButtonClick,
}: TProps) => {
    return (
        <div className="my-10 flex w-full flex-col space-y-10">
            {posts.map((post) => (
                <Post
                    key={post.id}
                    post={post}
                    editable={true}
                    deletable={true}
                    onEditButtonClick={onPostEditButtonClick}
                    onDeleteButtonClick={onPostDeleteButtonClick}
                    onReactionCountButtonClick={onPostReactionCountButtonClick}
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
    );
};

export default PostList;
