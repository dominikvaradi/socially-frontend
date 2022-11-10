import { Button, Icon, Input, InputGroup, InputLeftElement, useColorMode } from "@chakra-ui/react";
import React from "react";
import MainLayout from "../../../common/components/MainLayout";
import { HiOutlineSearch } from "react-icons/hi";
import UserNameAvatar from "../../../common/components/UserNameAvatar";
import ColorModeSpinner from "../../../common/components/ColorModeSpinner";
import { ISearchItemUser } from "../../../common/services/commonTypes";

type TProps = {
    searchInputValue: string;
    onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchItems: ISearchItemUser[];
    onSearchItemUserClick: (userId: string) => void;
    searchItemsLoading: boolean;
    loadMoreSearchItemsButtonVisible: boolean;
    onLoadMoreSearchItemsButtonClick: () => void;
};

const SearchScreenComponent = ({
    searchInputValue,
    onSearchInputChange,
    searchItems,
    onSearchItemUserClick,
    searchItemsLoading,
    loadMoreSearchItemsButtonVisible,
    onLoadMoreSearchItemsButtonClick,
}: TProps) => {
    const { colorMode } = useColorMode();

    const itemHoverStyle = `lg:hover:bg-brand-100 ${colorMode === "dark" ? "lg:hover:text-black" : ""}`;
    const itemActiveStyle = `active:bg-brand-300 lg:hover:bg-brand-100 lg:hover:active:bg-brand-300 ${
        colorMode === "dark" ? "active:text-black" : ""
    }`;

    return (
        <MainLayout>
            <div className="flex w-full justify-center sm:pl-16">
                <div
                    className={`mx-4 my-8 flex w-full max-w-[800px] flex-col gap-4 rounded-md p-4 drop-shadow-md sm:mx-0 sm:w-[80%] sm:p-8 ${
                        colorMode === "dark" ? "bg-slate-600" : "bg-white"
                    }`}
                >
                    <div className="space-y-2">
                        <InputGroup
                            size="lg"
                            className={`!h-14 ${colorMode === "dark" ? "!text-white" : "!text-black"}`}
                        >
                            <InputLeftElement className="!h-14" pointerEvents="none">
                                <Icon as={HiOutlineSearch} />
                            </InputLeftElement>
                            <Input
                                value={searchInputValue}
                                onChange={onSearchInputChange}
                                placeholder="Keresés..."
                                className="!h-14 !bg-[var(--chakra-colors-chakra-body-bg)]"
                            />
                        </InputGroup>
                        <Button colorScheme="brand">Keresés</Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        {searchItems.map((si) => (
                            <div
                                key={si.userId}
                                onClick={() => onSearchItemUserClick(si.userId)}
                                className={`flex cursor-pointer items-center gap-2 rounded-lg p-1 ${itemHoverStyle} ${itemActiveStyle}`}
                            >
                                <UserNameAvatar userName={si.userName} size="lg" />
                                <span className="text-xl">{si.userName}</span>
                            </div>
                        ))}
                        {searchItems.length === 0 && searchItemsLoading && (
                            <div className="flex justify-center">
                                <ColorModeSpinner size="xl" />
                            </div>
                        )}
                        {searchItems.length === 0 && !searchItemsLoading && (
                            <p className="text-center">Nincsen egyetlen megjeleníthető találat sem.</p>
                        )}
                        {searchItems.length > 0 && loadMoreSearchItemsButtonVisible && (
                            <div className="flex justify-center">
                                <Button
                                    onClick={onLoadMoreSearchItemsButtonClick}
                                    isLoading={searchItemsLoading}
                                    colorScheme="brand"
                                    variant="ghost"
                                    spinner={<ColorModeSpinner size="lg" />}
                                >
                                    További találatok betöltése
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default SearchScreenComponent;
