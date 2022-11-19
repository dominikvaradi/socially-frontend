import {
    Button,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { FiUser, FiMenu, FiEdit, FiLogOut, FiSun, FiMoon, FiUserPlus } from "react-icons/fi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import UserNameAvatar from "../UserNameAvatar";
import SearchPopover from "../SearchPopover";
import { ISearchItemUser } from "../../services/commonTypes";

type TProps = {
    userName: string;
    lastConversationsExpandButtonRef: React.RefObject<HTMLButtonElement>;
    onLastConversationsExpandButtonClick: () => void;
    onProfileButtonClick: () => void;
    onSettingsButtonClick: () => void;
    onSignOutButtonClick: () => void;
    searchInputRef: React.RefObject<HTMLInputElement>;
    searchInputValue: string;
    onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchInputBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
    onSearchInputFocus: () => void;
    searchPopoverVisible: boolean;
    onSearchPopoverContentBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
    searchPopoverSearchItems: ISearchItemUser[];
    searchPopoverShowMoreSearchItemsButtonVisible: boolean;
    onSearchPopoverShowMoreSearchItemsButtonClick: () => void;
    onSearchPopoverSearchItemUserClick: (userId: string) => void;
    onHomeButtonClick: () => void;
    onSearchButtonClick: () => void;
    onFriendRequestsButtonClick: () => void;
    onConversationsButtonClick: () => void;
};

const HeaderBarComponent = ({
    userName,
    lastConversationsExpandButtonRef,
    onLastConversationsExpandButtonClick,
    onProfileButtonClick,
    onSettingsButtonClick,
    onSignOutButtonClick,
    searchInputRef,
    searchInputValue,
    onSearchInputChange,
    onSearchInputBlur,
    onSearchInputFocus,
    searchPopoverVisible,
    onSearchPopoverContentBlur,
    searchPopoverSearchItems,
    searchPopoverShowMoreSearchItemsButtonVisible,
    onSearchPopoverShowMoreSearchItemsButtonClick,
    onSearchPopoverSearchItemUserClick,
    onHomeButtonClick,
    onSearchButtonClick,
    onFriendRequestsButtonClick,
    onConversationsButtonClick,
}: TProps) => {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <div
            className={`bg-brand z-[2] flex h-[80px] w-full items-center justify-between space-x-2 px-3 py-2 drop-shadow-lg ${
                colorMode === "dark" ? "bg-brand-200" : "bg-brand-500"
            }`}
        >
            <div className="flex flex-1 space-x-2 sm:justify-between">
                <IconButton
                    ref={lastConversationsExpandButtonRef}
                    colorScheme="brand"
                    icon={<Icon as={FiMenu} />}
                    aria-label="last 10 conversations sidebar toggle"
                    className="!h-14 !w-14 !text-xl"
                    onClick={onLastConversationsExpandButtonClick}
                />
                <IconButton
                    colorScheme="brand"
                    icon={<Icon as={FaHome} />}
                    aria-label="Return to home screen"
                    className="!h-14 !w-14 !text-xl"
                    onClick={onHomeButtonClick}
                />
                <IconButton
                    colorScheme="brand"
                    icon={<Icon as={HiOutlineSearch} />}
                    aria-label="Return to home screen"
                    className="!h-14 !w-14 !text-xl sm:!hidden"
                    onClick={onSearchButtonClick}
                />
            </div>
            <div className="hidden h-full flex-grow items-center sm:flex">
                <SearchPopover
                    inputRef={searchInputRef}
                    visible={searchPopoverVisible}
                    onContentBlur={onSearchPopoverContentBlur}
                    trigger={
                        <InputGroup
                            size="lg"
                            className={`!h-14 ${colorMode === "dark" ? "!text-white" : "!text-black"}`}
                        >
                            <InputLeftElement className="!h-14" pointerEvents="none">
                                <Icon as={HiOutlineSearch} />
                            </InputLeftElement>
                            <Input
                                ref={searchInputRef}
                                value={searchInputValue}
                                onChange={onSearchInputChange}
                                onBlur={onSearchInputBlur}
                                onFocus={onSearchInputFocus}
                                placeholder="Keresés..."
                                className="!h-14 !bg-[var(--chakra-colors-chakra-body-bg)]"
                            />
                        </InputGroup>
                    }
                    searchItems={searchPopoverSearchItems}
                    showMoreSearchItemsButtonVisible={searchPopoverShowMoreSearchItemsButtonVisible}
                    onShowMoreSearchItemsButtonClick={onSearchPopoverShowMoreSearchItemsButtonClick}
                    onSearchItemUserClick={onSearchPopoverSearchItemUserClick}
                />
            </div>
            <div className="flex flex-1 items-center justify-end space-x-2">
                <IconButton
                    colorScheme="brand"
                    icon={<Icon as={IoChatbubbleEllipsesOutline} />}
                    aria-label="Friend requests"
                    className="!hidden !h-14 !w-14 !text-xl md:!flex"
                    onClick={onConversationsButtonClick}
                />
                <IconButton
                    colorScheme="brand"
                    icon={<Icon as={FiUserPlus} />}
                    aria-label="Friend requests"
                    className="!hidden !h-14 !w-14 !text-xl md:!flex"
                    onClick={onFriendRequestsButtonClick}
                />
                <IconButton
                    colorScheme="brand"
                    icon={<Icon as={colorMode === "dark" ? FiSun : FiMoon} />}
                    aria-label="Dark-Light mode switch"
                    className="!hidden !h-14 !w-14 !text-xl lg:!flex"
                    onClick={toggleColorMode}
                />
                <Menu>
                    <MenuButton as={Button} colorScheme="brand" className="!h-min !p-1">
                        <div className="flex items-center space-x-1">
                            <UserNameAvatar userName={userName} />
                            <span className="hidden sm:block">{userName}</span>
                        </div>
                    </MenuButton>
                    <MenuList className="z-[2]">
                        <MenuItem
                            icon={<Icon as={FiUser} />}
                            onClick={onProfileButtonClick}
                            className={colorMode === "dark" ? "!text-brand-200" : "!text-brand-800"}
                        >
                            Profil
                        </MenuItem>
                        <MenuItem
                            icon={<Icon as={FiEdit} />}
                            onClick={onSettingsButtonClick}
                            className={colorMode === "dark" ? "!text-brand-200" : "!text-brand-800"}
                        >
                            Profil szerkesztése
                        </MenuItem>
                        <MenuItem
                            icon={<Icon as={IoChatbubbleEllipsesOutline} />}
                            onClick={onConversationsButtonClick}
                            className={`md:!hidden ${colorMode === "dark" ? "!text-brand-200" : "!text-brand-800"}`}
                        >
                            Beszélgetések
                        </MenuItem>
                        <MenuItem
                            icon={<Icon as={FiUserPlus} />}
                            onClick={onFriendRequestsButtonClick}
                            className={`md:!hidden ${colorMode === "dark" ? "!text-brand-200" : "!text-brand-800"}`}
                        >
                            Barát-kérelmek
                        </MenuItem>
                        <MenuItem
                            icon={<Icon as={colorMode === "dark" ? FiSun : FiMoon} />}
                            onClick={toggleColorMode}
                            className={`lg:!hidden ${colorMode === "dark" ? "!text-brand-200" : "!text-brand-800"}`}
                        >
                            {colorMode === "dark" ? "Nappali mód" : "Éjszakai mód"}
                        </MenuItem>
                        <MenuItem
                            icon={<Icon as={FiLogOut} />}
                            onClick={onSignOutButtonClick}
                            className={colorMode === "dark" ? "!text-brand-200" : "!text-brand-800"}
                        >
                            Kijelentkezés
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>
    );
};

export default HeaderBarComponent;
