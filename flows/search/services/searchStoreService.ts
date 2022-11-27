import BaseStoreService from "../../common/services/BaseStoreService";
import { defaultSearchStore, TSearchStore } from "./searchStore";
import { ISearchItemUser } from "../../common/services/commonTypes";

export class SearchStoreService extends BaseStoreService<TSearchStore> {
    resetStore = () => {
        this.setStore((draftStore) => {
            draftStore = defaultSearchStore;
        });
    };

    setSearchScreenStoreSearchItemUsersLoading = (searchItemUsersLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.searchScreenStore.searchItemUsersLoading = searchItemUsersLoading;
        });
    };

    setSearchScreenStoreSearchItemUsersAndLoadingFalse = (
        searchItemUsers: ISearchItemUser[],
        totalElementCount: number
    ) => {
        this.setStore((draftStore) => {
            draftStore.searchScreenStore.searchItemUsers = searchItemUsers;
            draftStore.searchScreenStore.searchItemUsersTotalElementCount = totalElementCount;
            draftStore.searchScreenStore.searchItemUsersLoading = false;
        });
    };
}

export default new SearchStoreService(defaultSearchStore, () => {
    /* Empty on purpose */
});
