import { Button, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, useColorMode } from "@chakra-ui/react";
import React from "react";
import MainLayout from "../../../common/components/MainLayout";
import UserNameAvatar from "../../../common/components/UserNameAvatar";
import { IConversationMember, TConversationRole } from "../../services/conversationTypes";
import { FiArrowLeft, FiEdit, FiUserMinus, FiUserPlus } from "react-icons/fi";
import ChangeConversationRoleAlertDialog from "../../components/ChangeConversationRoleAlertDialog";
import RemoveMemberFromConversationAlertDialog from "../../components/RemoveMemberFromConversationAlertDialog";

type TProps = {
    members: IConversationMember[];
    onUserProfileClick: (userId: string) => void;
    groupConversation: boolean;
    userRoleAdmin: boolean;
    onChangeMemberMenuItemButtonClick: (member: IConversationMember, role: TConversationRole) => void;
    changeConversationRoleAlertDialogVisible: boolean;
    onChangeConversationRoleAlertDialogClose: () => void;
    onChangeConversationRoleAlertDialogConfirmButtonClick: () => void;
    changeConversationRoleAlertDialogConfirmButtonLoading: boolean;
    onBackButtonClick: () => void;
    onRemoveUserFromConversationButtonClick: (member: IConversationMember) => void;
    removeMemberFromConversationAlertDialogVisible: boolean;
    onRemoveMemberFromConversationAlertDialogClose: () => void;
    onRemoveMemberFromConversationAlertDialogConfirmButtonClick: () => void;
    removeMemberFromConversationAlertDialogConfirmButtonLoading: boolean;
    onAddUsersToConversationButtonClick: () => void;
};

const ConversationMembersScreenComponent = ({
    members,
    onUserProfileClick,
    groupConversation,
    userRoleAdmin,
    onChangeMemberMenuItemButtonClick,
    changeConversationRoleAlertDialogVisible,
    onChangeConversationRoleAlertDialogClose,
    onChangeConversationRoleAlertDialogConfirmButtonClick,
    changeConversationRoleAlertDialogConfirmButtonLoading,
    onBackButtonClick,
    onRemoveUserFromConversationButtonClick,
    removeMemberFromConversationAlertDialogVisible,
    onRemoveMemberFromConversationAlertDialogClose,
    onRemoveMemberFromConversationAlertDialogConfirmButtonClick,
    removeMemberFromConversationAlertDialogConfirmButtonLoading,
    onAddUsersToConversationButtonClick,
}: TProps) => {
    const { colorMode } = useColorMode();

    const itemHoverStyle = `lg:hover:bg-brand-100 ${colorMode === "dark" ? "lg:hover:text-black" : ""}`;
    const itemActiveStyle = `active:bg-brand-300 lg:hover:bg-brand-100 lg:hover:active:bg-brand-300 ${
        colorMode === "dark" ? "active:text-black" : ""
    }`;

    return (
        <MainLayout>
            <div className="flex items-center justify-center sm:pl-16">
                <div
                    className={`m-4 flex w-full max-w-[1000px] flex-col gap-6 rounded-md p-4 drop-shadow-md sm:m-8 sm:w-[80%] ${
                        colorMode === "dark" ? "bg-slate-600" : "bg-white"
                    }`}
                >
                    <div className="flex flex-wrap items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                            <IconButton
                                onClick={onBackButtonClick}
                                colorScheme="brand"
                                icon={<Icon as={FiArrowLeft} />}
                                aria-label="Go back"
                                variant="ghost"
                            />
                            <span className="text-xl">Beszélgetés résztvevői</span>
                        </div>
                        {groupConversation && userRoleAdmin && (
                            <Button
                                onClick={onAddUsersToConversationButtonClick}
                                leftIcon={<Icon as={FiUserPlus} />}
                                colorScheme="brand"
                            >
                                Felhasználók hozzáadása
                            </Button>
                        )}
                    </div>
                    <div className="flex flex-col gap-6 lg:gap-1">
                        {members.map((member) => (
                            <div key={member.userId} className="flex flex-col gap-2 lg:flex-row lg:items-center">
                                <div
                                    onClick={() => onUserProfileClick(member.userId)}
                                    className={`flex cursor-pointer select-none items-center gap-2 rounded-lg p-1 lg:flex-grow ${itemHoverStyle} ${itemActiveStyle}`}
                                >
                                    <UserNameAvatar userName={member.userName} />
                                    <span className="break-all text-lg">
                                        {member.userName +
                                            (groupConversation
                                                ? ` (${convertConversationRole2NationalString(member.role)})`
                                                : "")}
                                    </span>
                                </div>
                                {groupConversation && userRoleAdmin && (
                                    <div className="flex flex-wrap gap-2">
                                        <Menu>
                                            <MenuButton
                                                as={Button}
                                                leftIcon={<Icon as={FiEdit} />}
                                                aria-label="Modify member's role"
                                                colorScheme="yellow"
                                                size="sm"
                                            >
                                                Szerepkör módosítása
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => onChangeMemberMenuItemButtonClick(member, "NORMAL")}
                                                    className={
                                                        colorMode === "dark" ? "!text-brand-200" : "!text-brand-800"
                                                    }
                                                    isDisabled={member.role === "NORMAL"}
                                                >
                                                    Résztvevő
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => onChangeMemberMenuItemButtonClick(member, "ADMIN")}
                                                    className={
                                                        colorMode === "dark" ? "!text-brand-200" : "!text-brand-800"
                                                    }
                                                    isDisabled={member.role === "ADMIN"}
                                                >
                                                    Adminisztrátor
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                        <Button
                                            onClick={() => onRemoveUserFromConversationButtonClick(member)}
                                            leftIcon={<Icon as={FiUserMinus} />}
                                            colorScheme="red"
                                            size="sm"
                                        >
                                            Eltávolítás
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ChangeConversationRoleAlertDialog
                visible={changeConversationRoleAlertDialogVisible}
                onClose={onChangeConversationRoleAlertDialogClose}
                onConfirmButtonClick={onChangeConversationRoleAlertDialogConfirmButtonClick}
                confirmButtonLoading={changeConversationRoleAlertDialogConfirmButtonLoading}
            />
            <RemoveMemberFromConversationAlertDialog
                visible={removeMemberFromConversationAlertDialogVisible}
                onClose={onRemoveMemberFromConversationAlertDialogClose}
                onConfirmButtonClick={onRemoveMemberFromConversationAlertDialogConfirmButtonClick}
                confirmButtonLoading={removeMemberFromConversationAlertDialogConfirmButtonLoading}
            />
        </MainLayout>
    );
};

export default ConversationMembersScreenComponent;

const convertConversationRole2NationalString = (conversationRole: TConversationRole): string => {
    switch (conversationRole) {
        case "NORMAL":
            return "Résztvevő";
        case "ADMIN":
            return "Adminisztrátor";
    }
};
