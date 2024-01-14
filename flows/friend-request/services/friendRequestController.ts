import { defaultFriendRequestStore, TFriendRequestStore } from "./friendRequestStore";
import friendRequestStoreService, { FriendRequestStoreService } from "./friendRequestStoreService";
import BaseController from "../../common/services/BaseController";
import { friendRequestApi } from "./api/friendRequestApi";
import { transformFriendRequestIncomingResponseDto2IFriendRequestItem } from "./api/transformers/transformFriendRequestIncomingResponseDto2IFriendRequestItem";
import { transformFriendRequestOutgoingResponseDto2IFriendRequestItem } from "./api/transformers/transformFriendRequestOutgoingResponseDto2IFriendRequestItem";

const FRIEND_REQUESTS_FETCH_SIZE = 10;

export class FriendRequestController extends BaseController<TFriendRequestStore, FriendRequestStoreService> {
    initIncomingFriendRequestsScreen = async () => {
        this.storeService.resetStore();

        const response = await friendRequestApi.fetchIncomingFriendRequests(0, FRIEND_REQUESTS_FETCH_SIZE);
        if (response?.status !== 200 || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a bejövő barát-kérelmek betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setIncomingFriendRequestsScreenFriendRequestItemsLoading(false);

            return;
        }

        this.storeService.setIncomingFriendRequestsScreenFriendRequestItemsAndLoadingFalse(
            response.data.data.elements.map(transformFriendRequestIncomingResponseDto2IFriendRequestItem),
            response.data.data.totalElements
        );
    };

    loadMoreIncomingFriendRequests = async () => {
        this.storeService.setIncomingFriendRequestsScreenFriendRequestItemsLoading(true);

        const response = await friendRequestApi.fetchIncomingFriendRequests(
            Math.floor(
                this.store.incomingFriendRequestsScreenStore.friendRequestItems.length / FRIEND_REQUESTS_FETCH_SIZE
            ),
            FRIEND_REQUESTS_FETCH_SIZE
        );
        if (response?.status !== 200 || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a bejövő barát-kérelmek betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setIncomingFriendRequestsScreenFriendRequestItemsLoading(false);

            return;
        }

        const newFriendRequestItems = [
            ...this.store.incomingFriendRequestsScreenStore.friendRequestItems,
            ...response.data.data.elements
                .filter(
                    (friendRequestIncomingResponseDto) =>
                        !this.store.incomingFriendRequestsScreenStore.friendRequestItems.find(
                            (fr) => fr.id === friendRequestIncomingResponseDto.id
                        )
                )
                .map(transformFriendRequestIncomingResponseDto2IFriendRequestItem),
        ];

        this.storeService.setIncomingFriendRequestsScreenFriendRequestItemsAndLoadingFalse(
            newFriendRequestItems,
            response.data.data.totalElements
        );
    };

    initOutgoingFriendRequestsScreen = async () => {
        this.storeService.resetStore();

        const response = await friendRequestApi.fetchOutgoingFriendRequests(0, FRIEND_REQUESTS_FETCH_SIZE);
        if (response?.status !== 200 || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a kimenő barát-kérelmek betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setOutgoingFriendRequestsScreenFriendRequestItemsLoading(false);

            return;
        }

        this.storeService.setOutgoingFriendRequestsScreenFriendRequestItemsAndLoadingFalse(
            response.data.data.elements.map(transformFriendRequestOutgoingResponseDto2IFriendRequestItem),
            response.data.data.totalElements
        );
    };

    loadMoreOutgoingFriendRequests = async () => {
        this.storeService.setOutgoingFriendRequestsScreenFriendRequestItemsLoading(true);

        const response = await friendRequestApi.fetchOutgoingFriendRequests(
            Math.floor(
                this.store.outgoingFriendRequestsScreenStore.friendRequestItems.length / FRIEND_REQUESTS_FETCH_SIZE
            ),
            FRIEND_REQUESTS_FETCH_SIZE
        );
        if (response?.status !== 200 || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a kimenő barát-kérelmek betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setOutgoingFriendRequestsScreenFriendRequestItemsLoading(false);

            return;
        }

        const newFriendRequestItems = [
            ...this.store.outgoingFriendRequestsScreenStore.friendRequestItems,
            ...response.data.data.elements
                .filter(
                    (friendRequestOutgoingResponseDto) =>
                        !this.store.outgoingFriendRequestsScreenStore.friendRequestItems.find(
                            (fr) => fr.id === friendRequestOutgoingResponseDto.id
                        )
                )
                .map(transformFriendRequestOutgoingResponseDto2IFriendRequestItem),
        ];

        this.storeService.setOutgoingFriendRequestsScreenFriendRequestItemsAndLoadingFalse(
            newFriendRequestItems,
            response.data.data.totalElements
        );
    };

    acceptIncomingFriendRequest = async (friendRequestId: string) => {
        const response = await friendRequestApi.acceptIncomingFriendRequest(friendRequestId);
        if (response?.status !== 200) {
            this.showToast({
                title: "Váratlan hiba történt a barát-kérelem elfogadása közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const newFriendRequestItems = this.store.incomingFriendRequestsScreenStore.friendRequestItems.filter(
            (fr) => fr.id !== friendRequestId
        );

        this.storeService.setIncomingFriendRequestsScreenFriendRequestItems(
            newFriendRequestItems,
            this.store.incomingFriendRequestsScreenStore.friendRequestItemsTotalElementCount - 1
        );
    };

    declineIncomingFriendRequest = async (friendRequestId: string) => {
        const response = await friendRequestApi.declineIncomingFriendRequest(friendRequestId);
        if (response?.status !== 200) {
            this.showToast({
                title: "Váratlan hiba történt a barát-kérelem elutasítása közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const newFriendRequestItems = this.store.incomingFriendRequestsScreenStore.friendRequestItems.filter(
            (fr) => fr.id !== friendRequestId
        );

        this.storeService.setIncomingFriendRequestsScreenFriendRequestItems(
            newFriendRequestItems,
            this.store.incomingFriendRequestsScreenStore.friendRequestItemsTotalElementCount - 1
        );
    };

    revokeOutgoingFriendRequest = async (friendRequestId: string) => {
        const response = await friendRequestApi.revokeOutgoingFriendRequest(friendRequestId);
        if (response?.status !== 200) {
            this.showToast({
                title: "Váratlan hiba történt a barát-kérelem visszautasítása közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const newFriendRequestItems = this.store.outgoingFriendRequestsScreenStore.friendRequestItems.filter(
            (fr) => fr.id !== friendRequestId
        );

        this.storeService.setOutgoingFriendRequestsScreenFriendRequestItems(
            newFriendRequestItems,
            this.store.outgoingFriendRequestsScreenStore.friendRequestItemsTotalElementCount - 1
        );
    };

    navigateToUserTimelinePage = (userId: string) => {
        this.router?.push(`/user/${userId}`);
    };

    navigateToIncomingFriendRequestsPage = () => {
        this.router?.push("/incoming-friend-requests");
    };

    navigateToOutgoingFriendRequestsPage = () => {
        this.router?.push("/outgoing-friend-requests");
    };
}

export default new FriendRequestController(defaultFriendRequestStore, friendRequestStoreService);
