import React, { useEffect, useRef, useState } from "react";
import PostComponent from "./PostComponent";
import { TReaction, IComment, CreateCommentFormValues, IPost, EditPostFormValues } from "../../services/commonTypes";
import { FormikHelpers } from "formik";

type TProps = {
    post: IPost;
    editable: boolean;
    deletable: boolean;
    onDeleteButtonClick: (postId: string) => void;
    onReactionCountButtonClick: (postId: string) => void;
    onCommentEditButtonClick: (commentId: string) => void;
    onCommentDeleteButtonClick: (commentId: string) => void;
    onCommentReactionCountButtonClick: (commentId: string) => void;
};

const PostContainer = ({
    post,
    editable,
    deletable,
    onDeleteButtonClick,
    onReactionCountButtonClick,
    onCommentEditButtonClick,
    onCommentDeleteButtonClick,
    onCommentReactionCountButtonClick,
}: TProps) => {
    const contentRef = useRef<HTMLParagraphElement>(null);
    const createCommentInputRef = useRef<HTMLTextAreaElement>(null);
    const [contentExpanded, setContentExpanded] = useState<boolean>(false);
    const [contentNeedExpand, setContentNeedExpand] = useState<boolean>(false);
    const [reactionPopoverVisible, setReactionPopoverVisible] = useState<boolean>(false);
    const [commentsVisible, setCommentsVisible] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    useEffect(() => {
        if (!contentRef.current) return;

        setContentNeedExpand(contentRef.current ? contentRef.current.scrollHeight > 200 : false);
    }, [contentRef, setContentNeedExpand]);

    const reactionCountSum: number = Object.values(post.reactionCount).reduce(
        (acc: number, count: number) => acc + count,
        0
    );

    const handleEditClick = () => {
        setEditing((value) => !value);
    };

    const handleDeleteClick = () => {
        onDeleteButtonClick(post.id);
    };

    const handleContentExpandClick = () => {
        setContentExpanded((currentlyExpanded) => !currentlyExpanded);
    };

    const handleCommentButtonClick = () => {
        setCommentsVisible((visible) => !visible);

        setTimeout(() => {
            createCommentInputRef.current?.focus();
        }, 50);
    };

    const handleAuthorProfileClick = () => {};

    const handleReactionCountButtonClick = () => {
        onReactionCountButtonClick(post.id);
    };

    const handleCommentCountButtonClick = () => {
        setCommentsVisible((visible) => !visible);
    };

    const handleReactionPopoverToggleButtonClick = (reaction: TReaction) => {
        setReactionPopoverVisible(false);
        console.log("handleReactionPopoverToggleButtonClick: " + reaction);
    };

    const handleReactionButtonClick = () => {
        setReactionPopoverVisible((visible) => !visible);
    };

    const handleReactionPopoverClose = () => {
        setReactionPopoverVisible(false);
    };

    const handleCommentToggleReactionButtonClick = (commentId: string, reaction: TReaction) => {
        console.log(`handleCommentToggleReactionButtonClick:\ncommentId: ${commentId}\nreaction: ${reaction}`);
    };

    const handleCreateCommentSubmit = (
        values: CreateCommentFormValues,
        actions: FormikHelpers<CreateCommentFormValues>
    ) => {
        setTimeout(() => {
            console.log(`handleCreateCommentSubmit:\nvalues: ${JSON.stringify(values, null, 2)}`);
            actions.resetForm();
        }, 1000);
    };

    const handleCommentAuthorProfileClick = (authorId: string) => {
        console.log("handleCommentAuthorProfileClick: " + authorId);
    };

    const handleLoadMoreCommentsButtonClick = () => {
        console.log("handleLoadMoreCommentsButtonClick");
    };

    const handleEditPostSubmit = (values: EditPostFormValues, actions: FormikHelpers<EditPostFormValues>) => {
        setTimeout(() => {
            console.log(`handleEditPostSubmit:\nvalues: ${JSON.stringify(values, null, 2)}`);
            setEditing(false);
            actions.resetForm();
        }, 1000);
    };

    const handleEditPostCancelButtonClick = () => {
        setEditing(false);
    };

    return (
        <PostComponent
            header={post.header}
            content={post.content}
            authorName={post.authorName}
            commentCount={post.commentCount}
            createdTimeString={post.createdTimeString}
            editable={editable}
            deletable={deletable}
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
            comments={mockComments}
            commentsVisible={commentsVisible}
            createCommentInputRef={createCommentInputRef}
            onCommentToggleReactionButtonClick={handleCommentToggleReactionButtonClick}
            onCreateCommentSubmit={handleCreateCommentSubmit}
            onCommentAuthorProfileClick={handleCommentAuthorProfileClick}
            onCommentEditButtonClick={onCommentEditButtonClick}
            onCommentDeleteButtonClick={onCommentDeleteButtonClick}
            onCommentReactionCountButtonClick={onCommentReactionCountButtonClick}
            commentsLoading={false}
            loadMoreCommentsButtonVisible={true}
            onLoadMoreCommentsButtonClick={handleLoadMoreCommentsButtonClick}
            editing={editing}
            onEditPostSubmit={handleEditPostSubmit}
            onEditPostCancelButtonClick={handleEditPostCancelButtonClick}
        />
    );
};

export default PostContainer;

const mockComments: IComment[] = [
    {
        id: "0",
        content: "Lorem Ipsum",
        authorId: "0",
        authorName: "Naruto Uzumaki",
        createdTimeString: "2 perce",
        reactionCount: {
            likeCount: 1,
            heartCount: 1,
            funnyCount: 0,
            angryCount: 0,
        },
    },
    {
        id: "1",
        content: "Lorem Ipsum2",
        authorId: "1",
        authorName: "Teszt Elek",
        createdTimeString: "5 perce",
        reactionCount: {
            likeCount: 0,
            heartCount: 0,
            funnyCount: 0,
            angryCount: 0,
        },
    },
    {
        id: "2",
        content: "Lorem Ipsum2",
        authorId: "2",
        authorName: "Sasuke Uchiha",
        createdTimeString: "1 órája",
        reactionCount: {
            likeCount: 4,
            heartCount: 2,
            funnyCount: 1,
            angryCount: 0,
        },
    },
    {
        id: "3",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, randomusz ig sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum asde.",
        authorId: "3",
        authorName: "Hinata Hyuga",
        createdTimeString: "2 órája",
        reactionCount: {
            likeCount: 0,
            heartCount: 0,
            funnyCount: 0,
            angryCount: 1,
        },
    },
];
