import {
    FormControl,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputProps,
    InputRightElement,
    useColorMode,
} from "@chakra-ui/react";
import React from "react";
import ReactDatePicker from "react-datepicker";
import { IconType } from "react-icons";
import "react-datepicker/dist/react-datepicker.css";
import { TIconPosition } from "../../services/commonTypes";
import CustomReactDatePickerHeader from "./components/CustomReactDatePickerHeader";

type TProps = {
    className?: string;
    label: string;
    bgColorLight: string;
    bgColorDark: string;
    icon?: IconType;
    iconPosition?: TIconPosition;
    required?: boolean;
    invalid?: boolean;
    errorMessage?: string;
    calendarValue: Date | null;
    onReactDatePickerChange: (value: Date | null) => void;
    onReactDatePickerCalendarClose: () => void;
} & InputProps;

const FloatingLabelDatePickerComponent = ({
    className,
    label,
    bgColorLight,
    bgColorDark,
    icon,
    iconPosition,
    required,
    invalid,
    errorMessage,
    calendarValue,
    onReactDatePickerChange,
    onReactDatePickerCalendarClose,
}: TProps) => {
    const { colorMode } = useColorMode();

    const hasIconOnLeft = icon && (!iconPosition || iconPosition === "left");

    const inputGroupFocusWithinStyle = `[&>label]:focus-within:-translate-y-[20px] [&>label]:focus-within:scale-[0.85] ${
        hasIconOnLeft ? "[&>label]:focus-within:-translate-x-6" : ""
    }`;

    const inputGroupLabelStyle = `[&>label]:-translate-y-[20px] [&>label]:scale-[0.85] ${
        hasIconOnLeft ? "[&>label]:-translate-x-6" : ""
    }`;

    const labelBgColorStyle = `bg-${colorMode === "dark" ? bgColorDark : bgColorLight}`;
    const labelTextColorStyle = colorMode === "dark" ? "text-gray-300" : "text-gray-400";

    return (
        <FormControl className={`relative pb-4 ${className || ""}`} isRequired={required} isInvalid={invalid}>
            <InputGroup
                className={`relative ${inputGroupFocusWithinStyle} ${
                    colorMode === "dark" ? "floating-label-date-picker-dark" : "floating-label-date-picker-light"
                } ${calendarValue ? inputGroupLabelStyle : ""}`}
            >
                {hasIconOnLeft && (
                    <InputLeftElement pointerEvents="none">
                        <Icon as={icon} />
                    </InputLeftElement>
                )}
                <ReactDatePicker
                    selected={calendarValue}
                    onChange={onReactDatePickerChange}
                    onCalendarClose={onReactDatePickerCalendarClose}
                    customInput={<Input />}
                    dateFormat="yyyy. MM. dd."
                    popperPlacement="bottom"
                    renderCustomHeader={(props) => CustomReactDatePickerHeader(colorMode, props)}
                    disabledKeyboardNavigation
                />
                {icon && iconPosition === "right" && (
                    <InputRightElement pointerEvents="none">
                        <Icon as={icon} />
                    </InputRightElement>
                )}
                <FormLabel
                    className={`absolute top-0 z-[1] my-2 h-min cursor-text px-1 ${labelBgColorStyle} ${labelTextColorStyle} ${
                        hasIconOnLeft ? "left-10" : "left-4"
                    }`}
                >
                    {label}
                </FormLabel>
            </InputGroup>
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

export default FloatingLabelDatePickerComponent;
