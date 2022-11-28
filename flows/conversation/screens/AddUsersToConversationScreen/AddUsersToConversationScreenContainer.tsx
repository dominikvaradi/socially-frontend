import React, { useEffect, useState } from "react";
import AddUsersToConversationScreen from "./AddUsersToConversationScreenComponent";
import { ISearchItemUser } from "../../../common/services/commonTypes";
import { useConversationContext } from "../../services/conversationContext";
import { useCommonContext } from "../../../common/services/commonContext";
import { useRouter } from "next/router";

const AddUsersToConversationScreenContainer = () => {
    const router = useRouter();
    const { store, controller } = useConversationContext();
    const { controller: commonController } = useCommonContext();

    const [searchInputValue, setSearchInputValue] = useState<string>("");
    const [members, setMembers] = useState<ISearchItemUser[]>([]);
    const [searchFired, setSearchFired] = useState<boolean>(false);

    useEffect(() => {
        if (!router.isReady) return;

        (async () => {
            await commonController.initMainLayout();
            await controller.initAddUsersToConversationScreen(router.query.conversationId as string);
        })();
    }, [controller, commonController, router]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(event.target.value);
    };

    const handleRemoveUserFromConversationButtonClick = (userId: string) => {
        setMembers((value) => value.filter((member) => member.userId !== userId));
    };

    const handleAddUserToConversationButtonClick = (userId: string) => {
        setMembers((value) => {
            const searchItemToAdd = store.addUsersToConversationScreenStore.searchItemUsers.find(
                (si) => si.userId === userId
            );
            if (!searchItemToAdd || value.find((m) => m.userId === userId)) return value;

            const newArray = [...value];
            newArray.unshift(searchItemToAdd);

            return newArray;
        });
    };

    const handleBackButtonClick = () => {
        if (!store.addUsersToConversationScreenStore.conversation) return;

        controller.navigateToConversationMembersPage(store.addUsersToConversationScreenStore.conversation.id);
    };

    const handleCreateConversationButtonClick = () => {
        if (members.length === 0) return;

        controller.addUsersToConversation(members.map((m) => m.userId));
    };

    const handleSearchSubmitButtonClick = () => {
        if (searchInputValue.length === 0) return;

        setSearchFired(true);

        controller.addUsersToConversationScreenSearchFriendsOfCurrentUser(searchInputValue);
    };

    return (
        <AddUsersToConversationScreen
            searchInputValue={searchInputValue}
            onSearchInputChange={handleSearchInputChange}
            members={members}
            searchItems={store.addUsersToConversationScreenStore.searchItemUsers}
            onRemoveUserFromConversationButtonClick={handleRemoveUserFromConversationButtonClick}
            onAddUserToConversationButtonClick={handleAddUserToConversationButtonClick}
            searchItemsLoading={store.addUsersToConversationScreenStore.searchItemUsersLoading}
            onBackButtonClick={handleBackButtonClick}
            onAddUsersToConversationButtonClick={handleCreateConversationButtonClick}
            addUsersToConversationConversationButtonLoading={store.addUsersToConversationScreenStore.submitting}
            onSearchSubmitButtonClick={handleSearchSubmitButtonClick}
            searchFired={searchFired}
        />
    );
};

export default AddUsersToConversationScreenContainer;
