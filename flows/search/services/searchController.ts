import BaseController from "../../common/services/BaseController";
import { defaultSearchStore, TSearchStore } from "./searchStore";
import searchStoreService, { SearchStoreService } from "./searchStoreService";
import { transformUserSearchResponseDto2ISearchItemUser } from "../../common/services/api/transformers/transformUserSearchResponseDto2ISearchItemUser";
import { searchApi } from "./api/searchApi";

const SEARCH_ITEM_USERS_FETCH_SIZE = 10;

export class SearchController extends BaseController<TSearchStore, SearchStoreService> {
    initSearchScreen = async (searchTerm?: string) => {
        if (!searchTerm) {
            this.storeService.setSearchScreenStoreSearchItemUsersAndLoadingFalse([], 0);

            return;
        }

        this.fetchSearchItemUsers(searchTerm);
    };

    fetchSearchItemUsers = async (searchTerm: string) => {
        this.storeService.resetStore();

        const response = await searchApi.fetchSearchItemUsers(searchTerm, 0, SEARCH_ITEM_USERS_FETCH_SIZE);
        if (response?.status !== 200 || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt keresés közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setSearchScreenStoreSearchItemUsersLoading(false);

            return;
        }

        this.storeService.setSearchScreenStoreSearchItemUsersAndLoadingFalse(
            response.data.data.elements.map(transformUserSearchResponseDto2ISearchItemUser),
            response.data.data.totalElements
        );
    };

    loadMoreSearchItemUsers = async (searchTerm: string) => {
        this.storeService.setSearchScreenStoreSearchItemUsersLoading(true);

        const response = await searchApi.fetchSearchItemUsers(
            searchTerm,
            Math.floor(Math.floor(this.store.searchScreenStore.searchItemUsers.length / SEARCH_ITEM_USERS_FETCH_SIZE)),
            SEARCH_ITEM_USERS_FETCH_SIZE
        );
        if (response?.status !== 200 || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt keresés közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setSearchScreenStoreSearchItemUsersLoading(false);

            return;
        }

        const newSearchItemUsers = [
            ...this.store.searchScreenStore.searchItemUsers,
            ...response.data.data.elements
                .filter(
                    (userSearchResponseDto) =>
                        !this.store.searchScreenStore.searchItemUsers.find(
                            (si) => si.userId === userSearchResponseDto.id
                        )
                )
                .map(transformUserSearchResponseDto2ISearchItemUser),
        ];

        this.storeService.setSearchScreenStoreSearchItemUsersAndLoadingFalse(
            newSearchItemUsers,
            response.data.data.totalElements
        );
    };

    navigateToUserTimelineScreen = (userId: string) => {
        this.router?.push(`/user/${userId}`);
    };
}

export default new SearchController(defaultSearchStore, searchStoreService);
