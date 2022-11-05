import React, { useEffect, useRef, useState } from "react";
import PostComponent from "./PostComponent";
import { TReaction, IReactionCount, IComment, CreateCommentFormValues } from "../../services/commonTypes";
import { FormikHelpers } from "formik";

type TProps = {
    header?: string;
    content: string;
    authorName: string;
    commentCount: number;
    createdTimeString: string;
    editable: boolean;
    deletable: boolean;
    onEditClick: () => void;
    onDeleteClick: () => void;
    reactionCount: IReactionCount;
    activeReaction?: TReaction;
    onReactionCountButtonClick: () => void;
    onToggleReactionButtonClick: (reaction: TReaction) => void;
    onAuthorProfileClick: () => void;
    onCommentToggleReactionButtonClick: (commentId: string, reaction: TReaction) => void;
    onCreateCommentSubmit: (values: CreateCommentFormValues, actions: FormikHelpers<CreateCommentFormValues>) => void;
    onCommentAuthorProfileClick: (authorId: string) => void;
    onCommentEditButtonClick: (commentId: string) => void;
    onCommentDeleteButtonClick: (commentId: string) => void;
    onCommentReactionCountButtonClick: (commentId: string) => void;
};

const PostContainer = ({
    header,
    content,
    authorName,
    commentCount,
    createdTimeString,
    editable,
    deletable,
    onEditClick,
    onDeleteClick,
    reactionCount,
    activeReaction,
    onReactionCountButtonClick,
    onToggleReactionButtonClick,
    onAuthorProfileClick,
    onCommentToggleReactionButtonClick,
    onCreateCommentSubmit,
    onCommentAuthorProfileClick,
    onCommentEditButtonClick,
    onCommentDeleteButtonClick,
    onCommentReactionCountButtonClick,
}: TProps) => {
    const contentRef = useRef<HTMLParagraphElement>(null);
    const [contentExpanded, setContentExpanded] = useState<boolean>(false);
    const [contentNeedExpand, setContentNeedExpand] = useState<boolean>(false);
    const [reactionPopoverVisible, setReactionPopoverVisible] = useState<boolean>(false);
    const [commentsVisible, setCommentsVisible] = useState<boolean>(false);
    const createCommentInputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        setContentNeedExpand(contentRef.current ? contentRef.current.scrollHeight > 200 : false);
    }, [contentRef, setContentNeedExpand]);

    const reactionCountSum: number = Object.values(reactionCount).reduce(
        (acc: number, count: number) => acc + count,
        0
    );

    const handleContentExpandClick = () => {
        setContentExpanded((currentlyExpanded) => !currentlyExpanded);
    };

    const handleCommentButtonClick = () => {
        setCommentsVisible((visible) => !visible);

        setTimeout(() => {
            createCommentInputRef.current?.focus();
        }, 50);
    };

    const handleCommentCountButtonClick = () => {
        setCommentsVisible((visible) => !visible);
    };

    const handleReactionPopoverToggleButtonClick = (reaction: TReaction) => {
        setReactionPopoverVisible(false);
        onToggleReactionButtonClick(reaction);
    };

    const handleReactionButtonClick = () => {
        setReactionPopoverVisible((visible) => !visible);
    };

    const handleReactionPopoverClose = () => {
        setReactionPopoverVisible(false);
    };

    const handleLoadMoreCommentsButtonClick = () => {
        console.log("handleLoadMoreCommentsButtonClick");
    };

    return (
        <PostComponent
            header={header}
            content={content}
            authorName={authorName}
            commentCount={commentCount}
            createdTimeString={createdTimeString}
            editable={editable}
            deletable={deletable}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            reactionCount={reactionCount}
            reactionCountSum={reactionCountSum}
            contentRef={contentRef}
            contentNeedExpand={contentNeedExpand}
            contentExpanded={contentExpanded}
            onContentExpandClick={handleContentExpandClick}
            onCommentButtonClick={handleCommentButtonClick}
            onAuthorProfileClick={onAuthorProfileClick}
            onReactionCountButtonClick={onReactionCountButtonClick}
            onCommentCountButtonClick={handleCommentCountButtonClick}
            activeReaction={activeReaction}
            reactionPopoverVisible={reactionPopoverVisible}
            onReactionButtonClick={handleReactionButtonClick}
            onReactionPopoverToggleButtonClick={handleReactionPopoverToggleButtonClick}
            onReactionPopoverClose={handleReactionPopoverClose}
            comments={mockComments}
            commentsVisible={commentsVisible}
            createCommentInputRef={createCommentInputRef}
            onCommentToggleReactionButtonClick={onCommentToggleReactionButtonClick}
            onCreateCommentSubmit={onCreateCommentSubmit}
            onCommentAuthorProfileClick={onCommentAuthorProfileClick}
            onCommentEditButtonClick={onCommentEditButtonClick}
            onCommentDeleteButtonClick={onCommentDeleteButtonClick}
            onCommentReactionCountButtonClick={onCommentReactionCountButtonClick}
            commentsLoading={false}
            loadMoreCommentsButtonVisible={true}
            onLoadMoreCommentsButtonClick={handleLoadMoreCommentsButtonClick}
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
