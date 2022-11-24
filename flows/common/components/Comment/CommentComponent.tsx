import { Button, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, useColorMode } from "@chakra-ui/react";
import React from "react";
import UserNameAvatar from "../UserNameAvatar";
import { FiMoreVertical } from "react-icons/fi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { getUnicodeStringByReaction } from "../../services/commonUtils";
import { EditCommentFormValues, IReactionCount, TReaction } from "../../services/commonTypes";
import ReactionPopover from "../ReactionPopover";
import EditComment from "../EditComment";
import { FormikHelpers } from "formik/dist/types";

type TProps = {
    authorName: string;
    content: string;
    createdTimeString: string;
    editable: boolean;
    deletable: boolean;
    reactionCount: IReactionCount;
    reactionCountSum: number;
    activeReaction?: TReaction;
    reactionPopoverVisible: boolean;
    onReactionButtonClick: () => void;
    onReactionPopoverToggleButtonClick: (reaction: TReaction) => void;
    onReactionPopoverClose: () => void;
    onAuthorProfileClick: () => void;
    onEditButtonClick: () => void;
    onDeleteButtonClick: () => void;
    onReactionCountButtonClick: () => void;
    editing: boolean;
    onEditCommentSubmit: (values: EditCommentFormValues, actions: FormikHelpers<EditCommentFormValues>) => void;
    onEditCommentCancelButtonClick: () => void;
};

const CommentComponent = ({
    authorName,
    content,
    createdTimeString,
    editable,
    deletable,
    reactionCount,
    reactionCountSum,
    activeReaction,
    reactionPopoverVisible,
    onReactionButtonClick,
    onReactionPopoverToggleButtonClick,
    onReactionPopoverClose,
    onAuthorProfileClick,
    onEditButtonClick,
    onDeleteButtonClick,
    onReactionCountButtonClick,
    editing,
    onEditCommentSubmit,
    onEditCommentCancelButtonClick,
}: TProps) => {
    const { colorMode } = useColorMode();

    return (
        <>
            {!editing && (
                <div className="flex w-full items-start space-x-5">
                    <UserNameAvatar
                        onClick={onAuthorProfileClick}
                        userName={authorName}
                        clickable
                        className="!h-10 !w-10 lg:!h-12 lg:!w-12 [&>div]:!text-base lg:[&>div]:!text-xl"
                    />
                    <div className="w-full">
                        <div
                            className={
                                `relative z-[1] w-full rounded-md p-2 drop-shadow-md before:absolute before:right-full ` +
                                `before:top-2.5 before:h-0 before:w-0 before:border-r-[18px] before:border-t-[8px] before:border-b-[8px] ` +
                                `before:border-b-transparent before:border-t-transparent before:content-[''] lg:before:top-4 ${
                                    colorMode === "dark"
                                        ? "bg-gray-500 before:border-r-gray-500"
                                        : "bg-brand-100 before:border-r-brand-100"
                                }`
                            }
                        >
                            <div className="mb-1 flex items-center justify-between">
                                <Button
                                    onClick={onAuthorProfileClick}
                                    className="!ml-1 !h-min !whitespace-normal !p-1.5"
                                    variant="ghost"
                                    colorScheme="brand"
                                >
                                    {authorName}
                                </Button>
                                {(editable || deletable) && (
                                    <Menu>
                                        <MenuButton
                                            as={IconButton}
                                            icon={<Icon as={FiMoreVertical} />}
                                            aria-label={"Actions"}
                                            variant="ghost"
                                            colorScheme="brand"
                                        />
                                        <MenuList>
                                            {editable && (
                                                <MenuItem
                                                    onClick={onEditButtonClick}
                                                    icon={<Icon as={FiEdit} />}
                                                    className={
                                                        colorMode === "dark" ? "!text-yellow-200" : "!text-yellow-500"
                                                    }
                                                >
                                                    Módosítás
                                                </MenuItem>
                                            )}
                                            {deletable && (
                                                <MenuItem
                                                    onClick={onDeleteButtonClick}
                                                    icon={<Icon as={FiTrash2} />}
                                                    className={colorMode === "dark" ? "!text-red-200" : "!text-red-500"}
                                                >
                                                    Törlés
                                                </MenuItem>
                                            )}
                                        </MenuList>
                                    </Menu>
                                )}
                            </div>
                            <p className="whitespace-pre-line p-1 text-justify">{content}</p>
                            {reactionCountSum > 0 && (
                                <Button
                                    onClick={onReactionCountButtonClick}
                                    colorScheme="brand"
                                    className="!absolute -bottom-3.5 right-2 flex !h-min cursor-pointer select-none items-center space-x-1 !rounded-full !px-2 !py-1 drop-shadow-md"
                                >
                                    <div className="flex flex-row-reverse items-center -space-x-1 space-x-reverse">
                                        {reactionCount.angryCount > 0 && (
                                            <span>{getUnicodeStringByReaction("ANGRY")}</span>
                                        )}
                                        {reactionCount.funnyCount > 0 && (
                                            <span>{getUnicodeStringByReaction("FUNNY")}</span>
                                        )}
                                        {reactionCount.heartCount > 0 && (
                                            <span>{getUnicodeStringByReaction("HEART")}</span>
                                        )}
                                        {reactionCount.likeCount > 0 && (
                                            <span>{getUnicodeStringByReaction("LIKE")}</span>
                                        )}
                                    </div>
                                    <span className="text-xs">{reactionCountSum}</span>
                                </Button>
                            )}
                        </div>
                        <div className="mt-5 flex w-full items-center space-x-2 px-2 sm:mt-2">
                            <ReactionPopover
                                visible={reactionPopoverVisible}
                                trigger={
                                    <Button
                                        onClick={onReactionButtonClick}
                                        leftIcon={<Icon as={activeReaction ? AiFillLike : AiOutlineLike} />}
                                        colorScheme="brand"
                                        variant="ghost"
                                        size="sm"
                                        className="!h-min !p-1"
                                    >
                                        Reakció
                                    </Button>
                                }
                                onClose={onReactionPopoverClose}
                                activeReaction={activeReaction}
                                onReactionToggleButtonClick={onReactionPopoverToggleButtonClick}
                                size="sm"
                            />
                            <span className="text-xs">{createdTimeString}</span>
                        </div>
                    </div>
                </div>
            )}
            {editing && (
                <EditComment
                    onSubmit={onEditCommentSubmit}
                    initialValues={{
                        content: content,
                    }}
                    onCancelButtonClick={onEditCommentCancelButtonClick}
                />
            )}
        </>
    );
};

export default CommentComponent;
