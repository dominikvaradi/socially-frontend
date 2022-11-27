import { ISearchItemUser } from "../../common/services/commonTypes";

export interface ISearchScreenStore {
    searchItemUsers: ISearchItemUser[];
    searchItemUsersLoading: boolean;
    searchItemUsersTotalElementCount: number;
}
