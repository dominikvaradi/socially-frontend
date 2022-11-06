import { FormControl, FormControlProps, FormLabel, useColorMode } from "@chakra-ui/react";
import React from "react";

type TProps = {
    label: string;
    lightBgColor: string;
    darkBgColor: string;
    errorMessage?: string;
} & FormControlProps;

const FloatingLabelFormControl = ({
    className,
    label,
    lightBgColor,
    darkBgColor,
    children,
    errorMessage,
    ...props
}: React.PropsWithChildren<TProps>) => {
    const { colorMode } = useColorMode();

    return (
        <FormControl
            className={
                `relative pb-4 [&>label]:focus-within:-translate-y-[20px] ${
                    colorMode === "dark" ? "[&>label]:focus-within:text-white" : "[&>label]:focus-within:text-black"
                } [&>label]:focus-within:scale-[0.85] ` +
                `[&>input:not(:placeholder-shown)~label]:-translate-y-[20px] ${
                    colorMode === "dark"
                        ? "[&>input:not(:placeholder-shown)~label]:text-white"
                        : "[&>input:not(:placeholder-shown)~label]:text-black"
                } [&>input:not(:placeholder-shown)~label]:scale-[0.85] ` +
                `[&>textarea:not(:placeholder-shown)~label]:-translate-y-[20px] ${
                    colorMode === "dark"
                        ? "[&>textarea:not(:placeholder-shown)~label]:text-white"
                        : "[&>textarea:not(:placeholder-shown)~label]:text-black"
                } [&>textarea:not(:placeholder-shown)~label]:scale-[0.85] ${className || ""}`
            }
            {...props}
        >
            {children}
            <span
                className={`duration-400 absolute bottom-0 left-0 text-xs transition-all ease-in-out ${
                    errorMessage && props.isInvalid ? "opacity-100" : "opacity-0"
                } ${colorMode === "dark" ? "text-red-200" : "text-red-500"}`}
            >
                {errorMessage}
            </span>
            <FormLabel
                className={`absolute top-0 left-0 z-[1] my-2 mx-3 h-min cursor-text px-1 ${
                    colorMode === "dark" ? `bg-${darkBgColor} text-gray-300` : `bg-${lightBgColor} text-gray-400`
                }`}
            >
                {label}
            </FormLabel>
        </FormControl>
    );
};

export default FloatingLabelFormControl;
