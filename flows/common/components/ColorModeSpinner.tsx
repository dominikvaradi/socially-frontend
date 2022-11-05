import { Spinner, useColorMode } from "@chakra-ui/react";
import React from "react";

type TProps = {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const ColorModeSpinner = ({ size }: TProps) => {
    const { colorMode } = useColorMode();

    return (
        <Spinner
            size={size}
            thickness="4px"
            emptyColor={colorMode === "dark" ? "gray.500" : "gray.300"}
            color={colorMode === "dark" ? "brand.200" : "brand.500"}
        />
    );
};

export default ColorModeSpinner;
