import produce from "immer";

class BaseStoreService<TStore> {
    private store: TStore;

    private setStoreFn: (store: TStore) => void;

    constructor(store: TStore, setStoreFn: (store: TStore) => void) {
        this.store = store;
        this.setStoreFn = setStoreFn;
    }

    public bind = (store: TStore, setStoreFn: (store: TStore) => void) => {
        this.store = store;
        this.setStoreFn = setStoreFn;
    };

    public setStore = (commandFn: (draftStore: TStore) => void) => {
        this.store = produce(this.store, commandFn);
        this.setStoreFn(this.store);
    };
}

export default BaseStoreService;
