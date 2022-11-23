import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import homeController, { HomeController } from "./homeController";
import { defaultHomeStore, THomeStore } from "./homeStore";
import homeStoreService from "./homeStoreService";

export type THomeContext = Readonly<{ store: THomeStore; controller: HomeController }>;

const HomeContext = createContext<THomeContext>({
    store: defaultHomeStore,
    controller: homeController,
});

export const HomeContextProvider = ({ children }: React.PropsWithChildren) => {
    const [store, setStore] = useState<THomeStore>(defaultHomeStore);
    const router = useRouter();
    const toast = useToast();

    const storeService = homeStoreService;
    storeService.bind(store, setStore);

    const controller = homeController;
    controller.bind(store, storeService, router, toast);

    return <HomeContext.Provider value={{ store, controller }}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => useContext(HomeContext);
