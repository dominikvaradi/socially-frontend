import { FormControl, FormLabel, TextareaProps, useColorMode } from "@chakra-ui/react";
import { FieldInputProps } from "formik";
import React from "react";
import AutoResizeTextarea from "./AutoResizeTextarea";

type TProps = {
    inputRef?: React.RefObject<HTMLTextAreaElement>;
    className?: string;
    label: string;
    bgColorLight: string;
    bgColorDark: string;
    required?: boolean;
    invalid?: boolean;
    errorMessage?: string;
    fieldInputProps?: FieldInputProps<string>;
} & TextareaProps;

const FloatingLabelInput = ({
    inputRef,
    className,
    label,
    bgColorLight,
    bgColorDark,
    required,
    invalid,
    errorMessage,
    fieldInputProps,
    ...props
}: TProps) => {
    const { colorMode } = useColorMode();

    const inputGroupFocusWithinStyle = "[&>label]:focus-within:-translate-y-[20px] [&>label]:focus-within:scale-[0.85]";

    const inputGroupInputPlaceholderNotShownStyle =
        "[&>textarea:not(:placeholder-shown)~label]:-translate-y-[20px] [&>textarea:not(:placeholder-shown)~label]:scale-[0.85]";

    const labelBgColorStyle = `bg-${colorMode === "dark" ? bgColorDark : bgColorLight}`;
    const labelTextColorStyle = colorMode === "dark" ? "text-gray-300" : "text-gray-400";

    return (
        <FormControl
            className={`relative pb-4 ${inputGroupFocusWithinStyle} ${inputGroupInputPlaceholderNotShownStyle} ${
                className || ""
            }`}
            isRequired={required}
            isInvalid={invalid}
        >
            <AutoResizeTextarea ref={inputRef} placeholder=" " {...props} {...fieldInputProps} />
            <FormLabel
                className={`absolute top-0 left-4 z-[1] my-2 h-min cursor-text px-1 ${labelBgColorStyle} ${labelTextColorStyle}`}
            >
                {label}
            </FormLabel>
            <span
                className={`duration-400 absolute bottom-0 left-0 text-xs transition-all ease-in-out ${
                    errorMessage && invalid ? "opacity-100" : "opacity-0"
                } ${colorMode === "dark" ? "text-red-200" : "text-red-500"}`}
            >
                {errorMessage}
            </span>
        </FormControl>
    );
};

export default FloatingLabelInput;
