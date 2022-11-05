import React from "react";
import { Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { TReaction } from "../services/commonTypes";
import ReactionToggleButton from "./ReactionToggleButton";

type TProps = {
    visible: boolean;
    trigger: React.ReactNode;
    activeReaction?: TReaction;
    onReactionToggleButtonClick: (reaction: TReaction) => void;
    onClose: () => void;
    size?: "sm";
};

const MyComponent = ({ visible, trigger, activeReaction, onReactionToggleButtonClick, onClose, size }: TProps) => {
    return (
        <Popover placement="top" isOpen={visible} onClose={onClose} returnFocusOnClose={false}>
            <PopoverTrigger>{trigger}</PopoverTrigger>
            <PopoverContent className="!w-min !border-[var(--chakra-colors-chakra-border-color)]">
                <PopoverArrow className="!border-[var(--chakra-colors-chakra-border-color)]" />
                <PopoverBody className="w-min">
                    <div className={`flex select-none ${size === "sm" ? "space-x-1" : "space-x-2 text-3xl"}`}>
                        <ReactionToggleButton
                            reaction={"LIKE"}
                            activeReaction={activeReaction}
                            onClick={onReactionToggleButtonClick}
                            size={size}
                        />
                        <ReactionToggleButton
                            reaction={"HEART"}
                            activeReaction={activeReaction}
                            onClick={onReactionToggleButtonClick}
                            size={size}
                        />
                        <ReactionToggleButton
                            reaction={"FUNNY"}
                            activeReaction={activeReaction}
                            onClick={onReactionToggleButtonClick}
                            size={size}
                        />
                        <ReactionToggleButton
                            reaction={"ANGRY"}
                            activeReaction={activeReaction}
                            onClick={onReactionToggleButtonClick}
                            size={size}
                        />
                    </div>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default MyComponent;
