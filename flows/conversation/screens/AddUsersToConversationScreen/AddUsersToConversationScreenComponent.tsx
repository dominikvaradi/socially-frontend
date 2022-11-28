import { Button, Icon, IconButton, Input, InputGroup, InputLeftElement, useColorMode } from "@chakra-ui/react";
import React from "react";
import MainLayout from "../../../common/components/MainLayout";
import { FiArrowLeft, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import UserNameAvatar from "../../../common/components/UserNameAvatar";
import ColorModeSpinner from "../../../common/components/ColorModeSpinner";
import { ISearchItemUser } from "../../../common/services/commonTypes";

type TProps = {
    searchInputValue: string;
    onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    members: ISearchItemUser[];
    searchItems: ISearchItemUser[];
    onRemoveUserFromConversationButtonClick: (userId: string) => void;
    onAddUserToConversationButtonClick: (userId: string) => void;
    searchItemsLoading: boolean;
    onBackButtonClick: () => void;
    onAddUsersToConversationButtonClick: () => void;
    addUsersToConversationConversationButtonLoading: boolean;
    onSearchSubmitButtonClick: () => void;
    searchFired: boolean;
};

const AddUsersToConversationScreen = ({
    searchInputValue,
    onSearchInputChange,
    members,
    searchItems,
    onRemoveUserFromConversationButtonClick,
    onAddUserToConversationButtonClick,
    searchItemsLoading,
    onBackButtonClick,
    onAddUsersToConversationButtonClick,
    addUsersToConversationConversationButtonLoading,
    onSearchSubmitButtonClick,
    searchFired,
}: TProps) => {
    const { colorMode } = useColorMode();

    const itemHoverStyle = `lg:hover:bg-brand-100 ${colorMode === "dark" ? "lg:hover:text-black" : ""}`;

    return (
        <MainLayout>
            <div className="flex items-center justify-center sm:pl-16">
                <div
                    className={`m-4 flex w-full max-w-[1000px] flex-col gap-6 rounded-md p-4 drop-shadow-md sm:m-8 sm:w-[80%] ${
                        colorMode === "dark" ? "bg-slate-600" : "bg-white"
                    }`}
                >
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <IconButton
                                onClick={onBackButtonClick}
                                colorScheme="brand"
                                icon={<Icon as={FiArrowLeft} />}
                                aria-label="Go back"
                                variant="ghost"
                            />
                            <span className="text-xl">Felhasználók hozzáadása a beszélgetéshez</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 md:flex-row">
                        <div className="flex flex-col md:flex-1">
                            <p className="mb-2">Hozzáadott tagok</p>
                            <div className="flex flex-col gap-2">
                                {members.map((si) => (
                                    <div
                                        key={si.userId}
                                        className={`flex items-center justify-between gap-2 rounded-lg py-1 pl-1 pr-3 ${itemHoverStyle}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <UserNameAvatar userName={si.userName} />
                                            <span>{si.userName}</span>
                                        </div>
                                        <IconButton
                                            onClick={() => onRemoveUserFromConversationButtonClick(si.userId)}
                                            colorScheme="red"
                                            icon={<Icon as={FiMinusCircle} />}
                                            aria-label="Add user to conversation"
                                            className="!text-lg"
                                            size="sm"
                                        />
                                    </div>
                                ))}
                                {members.length === 0 && (
                                    <p className="text-center">Még nem adtál hozzá egyetlen tagot sem.</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-1">
                            <p className="mb-2">Barátok hozzáadása</p>
                            <div className="mb-4 space-y-2">
                                <InputGroup className={`${colorMode === "dark" ? "!text-white" : "!text-black"}`}>
                                    <InputLeftElement className="" pointerEvents="none">
                                        <Icon as={HiOutlineSearch} />
                                    </InputLeftElement>
                                    <Input
                                        value={searchInputValue}
                                        onChange={onSearchInputChange}
                                        placeholder="Barát Keresése..."
                                        className="!bg-[var(--chakra-colors-chakra-body-bg)]"
                                    />
                                </InputGroup>
                                <Button onClick={onSearchSubmitButtonClick} colorScheme="brand">
                                    Keresés
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {searchItems.map((si) => (
                                    <div
                                        key={si.userId}
                                        className={`flex items-center justify-between gap-2 rounded-lg py-1 pl-1 pr-3 ${itemHoverStyle}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <UserNameAvatar userName={si.userName} />
                                            <span>{si.userName}</span>
                                        </div>
                                        <IconButton
                                            onClick={() => onAddUserToConversationButtonClick(si.userId)}
                                            colorScheme="green"
                                            icon={<Icon as={FiPlusCircle} />}
                                            aria-label="Add user to conversation"
                                            className="!text-lg"
                                            size="sm"
                                        />
                                    </div>
                                ))}
                                {searchItems.length === 0 && searchItemsLoading && (
                                    <div className="flex justify-center">
                                        <ColorModeSpinner size="lg" />
                                    </div>
                                )}
                                {searchItems.length === 0 && !searchItemsLoading && searchFired && (
                                    <p className="text-center">Nincsen egyetlen megjeleníthető találat sem.</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            className="!whitespace-normal"
                            onClick={onAddUsersToConversationButtonClick}
                            colorScheme="brand"
                            disabled={members.length === 0 || addUsersToConversationConversationButtonLoading}
                            isLoading={addUsersToConversationConversationButtonLoading}
                        >
                            Felhasználók hozzáadása a beszélgetéshez
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AddUsersToConversationScreen;
