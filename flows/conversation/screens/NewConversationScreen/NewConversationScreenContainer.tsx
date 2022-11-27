import React, { useEffect, useState } from "react";
import NewConversationScreenComponent from "./NewConversationScreenComponent";
import { ISearchItemUser } from "../../../common/services/commonTypes";
import { useConversationContext } from "../../services/conversationContext";
import { useCommonContext } from "../../../common/services/commonContext";

const NewConversationScreenContainer = () => {
    const { store, controller } = useConversationContext();
    const { controller: commonController } = useCommonContext();

    const [searchInputValue, setSearchInputValue] = useState<string>("");
    const [members, setMembers] = useState<ISearchItemUser[]>([]);
    const [searchFired, setSearchFired] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await commonController.initMainLayout();
            await controller.initNewConversationScreen();
        })();
    }, [commonController, controller]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(event.target.value);
    };

    const handleRemoveUserFromConversationButtonClick = (userId: string) => {
        setMembers((value) => value.filter((member) => member.userId !== userId));
    };

    const handleAddUserToConversationButtonClick = (userId: string) => {
        setMembers((value) => {
            const searchItemToAdd = store.newConversationScreenStore.searchItemUsers.find((si) => si.userId === userId);
            if (!searchItemToAdd || value.find((m) => m.userId === userId)) return value;

            const newArray = [...value];
            newArray.unshift(searchItemToAdd);

            return newArray;
        });
    };

    const handleBackButtonClick = () => {
        controller.navigateToConversationsListPage();
    };

    const handleCreateConversationButtonClick = () => {
        if (members.length === 0) return;

        controller.createConversation(members.map((m) => m.userId));
    };

    const handleSearchSubmitButtonClick = () => {
        if (searchInputValue.length === 0) return;

        setSearchFired(true);

        controller.searchFriendsOfCurrentUser(searchInputValue);
    };

    return (
        <NewConversationScreenComponent
            searchInputValue={searchInputValue}
            onSearchInputChange={handleSearchInputChange}
            members={members}
            searchItems={store.newConversationScreenStore.searchItemUsers}
            onRemoveUserFromConversationButtonClick={handleRemoveUserFromConversationButtonClick}
            onAddUserToConversationButtonClick={handleAddUserToConversationButtonClick}
            searchItemsLoading={store.newConversationScreenStore.searchItemUsersLoading}
            onBackButtonClick={handleBackButtonClick}
            onCreateConversationButtonClick={handleCreateConversationButtonClick}
            createConversationButtonLoading={store.newConversationScreenStore.submitting}
            onSearchSubmitButtonClick={handleSearchSubmitButtonClick}
            searchFired={searchFired}
        />
    );
};

export default NewConversationScreenContainer;
