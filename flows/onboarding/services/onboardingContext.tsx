import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import onboardingController, { OnboardingController } from "./onboardingController";
import { defaultOnboardingStore, IOnboardingStore } from "./onboardingStore";
import onboardingStoreService from "./onboardingStoreService";

export type TOnboardingContext = Readonly<{ store: IOnboardingStore; controller: OnboardingController }>;

const OnboardingContext = createContext<TOnboardingContext>({
    store: defaultOnboardingStore,
    controller: onboardingController,
});

export const OnboardingContextProvider = ({ children }: React.PropsWithChildren) => {
    const [store, setStore] = useState<IOnboardingStore>(defaultOnboardingStore);
    const router = useRouter();
    const toast = useToast();

    const storeService = onboardingStoreService;
    storeService.bind(store, setStore);

    const controller = onboardingController;
    controller.bind(store, storeService, router, toast);

    return <OnboardingContext.Provider value={{ store, controller }}>{children}</OnboardingContext.Provider>;
};

export const useOnboardingContext = () => useContext(OnboardingContext);
