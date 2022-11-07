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
import { FieldInputProps, useFormikContext } from "formik";
import React from "react";
import ReactDatePicker from "react-datepicker";
import { IconType } from "react-icons";
import { TIconPosition } from "../services/commonTypes";
import "react-datepicker/dist/react-datepicker.css";

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
    fieldInputProps: FieldInputProps<Date>;
} & InputProps;

const FloatingLabelDatePicker = ({
    className,
    label,
    bgColorLight,
    bgColorDark,
    icon,
    iconPosition,
    required,
    invalid,
    errorMessage,
    fieldInputProps,
}: TProps) => {
    const { colorMode } = useColorMode();
    const { setFieldValue, setFieldTouched, validateField } = useFormikContext();

    const inputGroupFocusWithinStyle = `[&>label]:focus-within:-translate-y-[20px] [&>label]:focus-within:scale-[0.85] ${
        icon && (!iconPosition || iconPosition === "left") ? "[&>label]:focus-within:-translate-x-6" : ""
    }`;

    const inputGroupHasValueStyle = fieldInputProps.value
        ? `[&>label]:-translate-y-[20px] [&>label]:scale-[0.85] ${
              icon && (!iconPosition || iconPosition === "left") ? "[&>label]:-translate-x-6" : ""
          }`
        : "";

    const labelBgColorStyle = `bg-${colorMode === "dark" ? bgColorDark : bgColorLight}`;
    const labelTextColorStyle = colorMode === "dark" ? "text-gray-300" : "text-gray-400";

    const handleReactDatePickerChange = (value: Date | null) => {
        setFieldValue(fieldInputProps.name, value);
        validateField(fieldInputProps.name);
    };

    const handleReactDatePickerCalendarClose = () => {
        setFieldTouched(fieldInputProps.name, true, false);
    };

    return (
        <FormControl className={`relative pb-4 ${className || ""}`} isRequired={required} isInvalid={invalid}>
            <InputGroup className={`relative ${inputGroupFocusWithinStyle} ${inputGroupHasValueStyle}`}>
                {icon && (!iconPosition || iconPosition === "left") && (
                    <InputLeftElement pointerEvents="none">
                        <Icon as={icon} />
                    </InputLeftElement>
                )}
                <ReactDatePicker
                    selected={(fieldInputProps.value && new Date(fieldInputProps.value)) || null}
                    onChange={handleReactDatePickerChange}
                    onCalendarClose={handleReactDatePickerCalendarClose}
                    customInput={<Input />}
                    showYearDropdown
                    dateFormat="yyyy. MM. dd."
                />
                {icon && iconPosition === "right" && (
                    <InputRightElement pointerEvents="none">
                        <Icon as={icon} />
                    </InputRightElement>
                )}
                <FormLabel
                    className={`absolute top-0 z-[1] my-2 h-min cursor-text px-1 ${labelBgColorStyle} ${labelTextColorStyle} ${
                        icon && (!iconPosition || iconPosition === "left") ? "left-10" : "left-4"
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

export default FloatingLabelDatePicker;
