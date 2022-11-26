import { defaultUserStore, TUserStore } from "./userStore";
import userController, { UserController } from "./userController";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import userStoreService from "./userStoreService";

export type TUserContext = Readonly<{ store: TUserStore; controller: UserController }>;

const UserContext = createContext<TUserContext>({
    store: defaultUserStore,
    controller: userController,
});

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
    const [store, setStore] = useState<TUserStore>(defaultUserStore);
    const router = useRouter();
    const toast = useToast();

    const storeService = userStoreService;
    storeService.bind(store, setStore);

    const controller = userController;
    controller.bind(store, storeService, router, toast);

    return <UserContext.Provider value={{ store, controller }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
