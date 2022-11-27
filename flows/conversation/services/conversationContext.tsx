import React, { createContext, useContext, useState } from "react";
import { defaultConversationStore, TConversationStore } from "./conversationStore";
import conversationController, { ConversationController } from "./conversationController";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import conversationStoreService from "./conversationStoreService";

export type TConversationContext = Readonly<{ store: TConversationStore; controller: ConversationController }>;

const ConversationContext = createContext<TConversationContext>({
    store: defaultConversationStore,
    controller: conversationController,
});

export const ConversationContextProvider = ({ children }: React.PropsWithChildren) => {
    const [store, setStore] = useState<TConversationStore>(defaultConversationStore);
    const router = useRouter();
    const toast = useToast();

    const storeService = conversationStoreService;
    storeService.bind(store, setStore);

    const controller = conversationController;
    controller.bind(store, storeService, router, toast);

    return <ConversationContext.Provider value={{ store, controller }}>{children}</ConversationContext.Provider>;
};

export const useConversationContext = () => useContext(ConversationContext);
