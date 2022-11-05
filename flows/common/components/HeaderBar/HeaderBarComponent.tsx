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
    Portal,
    useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { FiUser, FiMenu, FiSettings, FiLogOut, FiSun, FiMoon, FiSearch } from "react-icons/fi";
import UserNameAvatar from "../UserNameAvatar";

type TProps = {
    userName: string;
    lastConversationsExpandButtonRef: React.RefObject<HTMLButtonElement>;
    onLastConversationsExpandButtonClick: () => void;
    onProfileButtonClick: () => void;
    onSettingsButtonClick: () => void;
    onSignOutButtonClick: () => void;
};

const HeaderBarComponent = ({
    userName,
    lastConversationsExpandButtonRef,
    onLastConversationsExpandButtonClick,
    onProfileButtonClick,
    onSettingsButtonClick,
    onSignOutButtonClick,
}: TProps) => {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <div
            className={`bg-brand flex h-[80px] w-full items-center justify-between space-x-2 px-3 py-2 drop-shadow-lg ${
                colorMode === "dark" ? "bg-brand-200" : "bg-brand-500"
            }`}
        >
            <div className="flex-1">
                <IconButton
                    ref={lastConversationsExpandButtonRef}
                    colorScheme="brand"
                    icon={<Icon as={FiMenu} />}
                    aria-label="last 10 conversations sidebar toggle"
                    className="!h-14 !w-14 !text-xl"
                    onClick={onLastConversationsExpandButtonClick}
                />
            </div>
            <div className="hidden h-full flex-grow items-center sm:flex">
                <InputGroup size="lg" className={`!h-14 ${colorMode === "dark" ? "!text-white" : "!text-black"}`}>
                    <InputLeftElement className="!h-14" pointerEvents="none">
                        <Icon as={FiSearch} />
                    </InputLeftElement>
                    <Input placeholder="Keresés..." className="!h-14 !bg-[var(--chakra-colors-chakra-body-bg)]" />
                </InputGroup>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-2">
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
                    <Portal>
                        <MenuList>
                            <MenuItem
                                icon={<Icon as={FiUser} />}
                                onClick={onProfileButtonClick}
                                className={colorMode === "dark" ? "!text-brand-200" : "!text-brand-800"}
                            >
                                Profil
                            </MenuItem>
                            <MenuItem
                                icon={<Icon as={FiSettings} />}
                                onClick={onSettingsButtonClick}
                                className={colorMode === "dark" ? "!text-brand-200" : "!text-brand-800"}
                            >
                                Beállítások
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
                    </Portal>
                </Menu>
            </div>
        </div>
    );
};

export default HeaderBarComponent;
