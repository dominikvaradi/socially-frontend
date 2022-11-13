import React, { useRef, useState } from "react";
import HeaderBarComponent from "./HeaderBarComponent";
import { ISearchItemUser } from "../../services/commonTypes";

type TProps = {
    userName: string;
    lastConversationsExpandButtonRef: React.RefObject<HTMLButtonElement>;
    onLastConversationsExpandButtonClick: () => void;
    onProfileButtonClick: () => void;
    onSettingsButtonClick: () => void;
    onSignOutButtonClick: () => void;
};

const HeaderBarContainer = ({
    userName,
    lastConversationsExpandButtonRef,
    onLastConversationsExpandButtonClick,
    onProfileButtonClick,
    onSettingsButtonClick,
    onSignOutButtonClick,
}: TProps) => {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchInputValue, setSearchInputValue] = useState<string>("");
    const [searchPopoverVisible, setSearchPopoverVisible] = useState<boolean>(false);
    const [searchPopoverSearchItems, setSearchPopoverSearchItems] = useState<ISearchItemUser[]>([]);

    const handleSearchInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSearchInputValue(value);

        if (!value) {
            setSearchPopoverVisible(false);
            setSearchPopoverSearchItems([]);
            return;
        }

        const items = await fetchMockSearchItems();
        setSearchPopoverSearchItems(items.items);
        setSearchPopoverVisible(true);
    };

    const handleSearchInputBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        if (event.relatedTarget?.classList.contains("search-popover-class")) {
            return;
        }

        setSearchPopoverVisible(false);
    };

    const handleSearchInputFocus = () => {
        if (searchPopoverSearchItems.length > 0) {
            setSearchPopoverVisible(true);
        }
    };

    const handleSearchPopoverContentBlur = (event: React.FocusEvent<HTMLElement, Element>) => {
        if (event.relatedTarget?.id === searchInputRef.current?.id) {
            return;
        }

        setSearchPopoverVisible(false);
    };

    const handleSearchPopoverShowMoreSearchItemsButtonClick = () => {
        console.log("handleSearchPopoverShowMoreSearchItemsButtonClick");
    };

    const handleSearchPopoverSearchItemUserClick = (userId: string) => {
        console.log("handleSearchPopoverSearchItemUserClick: " + userId);
    };

    const handleHomeButtonClick = () => {
        console.log("handleHomeButtonClick");
    };

    const handleSearchButtonClick = () => {
        console.log("handleSearchButtonClick");
    };

    const handleFriendRequestsButtonClick = () => {
        console.log("handleFriendRequestsButtonClick");
    };

    return (
        <HeaderBarComponent
            userName={userName}
            lastConversationsExpandButtonRef={lastConversationsExpandButtonRef}
            onLastConversationsExpandButtonClick={onLastConversationsExpandButtonClick}
            onProfileButtonClick={onProfileButtonClick}
            onSettingsButtonClick={onSettingsButtonClick}
            onSignOutButtonClick={onSignOutButtonClick}
            searchInputRef={searchInputRef}
            searchInputValue={searchInputValue}
            onSearchInputChange={handleSearchInputChange}
            onSearchInputBlur={handleSearchInputBlur}
            onSearchInputFocus={handleSearchInputFocus}
            searchPopoverVisible={searchPopoverVisible}
            onSearchPopoverContentBlur={handleSearchPopoverContentBlur}
            searchPopoverSearchItems={searchPopoverSearchItems}
            searchPopoverShowMoreSearchItemsButtonVisible={true}
            onSearchPopoverShowMoreSearchItemsButtonClick={handleSearchPopoverShowMoreSearchItemsButtonClick}
            onSearchPopoverSearchItemUserClick={handleSearchPopoverSearchItemUserClick}
            onHomeButtonClick={handleHomeButtonClick}
            onSearchButtonClick={handleSearchButtonClick}
            onFriendRequestsButtonClick={handleFriendRequestsButtonClick}
        />
    );
};

export default HeaderBarContainer;

const fetchMockSearchItems = (): Promise<{
    items: ISearchItemUser[];
    total: number;
}> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const items: ISearchItemUser[] = [
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
            ];

            resolve({
                items,
                total: 10,
            });
        }, 1000);
    });
};
