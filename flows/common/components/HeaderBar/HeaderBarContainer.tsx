import React, { useCallback, useEffect, useRef, useState } from "react";
import HeaderBarComponent from "./HeaderBarComponent";
import { useCommonContext } from "../../services/commonContext";
import debounce from "debounce";
import tokenStorage from "../../tokenStorage";

type TProps = {
    lastConversationsExpandButtonRef: React.RefObject<HTMLButtonElement>;
    onLastConversationsExpandButtonClick: () => void;
};

const HeaderBarContainer = ({ lastConversationsExpandButtonRef, onLastConversationsExpandButtonClick }: TProps) => {
    const { store, controller } = useCommonContext();

    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchInputValue, setSearchInputValue] = useState<string>("");
    const [searchPopoverVisible, setSearchPopoverVisible] = useState<boolean>(false);
    const [loggedInUserId, setLoggedInUserId] = useState("");
    const [loggedInUserName, setLoggedInUserName] = useState("Betöltés alatt");

    useEffect(() => {
        const userId = tokenStorage.getUserId();
        const userName = tokenStorage.getUserName();
        if (!userId || !userName) {
            controller.logoutCurrentUser();
            return;
        }

        setLoggedInUserId(userId);
        setLoggedInUserName(userName);
    }, [controller]);

    const handleProfileButtonClick = () => {
        controller.navigateToUserTimelinePage(loggedInUserId);
    };

    const handleEditUserProfileButtonClick = controller.navigateToUserEditPage;

    const handleSignOutButtonClick = controller.logoutCurrentUser;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearchItemFetch = useCallback(debounce(controller.fetchHeaderBarSearchPopoverSearchItems, 500), [
        controller,
    ]);
    const handleSearchInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSearchInputValue(value);

        if (!value) {
            setSearchPopoverVisible(false);
            debouncedSearchItemFetch.clear();
            controller.clearHeaderBarSearchPopoverSearchItems();
            return;
        }

        debouncedSearchItemFetch(value);
        setSearchPopoverVisible(true);
    };

    const handleSearchInputBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        if (event.relatedTarget?.classList.contains("search-popover-class")) {
            return;
        }

        setSearchPopoverVisible(false);
    };

    const handleSearchInputFocus = () => {
        if (searchInputValue.length > 0 && !store.headerBarSearchPopoverSearchItemsLoading) {
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
        controller.navigateToSearchPage(searchInputValue);
    };

    const handleSearchPopoverSearchItemUserClick = controller.navigateToUserTimelinePage;

    const handleHomeButtonClick = controller.navigateToHomePage;

    const handleSearchButtonClick = controller.navigateToSearchPage;

    const handleFriendRequestsButtonClick = controller.navigateToIncomingFriendRequestsPage;

    const handleConversationsButtonClick = controller.navigateToConversationsPage;

    return (
        <HeaderBarComponent
            userName={loggedInUserName}
            lastConversationsExpandButtonRef={lastConversationsExpandButtonRef}
            onLastConversationsExpandButtonClick={onLastConversationsExpandButtonClick}
            onProfileButtonClick={handleProfileButtonClick}
            onEditUserProfileButtonClick={handleEditUserProfileButtonClick}
            onSignOutButtonClick={handleSignOutButtonClick}
            searchInputRef={searchInputRef}
            searchInputValue={searchInputValue}
            onSearchInputChange={handleSearchInputChange}
            onSearchInputBlur={handleSearchInputBlur}
            onSearchInputFocus={handleSearchInputFocus}
            searchPopoverVisible={searchPopoverVisible && !store.headerBarSearchPopoverSearchItemsLoading}
            onSearchPopoverContentBlur={handleSearchPopoverContentBlur}
            searchPopoverSearchItems={store.headerBarSearchPopoverSearchItems}
            searchPopoverShowMoreSearchItemsButtonVisible={
                store.headerBarSearchPopoverSearchItems.length <
                store.headerBarSearchPopoverSearchItemsTotalElementCount
            }
            onSearchPopoverShowMoreSearchItemsButtonClick={handleSearchPopoverShowMoreSearchItemsButtonClick}
            onSearchPopoverSearchItemUserClick={handleSearchPopoverSearchItemUserClick}
            onHomeButtonClick={handleHomeButtonClick}
            onSearchButtonClick={handleSearchButtonClick}
            onFriendRequestsButtonClick={handleFriendRequestsButtonClick}
            onConversationsButtonClick={handleConversationsButtonClick}
        />
    );
};

export default HeaderBarContainer;
