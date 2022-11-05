import { FormControl, FormControlProps, FormLabel, useColorMode } from "@chakra-ui/react";
import React from "react";

type TProps = {
    label: string;
    lightBgColor: string;
    darkBgColor: string;
} & FormControlProps;

const FloatingLabelFormControl = ({
    label,
    lightBgColor,
    darkBgColor,
    children,
    ...props
}: React.PropsWithChildren<TProps>) => {
    const { colorMode } = useColorMode();

    return (
        <FormControl
            className={
                `relative [&>label]:focus-within:-translate-y-[20px] ${
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
                } [&>textarea:not(:placeholder-shown)~label]:scale-[0.85]`
            }
            {...props}
        >
            {children}
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
