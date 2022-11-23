import BaseController from "../../common/services/BaseController";
import { defaultCommonStore, ICommonStore } from "./commonStore";
import commonStoreService, { CommonStoreService } from "./commonStoreService";
import tokenStorage from "../tokenStorage";
import { transformUserSearchResponseDto2ISearchItemUser } from "./api/transformers/transformUserSearchResponseDto2ISearchItemUser";
import { transformConversationResponseDto2IConversation } from "./api/transformers/transformConversationResponseDto2IConversation";
import { commonApi } from "./api/commonApi";

export class CommonController extends BaseController<ICommonStore, CommonStoreService> {
    initMainLayout = async () => {
        const response = await commonApi.fetchLast10ConversationsOfUser();
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt az utolsó 10 beszélgetés betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        this.storeService.setLast10Conversations(
            response.data.data.elements.map(transformConversationResponseDto2IConversation)
        );
    };

    logoutCurrentUser = () => {
        tokenStorage.removeAll();
        this.router?.push("/login");
    };

    fetchHeaderBarSearchPopoverSearchItems = async (value: string) => {
        this.storeService.setHeaderBarSearchPopoverSearchItemsLoading(true);

        const response = await commonApi.fetchHeaderBarSearchPopoverSearchItems(value, 0, 3);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt keresés közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setHeaderBarSearchPopoverSearchItemsLoading(false);

            return;
        }

        this.storeService.setHeaderBarSearchPopoverAndLoadingFalse(
            response.data.data.elements.map(transformUserSearchResponseDto2ISearchItemUser),
            response.data.data.totalElements
        );
    };

    clearHeaderBarSearchPopoverSearchItems = () => {
        this.storeService.setHeaderBarSearchPopover([], 0);
    };

    navigateToUserTimelinePage = (userId: string) => {
        this.router?.push(`/user/${userId}`);
    };

    navigateToUserEditPage = () => {
        this.router?.push("/user-edit");
    };

    navigateToConversationPage = (conversationId: string) => {
        this.router?.push(`/conversations/${conversationId}`);
    };

    navigateToCreateNewConversationPage = () => {
        this.router?.push("/new-conversation");
    };

    navigateToHomePage = () => {
        this.router?.push("/");
    };

    navigateToIncomingFriendRequestsPage = () => {
        this.router?.push("/incoming-friend-requests");
    };

    navigateToConversationsPage = () => {
        this.router?.push("/conversations");
    };

    navigateToSearchPage = (searchTerm?: string) => {
        this.router?.push(`/search${searchTerm ? `?searchTerm=${searchTerm}` : ""}`);
    };
}

export default new CommonController(defaultCommonStore, commonStoreService);
