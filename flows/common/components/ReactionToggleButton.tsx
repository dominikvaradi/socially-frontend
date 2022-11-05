import React from "react";
import { getUnicodeStringByReaction } from "../services/commonUtils";
import { TReaction } from "../services/commonTypes";
import { useColorMode } from "@chakra-ui/react";

type TProps = {
    reaction: TReaction;
    activeReaction?: TReaction;
    onClick: (reaction: TReaction) => void;
    size?: "sm";
};

const ReactionToggleButton = ({ reaction, activeReaction, onClick, size }: TProps) => {
    const { colorMode } = useColorMode();

    const reactionHoverStyle = `lg:hover:bg-brand-100 ${colorMode === "dark" ? "lg:hover:text-black" : ""}`;
    const reactionActiveStyle = `active:bg-brand-300 lg:hover:bg-brand-100 lg:hover:active:bg-brand-300 ${
        colorMode === "dark" ? "active:text-black" : ""
    }`;

    return (
        <div
            onClick={() => onClick(reaction)}
            className={`flex cursor-pointer items-center justify-center rounded-full ${reactionHoverStyle} ${reactionActiveStyle} ${
                activeReaction === reaction ? "bg-brand-500" : ""
            } ${size === "sm" ? "h-8 w-8" : "h-10 w-10"}`}
        >
            <span className="">{getUnicodeStringByReaction(reaction)}</span>
        </div>
    );
};

export default ReactionToggleButton;
