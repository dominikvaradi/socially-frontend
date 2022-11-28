import React, { useEffect, useState } from "react";
import ConversationMembersScreenComponent from "./ConversationMembersScreenComponent";
import { IConversationMember, TConversationRole } from "../../services/conversationTypes";
import { useConversationContext } from "../../services/conversationContext";
import { useCommonContext } from "../../../common/services/commonContext";
import { useRouter } from "next/router";

const ConversationMembersScreenContainer = () => {
    const router = useRouter();
    const { store, controller } = useConversationContext();
    const { controller: commonController } = useCommonContext();

    useEffect(() => {
        if (!router.isReady) return;

        (async () => {
            await commonController.initMainLayout();
            await controller.initConversationMembersScreen(router.query.conversationId as string);
        })();
    }, [controller, commonController, router]);

    const [changeConversationRoleAlertDialogMember, setChangeConversationRoleAlertDialogMember] = useState<
        IConversationMember | undefined
    >(undefined);
    const [changeConversationRoleAlertDialogRole, setChangeConversationRoleAlertDialogRole] = useState<
        TConversationRole | undefined
    >(undefined);
    const [
        changeConversationRoleAlertDialogConfirmButtonLoading,
        setChangeConversationRoleAlertDialogConfirmButtonLoading,
    ] = useState<boolean>(false);

    const [removeMemberFromConversationAlertDialogMember, setRemoveMemberFromConversationAlertDialogMember] = useState<
        IConversationMember | undefined
    >(undefined);
    const [
        removeMemberFromConversationAlertDialogConfirmButtonLoading,
        setRemoveMemberFromConversationAlertDialogConfirmButtonLoading,
    ] = useState<boolean>(false);

    const handleUserProfileClick = (userId: string) => {
        controller.navigateToUserTimelinePage(userId);
    };

    const handleChangeMemberMenuItemButtonClick = (member: IConversationMember, role: TConversationRole) => {
        setChangeConversationRoleAlertDialogMember(member);
        setChangeConversationRoleAlertDialogRole(role);
    };

    const handleChangeConversationRoleAlertDialogClose = () => {
        setChangeConversationRoleAlertDialogMember(undefined);
        setChangeConversationRoleAlertDialogRole(undefined);
    };

    const handleChangeConversationRoleAlertDialogConfirmButtonClick = async () => {
        if (!changeConversationRoleAlertDialogMember || !changeConversationRoleAlertDialogRole) return;

        setChangeConversationRoleAlertDialogConfirmButtonLoading(true);

        await controller.changeConversationRoleOfMember(
            changeConversationRoleAlertDialogMember,
            changeConversationRoleAlertDialogRole
        );

        setChangeConversationRoleAlertDialogMember(undefined);
        setChangeConversationRoleAlertDialogRole(undefined);
        setChangeConversationRoleAlertDialogConfirmButtonLoading(false);
    };

    const handleBackButtonClick = () => {
        if (!store.conversationMembersScreenStore.conversation) return;

        controller.navigateToConversationPage(store.conversationMembersScreenStore.conversation.id);
    };

    const handleRemoveUserFromConversationButtonClick = (member: IConversationMember) => {
        setRemoveMemberFromConversationAlertDialogMember(member);
    };

    const handleRemoveMemberFromConversationAlertDialogClose = () => {
        setRemoveMemberFromConversationAlertDialogMember(undefined);
    };

    const handleRemoveMemberFromConversationAlertDialogConfirmButtonClick = async () => {
        if (!removeMemberFromConversationAlertDialogMember) return;

        setRemoveMemberFromConversationAlertDialogConfirmButtonLoading(true);

        await controller.removeMemberOfConversation(removeMemberFromConversationAlertDialogMember);

        setRemoveMemberFromConversationAlertDialogMember(undefined);
        setRemoveMemberFromConversationAlertDialogConfirmButtonLoading(false);
    };

    const handleAddUsersToConversationButtonClick = () => {
        if (!store.conversationMembersScreenStore.conversation) return;

        controller.navigateToAddUsersToConversationPage(store.conversationMembersScreenStore.conversation.id);
    };

    return (
        <ConversationMembersScreenComponent
            members={store.conversationMembersScreenStore.conversation?.members ?? []}
            onUserProfileClick={handleUserProfileClick}
            groupConversation={store.conversationMembersScreenStore.conversation?.type === "GROUP"}
            userRoleAdmin={store.conversationMembersScreenStore.userRoleAdmin}
            onChangeMemberMenuItemButtonClick={handleChangeMemberMenuItemButtonClick}
            changeConversationRoleAlertDialogVisible={
                !!changeConversationRoleAlertDialogMember && !!changeConversationRoleAlertDialogRole
            }
            onChangeConversationRoleAlertDialogClose={handleChangeConversationRoleAlertDialogClose}
            onChangeConversationRoleAlertDialogConfirmButtonClick={
                handleChangeConversationRoleAlertDialogConfirmButtonClick
            }
            changeConversationRoleAlertDialogConfirmButtonLoading={
                changeConversationRoleAlertDialogConfirmButtonLoading
            }
            onBackButtonClick={handleBackButtonClick}
            onRemoveUserFromConversationButtonClick={handleRemoveUserFromConversationButtonClick}
            removeMemberFromConversationAlertDialogVisible={!!removeMemberFromConversationAlertDialogMember}
            onRemoveMemberFromConversationAlertDialogClose={handleRemoveMemberFromConversationAlertDialogClose}
            onRemoveMemberFromConversationAlertDialogConfirmButtonClick={
                handleRemoveMemberFromConversationAlertDialogConfirmButtonClick
            }
            removeMemberFromConversationAlertDialogConfirmButtonLoading={
                removeMemberFromConversationAlertDialogConfirmButtonLoading
            }
            onAddUsersToConversationButtonClick={handleAddUsersToConversationButtonClick}
        />
    );
};

export default ConversationMembersScreenContainer;
