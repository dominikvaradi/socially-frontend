import BaseStoreService from "../../common/services/BaseStoreService";
import { defaultCommonStore, ICommonStore } from "./commonStore";
import { IConversation, ISearchItemUser } from "./commonTypes";

export class CommonStoreService extends BaseStoreService<ICommonStore> {
    setHeaderBarSearchPopover = (
        headerBarSearchPopoverSearchItems: ISearchItemUser[],
        headerBarSearchPopoverSearchItemsTotalElementCount: number
    ) => {
        this.setStore((draftStore) => {
            draftStore.headerBarSearchPopoverSearchItems = headerBarSearchPopoverSearchItems;
            draftStore.headerBarSearchPopoverSearchItemsTotalElementCount =
                headerBarSearchPopoverSearchItemsTotalElementCount;
        });
    };

    setHeaderBarSearchPopoverAndLoadingFalse = (
        headerBarSearchPopoverSearchItems: ISearchItemUser[],
        headerBarSearchPopoverSearchItemsTotalElementCount: number
    ) => {
        this.setStore((draftStore) => {
            draftStore.headerBarSearchPopoverSearchItems = headerBarSearchPopoverSearchItems;
            draftStore.headerBarSearchPopoverSearchItemsTotalElementCount =
                headerBarSearchPopoverSearchItemsTotalElementCount;
            draftStore.headerBarSearchPopoverSearchItemsLoading = false;
        });
    };

    setHeaderBarSearchPopoverSearchItemsLoading = (headerBarSearchPopoverSearchItemsLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.headerBarSearchPopoverSearchItemsLoading = headerBarSearchPopoverSearchItemsLoading;
        });
    };

    setLast10Conversations = (last10Conversations: IConversation[]) => {
        this.setStore((draftStore) => {
            draftStore.last10Conversations = last10Conversations;
        });
    };
}

export default new CommonStoreService(defaultCommonStore, () => {
    /* Empty on purpose */
});
