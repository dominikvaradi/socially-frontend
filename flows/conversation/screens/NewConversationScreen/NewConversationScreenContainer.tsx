import React, { useState } from "react";
import NewConversationScreenComponent from "./NewConversationScreenComponent";
import { ISearchItemUser } from "../../../common/services/commonTypes";

const NewConversationScreenContainer = () => {
    const [searchInputValue, setSearchInputValue] = useState<string>("");
    const [members, setMembers] = useState<ISearchItemUser[]>([]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(event.target.value);
    };

    const handleRemoveUserFromConversationButtonClick = (userId: string) => {
        setMembers((value) => value.filter((member) => member.userId !== userId));
    };

    const handleAddUserToConversationButtonClick = (userId: string) => {
        setMembers((value) => {
            const searchItemToAdd = mockSearchItems.find((si) => si.userId === userId);
            if (!searchItemToAdd) return value;

            const newArray = value.filter((member) => member.userId !== userId);
            newArray.unshift(searchItemToAdd);

            return newArray;
        });
    };

    const handleBackButtonClick = () => {
        console.log("handleBackButtonClick");
    };

    const handleCreateConversationButtonClick = () => {
        console.log("handleCreateConversationButtonClick");
    };

    return (
        <NewConversationScreenComponent
            searchInputValue={searchInputValue}
            onSearchInputChange={handleSearchInputChange}
            members={members}
            searchItems={mockSearchItems}
            onRemoveUserFromConversationButtonClick={handleRemoveUserFromConversationButtonClick}
            onAddUserToConversationButtonClick={handleAddUserToConversationButtonClick}
            searchItemsLoading={false}
            onBackButtonClick={handleBackButtonClick}
            onCreateConversationButtonClick={handleCreateConversationButtonClick}
            createConversationButtonLoading={false}
        />
    );
};

export default NewConversationScreenContainer;

const mockSearchItems: ISearchItemUser[] = [
    {
        userId: "0",
        userName: "Naruto Uzumaki",
    },
    {
        userId: "1",
        userName: "Sasuke Uchiha",
    },
    {
        userId: "2",
        userName: "Hinata Hyuga",
    },
    {
        userId: "3",
        userName: "Hinata Hyuga",
    },
    {
        userId: "4",
        userName: "Hinata Hyuga",
    },
];
