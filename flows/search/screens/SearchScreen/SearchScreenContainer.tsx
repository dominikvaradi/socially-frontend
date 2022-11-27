import React, { useEffect, useState } from "react";
import SearchScreenComponent from "./SearchScreenComponent";
import { useRouter } from "next/router";
import { useSearchContext } from "../../services/searchContext";
import { useCommonContext } from "../../../common/services/commonContext";

const SearchScreenContainer = () => {
    const router = useRouter();
    const { controller: commonController } = useCommonContext();
    const { store, controller } = useSearchContext();

    const [searchInputValue, setSearchInputValue] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
    const [searchFired, setSearchFired] = useState<boolean>(false);

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        const searchTerm = router.query.searchTerm as string | undefined;

        setSearchInputValue(searchTerm ?? "");
        setSearchTerm(searchTerm);
        if (searchTerm) {
            setSearchFired(true);
        }

        (async () => {
            await commonController.initMainLayout();
            await controller.initSearchScreen(searchTerm || undefined);
        })();
    }, [commonController, controller, router]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(event.target.value);
    };

    const handleSearchItemUserClick = (userId: string) => {
        controller.navigateToUserTimelineScreen(userId);
    };

    const handleLoadMoreSearchItemsButtonClick = () => {
        if (!searchTerm) return;

        controller.loadMoreSearchItemUsers(searchTerm);
    };

    const handleSearchSubmitButtonClick = () => {
        if (searchInputValue.length == 0) return;

        setSearchTerm(searchInputValue);
        setSearchFired(true);
        controller.fetchSearchItemUsers(searchInputValue);
    };

    return (
        <SearchScreenComponent
            searchFired={searchFired}
            searchInputValue={searchInputValue}
            onSearchInputChange={handleSearchInputChange}
            searchItems={store.searchScreenStore.searchItemUsers}
            onSearchItemUserClick={handleSearchItemUserClick}
            searchItemsLoading={store.searchScreenStore.searchItemUsersLoading}
            loadMoreSearchItemsButtonVisible={
                store.searchScreenStore.searchItemUsers.length <
                store.searchScreenStore.searchItemUsersTotalElementCount
            }
            onLoadMoreSearchItemsButtonClick={handleLoadMoreSearchItemsButtonClick}
            onSearchSubmitButtonClick={handleSearchSubmitButtonClick}
        />
    );
};

export default SearchScreenContainer;
