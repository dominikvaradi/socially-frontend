import { Button, Collapse, Icon, IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import {
    CreateCommentFormValues,
    EditPostFormValues,
    IComment,
    IReactionCount,
    TReaction,
} from "../../services/commonTypes";
import UserNameAvatar from "../UserNameAvatar";
import { FiEdit, FiTrash2, FiChevronDown } from "react-icons/fi";
import { SlBubbles, SlBubble } from "react-icons/sl";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import Comment from "../Comment";
import { getUnicodeStringByReaction } from "../../services/commonUtils";
import ReactionPopover from "../ReactionPopover";
import CreateComment from "../CreateComment";
import { FormikHelpers } from "formik";
import ColorModeSpinner from "../ColorModeSpinner";
import EditPost from "../EditPost";

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
    reactionCountSum: number;
    contentRef: React.RefObject<HTMLParagraphElement>;
    contentNeedExpand: boolean;
    contentExpanded: boolean;
    onContentExpandClick: () => void;
    onCommentButtonClick: () => void;
    onAuthorProfileClick: () => void;
    onReactionCountButtonClick: () => void;
    onCommentCountButtonClick: () => void;
    activeReaction?: TReaction;
    reactionPopoverVisible: boolean;
    onReactionButtonClick: () => void;
    onReactionPopoverToggleButtonClick: (reaction: TReaction) => void;
    onReactionPopoverClose: () => void;
    comments: IComment[];
    commentsVisible: boolean;
    createCommentInputRef: React.RefObject<HTMLTextAreaElement>;
    onCommentToggleReactionButtonClick: (commentId: string, reaction: TReaction) => void;
    onCreateCommentSubmit: (values: CreateCommentFormValues, actions: FormikHelpers<CreateCommentFormValues>) => void;
    onCommentAuthorProfileClick: (authorId: string) => void;
    onCommentEditButtonClick: (commentId: string) => void;
    onCommentDeleteButtonClick: (commentId: string) => void;
    onCommentReactionCountButtonClick: (commentId: string) => void;
    commentsLoading: boolean;
    loadMoreCommentsButtonVisible: boolean;
    onLoadMoreCommentsButtonClick: () => void;
    editing: boolean;
    onEditPostSubmit: (values: EditPostFormValues, actions: FormikHelpers<EditPostFormValues>) => void;
    onEditPostCancelButtonClick: () => void;
};

const PostComponent = ({
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
    reactionCountSum,
    contentRef,
    contentNeedExpand,
    contentExpanded,
    onContentExpandClick,
    onCommentButtonClick,
    onAuthorProfileClick,
    onReactionCountButtonClick,
    onCommentCountButtonClick,
    activeReaction,
    reactionPopoverVisible,
    onReactionButtonClick,
    onReactionPopoverToggleButtonClick,
    onReactionPopoverClose,
    comments,
    commentsVisible,
    createCommentInputRef,
    onCommentToggleReactionButtonClick,
    onCreateCommentSubmit,
    onCommentAuthorProfileClick,
    onCommentEditButtonClick,
    onCommentDeleteButtonClick,
    onCommentReactionCountButtonClick,
    commentsLoading,
    loadMoreCommentsButtonVisible,
    onLoadMoreCommentsButtonClick,
    editing,
    onEditPostSubmit,
    onEditPostCancelButtonClick,
}: TProps) => {
    const { colorMode } = useColorMode();

    const nameHoverStyle = `lg:hover:bg-brand-100 ${colorMode === "dark" ? "lg:hover:text-black" : ""}`;
    const nameActiveStyle = `active:bg-brand-300 lg:hover:bg-brand-100 lg:hover:active:bg-brand-300 ${
        colorMode === "dark" ? "active:text-black" : ""
    }`;

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <div className={`w-full rounded-md shadow-md ${colorMode === "dark" ? "bg-slate-600" : "bg-white"}`}>
                <div className="flex w-full items-center justify-between space-x-2 border-b p-3">
                    <div
                        onClick={onAuthorProfileClick}
                        className={`flex cursor-pointer items-center space-x-1 rounded-lg p-1 ${nameHoverStyle} ${nameActiveStyle}`}
                    >
                        <UserNameAvatar userName={authorName} className="select-none" />
                        <span className="select-none break-normal leading-none">{authorName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {editable && (
                            <IconButton
                                onClick={onEditClick}
                                aria-label="Edit post"
                                colorScheme="yellow"
                                variant="ghost"
                                icon={<Icon as={FiEdit} />}
                                className="!h-12 !w-12"
                            />
                        )}
                        {deletable && (
                            <IconButton
                                onClick={onDeleteClick}
                                aria-label="Delete post"
                                colorScheme="red"
                                variant="ghost"
                                icon={<Icon as={FiTrash2} />}
                                className="!h-12 !w-12"
                            />
                        )}
                    </div>
                </div>
                {!editing && (
                    <div className="border-b px-6 py-2 shadow-inner">
                        <p className="mb-2 text-right text-sm">{createdTimeString}</p>
                        <p className="text-lg font-semibold">{header}</p>
                        <p
                            ref={contentRef}
                            className={`max-h-[200px] overflow-hidden text-justify ${
                                contentNeedExpand ? "hidden" : "block"
                            }`}
                        >
                            {content}
                        </p>
                        {contentNeedExpand && (
                            <>
                                <Collapse in={contentExpanded} startingHeight="200px" className="text-justify">
                                    {content}
                                </Collapse>
                                <Button
                                    onClick={onContentExpandClick}
                                    leftIcon={
                                        <Icon
                                            as={FiChevronDown}
                                            className={`transition-transform duration-300 ease-in-out ${
                                                contentExpanded ? "-rotate-180" : ""
                                            }`}
                                        />
                                    }
                                    size="sm"
                                    colorScheme="brand"
                                    variant="ghost"
                                >
                                    {contentExpanded ? "Kevesebb mutatása" : "Több mutatása"}
                                </Button>
                            </>
                        )}
                        <div className="mt-3 mb-1 flex items-end justify-between">
                            <Button
                                onClick={onReactionCountButtonClick}
                                variant="ghost"
                                colorScheme="brand"
                                className="flex cursor-pointer select-none items-center space-x-1 !p-1"
                            >
                                <div className="flex flex-row-reverse items-center -space-x-2 space-x-reverse text-2xl">
                                    {reactionCount.angryCount > 0 && <span>{getUnicodeStringByReaction("ANGRY")}</span>}
                                    {reactionCount.funnyCount > 0 && <span>{getUnicodeStringByReaction("FUNNY")}</span>}
                                    {reactionCount.heartCount > 0 && <span>{getUnicodeStringByReaction("HEART")}</span>}
                                    {reactionCount.likeCount > 0 && <span>{getUnicodeStringByReaction("LIKE")}</span>}
                                </div>
                                {reactionCountSum > 0 && <span>{reactionCountSum}</span>}
                            </Button>
                            {commentCount > 0 && (
                                <Button
                                    onClick={onCommentCountButtonClick}
                                    size="sm"
                                    leftIcon={<Icon as={SlBubbles} />}
                                    colorScheme="brand"
                                    variant="ghost"
                                >
                                    {commentCount} komment
                                </Button>
                            )}
                        </div>
                    </div>
                )}
                {editing && (
                    <EditPost
                        initialValues={{
                            header: header ?? "",
                            content: content,
                        }}
                        onSubmit={onEditPostSubmit}
                        onCancelButtonClick={onEditPostCancelButtonClick}
                    />
                )}
                <div className="flex justify-evenly p-1">
                    <ReactionPopover
                        visible={reactionPopoverVisible}
                        trigger={
                            <Button
                                onClick={onReactionButtonClick}
                                leftIcon={<Icon as={activeReaction ? AiFillLike : AiOutlineLike} />}
                                colorScheme="brand"
                                variant="ghost"
                            >
                                Reakció
                            </Button>
                        }
                        activeReaction={activeReaction}
                        onReactionToggleButtonClick={onReactionPopoverToggleButtonClick}
                        onClose={onReactionPopoverClose}
                    />
                    <Button
                        onClick={onCommentButtonClick}
                        leftIcon={<Icon as={SlBubble} />}
                        colorScheme="brand"
                        variant="ghost"
                    >
                        Komment
                    </Button>
                </div>
            </div>
            {commentsVisible && (
                <div
                    className={`mt-2 flex w-full flex-col justify-center space-y-8 rounded-md p-4 shadow-md lg:w-[90%] ${
                        colorMode === "dark" ? "bg-slate-600" : "bg-white"
                    }`}
                >
                    <CreateComment inputRef={createCommentInputRef} onSubmit={onCreateCommentSubmit} />
                    {comments.map((c) => (
                        <Comment
                            key={c.id}
                            authorName={c.authorName}
                            content={c.content}
                            createdTimeString={c.createdTimeString}
                            editable={true}
                            deletable={true}
                            reactionCount={c.reactionCount}
                            activeReaction={c.activeReactionOfUser}
                            onToggleReactionButtonClick={(reaction) =>
                                onCommentToggleReactionButtonClick(c.id, reaction)
                            }
                            onAuthorProfileClick={() => onCommentAuthorProfileClick(c.authorId)}
                            onEditButtonClick={() => onCommentEditButtonClick(c.id)}
                            onDeleteButtonClick={() => onCommentDeleteButtonClick(c.id)}
                            onReactionCountButtonClick={() => onCommentReactionCountButtonClick(c.id)}
                        />
                    ))}
                    {comments.length === 0 && commentsLoading && (
                        <div className="flex justify-center">
                            <ColorModeSpinner size="lg" />
                        </div>
                    )}
                    {comments.length === 0 && !commentsLoading && (
                        <p className="text-center">Nincsen egyetlen megjeleníthető komment sem.</p>
                    )}
                    {comments.length > 0 && loadMoreCommentsButtonVisible && (
                        <div className="flex justify-center">
                            <Button
                                colorScheme="brand"
                                variant="ghost"
                                onClick={onLoadMoreCommentsButtonClick}
                                isLoading={commentsLoading}
                                spinner={<ColorModeSpinner size="lg" />}
                            >
                                Több komment betöltése
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PostComponent;
