import React, { useEffect, useState } from "react";
import SearchScreenComponent from "./SearchScreenComponent";
import { ISearchItemUser } from "../../../common/services/commonTypes";
import { useRouter } from "next/router";

const SearchScreenContainer = () => {
    const router = useRouter();

    const [searchInputValue, setSearchInputValue] = useState<string>("");

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        const searchTerm = router.query.searchTerm as string | undefined;
        if (!searchTerm) {
            return;
        }

        setSearchInputValue(searchTerm);
    }, [router]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(event.target.value);
    };

    const handleSearchItemUserClick = (userId: string) => {
        console.log("handleSearchItemUserClick: " + userId);
    };

    const handleLoadMoreSearchItemsButtonClick = () => {
        console.log("handleLoadMoreSearchItemsButtonClick");
    };

    return (
        <SearchScreenComponent
            searchInputValue={searchInputValue}
            onSearchInputChange={handleSearchInputChange}
            searchItems={mockSearchItems}
            onSearchItemUserClick={handleSearchItemUserClick}
            searchItemsLoading={false}
            loadMoreSearchItemsButtonVisible={true}
            onLoadMoreSearchItemsButtonClick={handleLoadMoreSearchItemsButtonClick}
        />
    );
};

export default SearchScreenContainer;

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
    {
        userId: "5",
        userName: "Hinata Hyuga",
    },
    {
        userId: "6",
        userName: "Hinata Hyuga",
    },
    {
        userId: "7",
        userName: "Hinata Hyuga",
    },
    {
        userId: "8",
        userName: "Hinata Hyuga",
    },
    {
        userId: "9",
        userName: "Hinata Hyuga",
    },
    {
        userId: "10",
        userName: "Hinata Hyuga",
    },
    {
        userId: "11",
        userName: "Hinata Hyuga",
    },
    {
        userId: "12",
        userName: "Hinata Hyuga",
    },
    {
        userId: "13",
        userName: "Hinata Hyuga",
    },
    {
        userId: "14",
        userName: "Hinata Hyuga",
    },
    {
        userId: "15",
        userName: "Hinata Hyuga",
    },
];
