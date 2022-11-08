import { InputProps } from "@chakra-ui/react";
import { FieldInputProps, useFormikContext } from "formik";
import React from "react";
import { IconType } from "react-icons";
import { TIconPosition } from "../../services/commonTypes";
import FloatingLabelDatePickerComponent from "./FloatingLabelDatePickerComponent";

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

const FloatingLabelDatePickerContainer = ({
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
    const { setFieldValue, setFieldTouched, validateField } = useFormikContext();

    const handleReactDatePickerChange = (value: Date | null) => {
        setFieldValue(fieldInputProps.name, value);
        validateField(fieldInputProps.name);
    };

    const handleReactDatePickerCalendarClose = () => {
        setFieldTouched(fieldInputProps.name, true, false);
    };

    return (
        <FloatingLabelDatePickerComponent
            className={className}
            label={label}
            bgColorLight={bgColorLight}
            bgColorDark={bgColorDark}
            icon={icon}
            iconPosition={iconPosition}
            required={required}
            invalid={invalid}
            errorMessage={errorMessage}
            calendarValue={fieldInputProps.value ? new Date(fieldInputProps.value) : null}
            onReactDatePickerChange={handleReactDatePickerChange}
            onReactDatePickerCalendarClose={handleReactDatePickerCalendarClose}
        />
    );
};

export default FloatingLabelDatePickerContainer;
