import { Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, useColorMode } from "@chakra-ui/react";
import React from "react";
import UserNameAvatar from "./UserNameAvatar";
import { ISearchItemUser } from "../services/commonTypes";

type TProps = {
    inputRef: any;
    visible: boolean;
    onContentBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
    trigger: React.ReactNode;
    searchItems: ISearchItemUser[];
    showMoreSearchItemsButtonVisible: boolean;
    onShowMoreSearchItemsButtonClick: () => void;
    onSearchItemUserClick: (userId: string) => void;
};

const SearchPopover = ({
    inputRef,
    visible,
    onContentBlur,
    trigger,
    searchItems,
    showMoreSearchItemsButtonVisible,
    onShowMoreSearchItemsButtonClick,
    onSearchItemUserClick,
}: TProps) => {
    const { colorMode } = useColorMode();

    const nameHoverStyle = `lg:hover:bg-brand-100 ${colorMode === "dark" ? "lg:hover:text-black" : ""}`;
    const nameActiveStyle = `active:bg-brand-300 lg:hover:bg-brand-100 lg:hover:active:bg-brand-300 ${
        colorMode === "dark" ? "active:text-black" : ""
    }`;

    return (
        <Popover
            placement="bottom"
            isOpen={visible}
            initialFocusRef={inputRef}
            closeOnBlur={false}
            returnFocusOnClose={false}
        >
            <PopoverTrigger>{trigger}</PopoverTrigger>
            <PopoverContent
                onBlur={onContentBlur}
                className={`search-popover-class !w-[calc(100vw/2.5)] !min-w-[380px] ${
                    colorMode === "dark" ? "!border-gray-500" : "!border-gray-400"
                }`}
            >
                <PopoverHeader className={`text-xl ${colorMode === "dark" ? "!border-gray-500" : "!border-gray-300"}`}>
                    Keresési találatok
                </PopoverHeader>
                <PopoverBody>
                    <div className="flex flex-col gap-2">
                        {searchItems.map((si) => (
                            <div
                                key={si.userId}
                                className={`flex cursor-pointer items-center gap-2 rounded-md p-1 ${nameHoverStyle} ${nameActiveStyle}`}
                                onClick={() => onSearchItemUserClick(si.userId)}
                            >
                                <UserNameAvatar userName={si.userName} />
                                <span>{si.userName}</span>
                            </div>
                        ))}
                        {searchItems.length === 0 && (
                            <p className="text-center">
                                Nem található egyetlen felhasználó sem a keresési feltételnek megfelelően.
                            </p>
                        )}
                        {searchItems.length > 0 && showMoreSearchItemsButtonVisible && (
                            <div
                                onClick={onShowMoreSearchItemsButtonClick}
                                className={`flex cursor-pointer items-center gap-2 rounded-md p-2 ${nameHoverStyle} ${nameActiveStyle}`}
                            >
                                <span>További találatok megjelenítése...</span>
                            </div>
                        )}
                    </div>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default SearchPopover;
