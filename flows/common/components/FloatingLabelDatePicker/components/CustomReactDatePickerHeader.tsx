import { ColorMode, Icon, IconButton, Select } from "@chakra-ui/react";
import React from "react";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CustomReactDatePickerHeader = (
    colorMode: ColorMode,
    {
        date,
        changeYear,
        changeMonth,
        increaseMonth,
        decreaseMonth,
        nextMonthButtonDisabled,
        prevMonthButtonDisabled,
    }: ReactDatePickerCustomHeaderProps
) => {
    const handleMonthSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        changeMonth(months.indexOf(event.target.value));
    };

    const handleYearSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        changeYear(parseInt(event.target.value));
    };

    return (
        <div className="flex flex-col gap-2 p-2">
            <div className="flex justify-between gap-2">
                <IconButton
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    colorScheme="brand"
                    size="sm"
                    icon={<Icon as={FiChevronLeft} />}
                    aria-label="Decrease month"
                />
                <Select
                    id="react-date-header-select-month"
                    className={`!cursor-pointer !rounded-t-md !text-center hover:text-black [&+div]:hover:!text-black ${
                        colorMode === "dark" ? "hover:!bg-brand-300" : "hover:!bg-brand-100"
                    }`}
                    value={months[date.getMonth()]}
                    onChange={handleMonthSelectChange}
                    variant="flushed"
                    borderColor={colorMode === "dark" ? "brand.200" : "brand.500"}
                    size="sm"
                >
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </Select>
                <IconButton
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    colorScheme="brand"
                    size="sm"
                    icon={<Icon as={FiChevronRight} />}
                    aria-label="Decrease month"
                />
            </div>
            <div className="flex justify-center">
                <div className="!w-[50%]">
                    <Select
                        id="react-date-header-select-year"
                        className={`!cursor-pointer !rounded-t-md !text-center hover:text-black [&+div]:hover:!text-black ${
                            colorMode === "dark" ? "hover:!bg-brand-300" : "hover:!bg-brand-100"
                        }`}
                        value={date.getFullYear()}
                        onChange={handleYearSelectChange}
                        variant="flushed"
                        borderColor={colorMode === "dark" ? "brand.200" : "brand.500"}
                        size="sm"
                    >
                        {years.map((year) => (
                            <option key={year.toString()} value={year}>
                                {year}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default CustomReactDatePickerHeader;

const years: number[] = new Array(200).fill(undefined).map((_, i) => i + 1900);

const months: string[] = [
    "Január",
    "Február",
    "Március",
    "Április",
    "Május",
    "Június",
    "Július",
    "Augusztus",
    "Szeptember",
    "Október",
    "November",
    "December",
];
