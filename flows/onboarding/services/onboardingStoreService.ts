import BaseStoreService from "../../common/services/BaseStoreService";
import { defaultOnboardingStore, IOnboardingStore } from "./onboardingStore";

export class OnboardingStoreService extends BaseStoreService<IOnboardingStore> {}

export default new OnboardingStoreService(defaultOnboardingStore, () => {
    /* Empty on purpose */
});
