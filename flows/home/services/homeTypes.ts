import { IPost, IReactionListItem } from "../../common/services/commonTypes";

export interface IHomeFeedScreenStore {
    posts: IPost[];
    postsLoading: boolean;
    postsTotalElementCount: number;
    reactionListReactionItems: IReactionListItem[];
    reactionListReactionItemsLoading: boolean;
    reactionListReactionItemsTotalElementCount: number;
}
