import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import { defaultFriendRequestStore, TFriendRequestStore } from "./friendRequestStore";
import friendRequestController, { FriendRequestController } from "./friendRequestController";
import friendRequestStoreService from "./friendRequestStoreService";

export type TFriendRequestContext = Readonly<{ store: TFriendRequestStore; controller: FriendRequestController }>;

const FriendRequestContext = createContext<TFriendRequestContext>({
    store: defaultFriendRequestStore,
    controller: friendRequestController,
});

export const FriendRequestContextProvider = ({ children }: React.PropsWithChildren) => {
    const [store, setStore] = useState<TFriendRequestStore>(defaultFriendRequestStore);
    const router = useRouter();
    const toast = useToast();

    const storeService = friendRequestStoreService;
    storeService.bind(store, setStore);

    const controller = friendRequestController;
    controller.bind(store, storeService, router, toast);

    return <FriendRequestContext.Provider value={{ store, controller }}>{children}</FriendRequestContext.Provider>;
};

export const useFriendRequestContext = () => useContext(FriendRequestContext);
