import React, { createContext, useContext, useState } from "react";
import { defaultSearchStore, TSearchStore } from "./searchStore";
import searchController, { SearchController } from "./searchController";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import searchStoreService from "./searchStoreService";

export type TSearchContext = Readonly<{ store: TSearchStore; controller: SearchController }>;

const SearchContext = createContext<TSearchContext>({
    store: defaultSearchStore,
    controller: searchController,
});

export const SearchContextProvider = ({ children }: React.PropsWithChildren) => {
    const [store, setStore] = useState<TSearchStore>(defaultSearchStore);
    const router = useRouter();
    const toast = useToast();

    const storeService = searchStoreService;
    storeService.bind(store, setStore);

    const controller = searchController;
    controller.bind(store, storeService, router, toast);

    return <SearchContext.Provider value={{ store, controller }}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => useContext(SearchContext);
