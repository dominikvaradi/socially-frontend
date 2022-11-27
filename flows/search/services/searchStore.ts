import { ISearchScreenStore } from "./searchTypes";

export type TSearchStore = {
    searchScreenStore: ISearchScreenStore;
};

export const defaultSearchStore: TSearchStore = {
    searchScreenStore: {
        searchItemUsers: [],
        searchItemUsersLoading: true,
        searchItemUsersTotalElementCount: 0,
    },
};
