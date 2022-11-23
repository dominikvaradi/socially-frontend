import { IConversation, ISearchItemUser } from "./commonTypes";

export interface ICommonStore {
    headerBarSearchPopoverSearchItems: ISearchItemUser[];
    headerBarSearchPopoverSearchItemsLoading: boolean;
    headerBarSearchPopoverSearchItemsTotalElementCount: number;
    last10Conversations: IConversation[];
}

export const defaultCommonStore: ICommonStore = {
    headerBarSearchPopoverSearchItems: [],
    headerBarSearchPopoverSearchItemsLoading: false,
    headerBarSearchPopoverSearchItemsTotalElementCount: 0,
    last10Conversations: [],
};
