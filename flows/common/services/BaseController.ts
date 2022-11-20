import { AlertStatus, CreateToastFnReturn } from "@chakra-ui/react";
import { NextRouter } from "next/router";
import BaseStoreService from "./BaseStoreService";
import React from "react";

class BaseController<TStore, TStoreService extends BaseStoreService<TStore>> {
    protected store: TStore;

    protected storeService: TStoreService;

    protected router?: NextRouter;

    protected toast?: CreateToastFnReturn;

    constructor(store: TStore, storeService: TStoreService) {
        this.store = store;
        this.storeService = storeService;
    }

    public bind = (store: TStore, storeService: TStoreService, router: NextRouter, toast: CreateToastFnReturn) => {
        this.store = store;
        this.storeService = storeService;
        this.router = router;
        this.toast = toast;
    };

    public showToast = ({
        status,
        title,
        description,
    }: {
        status: AlertStatus;
        title?: React.ReactNode;
        description?: React.ReactNode;
    }) => {
        this.toast?.({
            title: title,
            description: description,
            status: status,
            position: "top",
            isClosable: true,
        });
    };
}

export default BaseController;
