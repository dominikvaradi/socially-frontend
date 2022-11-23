import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import commonController, { CommonController } from "./commonController";
import { defaultCommonStore, ICommonStore } from "./commonStore";
import commonStoreService from "./commonStoreService";

export type TCommonContext = Readonly<{ store: ICommonStore; controller: CommonController }>;

const CommonContext = createContext<TCommonContext>({
    store: defaultCommonStore,
    controller: commonController,
});

export const CommonContextProvider = ({ children }: React.PropsWithChildren) => {
    const [store, setStore] = useState<ICommonStore>(defaultCommonStore);
    const router = useRouter();
    const toast = useToast();

    const storeService = commonStoreService;
    storeService.bind(store, setStore);

    const controller = commonController;
    controller.bind(store, storeService, router, toast);

    return <CommonContext.Provider value={{ store, controller }}>{children}</CommonContext.Provider>;
};

export const useCommonContext = () => useContext(CommonContext);
