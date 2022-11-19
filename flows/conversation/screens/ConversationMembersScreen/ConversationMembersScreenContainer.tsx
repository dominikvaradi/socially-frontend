import React, { useState } from "react";
import ConversationMembersScreenComponent from "./ConversationMembersScreenComponent";
import {
    ChangeConversationRoleAlertDialogSubject,
    IConversationMember,
    TConversationRole,
} from "../../services/conversationTypes";

const ConversationMembersScreenContainer = () => {
    const [changeConversationRoleAlertDialogSubject, setChangeConversationRoleAlertDialogSubject] = useState<
        ChangeConversationRoleAlertDialogSubject | undefined
    >(undefined);

    const handleUserProfileClick = (userId: string) => {
        console.log("handleUserProfileClick: " + userId);
    };

    const handleChangeMemberMenuItemButtonClick = (userId: string, role: TConversationRole) => {
        setChangeConversationRoleAlertDialogSubject({
            userId,
            role,
        });
    };

    const handleChangeConversationRoleAlertDialogClose = () => {
        setChangeConversationRoleAlertDialogSubject(undefined);
    };

    const handleChangeConversationRoleAlertDialogConfirmButtonClick = () => {
        console.log("handleChangeConversationRoleAlertDialogConfirmButtonClick");
        setChangeConversationRoleAlertDialogSubject(undefined);
    };

    const handleBackButtonClick = () => {
        console.log("handleBackButtonClick");
    };

    return (
        <ConversationMembersScreenComponent
            members={mockMembers}
            onUserProfileClick={handleUserProfileClick}
            groupConversation={true}
            userRoleAdmin={true}
            onChangeMemberMenuItemButtonClick={handleChangeMemberMenuItemButtonClick}
            changeConversationRoleAlertDialogVisible={!!changeConversationRoleAlertDialogSubject}
            onChangeConversationRoleAlertDialogClose={handleChangeConversationRoleAlertDialogClose}
            onChangeConversationRoleAlertDialogConfirmButtonClick={
                handleChangeConversationRoleAlertDialogConfirmButtonClick
            }
            onBackButtonClick={handleBackButtonClick}
        />
    );
};

export default ConversationMembersScreenContainer;

const mockMembers: IConversationMember[] = [
    {
        userId: "0",
        userName: "Naruto Uzumaki",
        role: "ADMIN",
    },
    {
        userId: "1",
        userName: "Sasuke Uchiha",
        role: "ADMIN",
    },
    {
        userId: "2",
        userName: "Hinata Hyuga",
        role: "NORMAL",
    },
    {
        userId: "3",
        userName: "Teszt Elek",
        role: "NORMAL",
    },
    {
        userId: "4",
        userName: "Uchiha Sasuke",
        role: "NORMAL",
    },
    {
        userId: "5",
        userName: "Himawari Uzumaki",
        role: "NORMAL",
    },
    {
        userId: "6",
        userName: "Boruto Uzumaki",
        role: "NORMAL",
    },
];
