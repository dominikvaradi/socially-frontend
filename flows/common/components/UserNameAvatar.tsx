import React from "react";
import { Avatar, useColorMode } from "@chakra-ui/react";
import { AvatarProps } from "@chakra-ui/avatar";

type TProps = {
    className?: string;
    userName: string;
    clickable?: boolean;
} & AvatarProps;

const UserNameAvatar = ({ className, userName, clickable, ...props }: TProps) => {
    const { colorMode } = useColorMode();

    const background =
        colorMode === "dark" ? "!from-gray-400 !to-blue-700 !text-white" : "!from-gray-200 !to-cyan-300 !text-gray-900";
    const backgroundHover =
        colorMode === "dark"
            ? "lg:hover:!from-gray-500 lg:hover:!to-blue-700"
            : "lg:hover:!from-gray-300 lg:hover:!to-cyan-400";
    const backgroundActive =
        colorMode === "dark"
            ? "active:!from-gray-600 lg:hover:active:!from-gray-600 active:!to-blue-700 lg:hover:active:!to-blue-700"
            : "active:!from-gray-400 lg:hover:active:!from-gray-400 active:!to-cyan-500 lg:hover:active:!to-cyan-500";

    return (
        <Avatar
            name={userName}
            className={`!bg-gradient-to-br ${background} ${
                clickable ? `${backgroundHover} ${backgroundActive} cursor-pointer select-none` : ""
            } ${className || ""}`}
            {...props}
        />
    );
};

export default UserNameAvatar;
