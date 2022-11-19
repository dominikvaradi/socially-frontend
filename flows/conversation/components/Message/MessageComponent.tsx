import { Button, Icon, IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import UserNameAvatar from "../../../common/components/UserNameAvatar";
import { IReactionCount, TReaction } from "../../../common/services/commonTypes";
import { getUnicodeStringByReaction } from "../../../common/services/commonUtils";
import { MdOutlineAddReaction, MdAddReaction } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import ReactionPopover from "../../../common/components/ReactionPopover";

type TProps = {
    userName: string;
    content: string;
    writtenBySelf: boolean;
    showUserName: boolean;
    reactionCount: IReactionCount;
    reactionCountSum: number;
    createdTimeString: string;
    onReactionCountButtonClick: () => void;
    onReactionButtonClick: () => void;
    activeReaction?: TReaction;
    reactionPopoverVisible: boolean;
    onReactionPopoverClose: () => void;
    onReactionPopoverToggleButtonClick: (reaction: TReaction) => void;
    onDeleteButtonClick: () => void;
};

const MessageComponent = ({
    userName,
    content,
    writtenBySelf,
    showUserName,
    reactionCount,
    reactionCountSum,
    createdTimeString,
    onReactionCountButtonClick,
    onReactionButtonClick,
    activeReaction,
    reactionPopoverVisible,
    onReactionPopoverClose,
    onReactionPopoverToggleButtonClick,
    onDeleteButtonClick,
}: TProps) => {
    const { colorMode } = useColorMode();

    return (
        <div className={`flex ${writtenBySelf ? "justify-end" : ""}`}>
            <div
                className={`flex gap-2 ${
                    writtenBySelf ? "flex-row-reverse" : ""
                } max-w-[85%] sm:max-w-[80%] md:max-w-[70%]`}
            >
                {!writtenBySelf && <UserNameAvatar userName={userName} className="select-none" />}
                <div className={`relative flex min-w-[120px] items-center ${writtenBySelf ? "justify-end" : ""}`}>
                    {showUserName && !writtenBySelf && (
                        <span className="absolute -top-4 left-4 max-w-[80%] truncate text-xs">{userName}</span>
                    )}
                    {writtenBySelf && (
                        <IconButton
                            onClick={onDeleteButtonClick}
                            colorScheme="red"
                            aria-label="Delete message"
                            className="!absolute -top-4 -right-1 !rounded-full !text-base drop-shadow-md"
                            size="xs"
                            icon={<Icon as={FiTrash2} />}
                        />
                    )}
                    <p
                        className={`rounded-3xl p-4 text-justify leading-tight ${
                            colorMode === "dark" ? "bg-gray-500" : "bg-brand-100"
                        }`}
                    >
                        {content}
                    </p>
                    <div
                        className={`absolute -bottom-4 flex items-center gap-1 ${
                            writtenBySelf ? "right-4" : "left-4 flex-row-reverse"
                        }`}
                    >
                        <span className="mt-[auto] !w-max px-2 text-xs">{createdTimeString}</span>
                        {reactionCountSum > 0 && (
                            <Button
                                onClick={onReactionCountButtonClick}
                                colorScheme="brand"
                                className={`!flex !h-min cursor-pointer select-none items-center space-x-1 !rounded-full !py-1 !px-2 drop-shadow-md `}
                            >
                                <div className="flex flex-row-reverse items-center -space-x-1 space-x-reverse">
                                    {reactionCount.angryCount > 0 && <span>{getUnicodeStringByReaction("ANGRY")}</span>}
                                    {reactionCount.funnyCount > 0 && <span>{getUnicodeStringByReaction("FUNNY")}</span>}
                                    {reactionCount.heartCount > 0 && <span>{getUnicodeStringByReaction("HEART")}</span>}
                                    {reactionCount.likeCount > 0 && <span>{getUnicodeStringByReaction("LIKE")}</span>}
                                </div>
                                <span className="text-xs">{reactionCountSum}</span>
                            </Button>
                        )}
                        <ReactionPopover
                            visible={reactionPopoverVisible}
                            trigger={
                                <IconButton
                                    onClick={onReactionButtonClick}
                                    colorScheme="brand"
                                    aria-label="Add reaction"
                                    className="!h-7 !w-7 !rounded-full !text-base drop-shadow-md"
                                    size="xs"
                                    icon={<Icon as={activeReaction ? MdAddReaction : MdOutlineAddReaction} />}
                                />
                            }
                            onClose={onReactionPopoverClose}
                            activeReaction={activeReaction}
                            onReactionToggleButtonClick={onReactionPopoverToggleButtonClick}
                            size="sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageComponent;
