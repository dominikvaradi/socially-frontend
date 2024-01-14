import { FormikHelpers } from "formik";
import BaseController from "../../common/services/BaseController";
import { defaultOnboardingStore, IOnboardingStore } from "./onboardingStore";
import onboardingStoreService, { OnboardingStoreService } from "./onboardingStoreService";
import { LoginFormValues, RegisterFormValues } from "./onboardingTypes";
import { transformLoginFormValues2UserLoginRequestDto } from "./api/transformers/transformLoginFormValues2UserLoginRequestDto";
import tokenStorage from "../../common/tokenStorage";
import { transformRegisterFormValues2UserCreateRequestDto } from "./api/transformers/transformRegisterFormValues2UserCreateRequestDto";
import { onboardingApi } from "./api/onboardingApi";

export class OnboardingController extends BaseController<IOnboardingStore, OnboardingStoreService> {
    submitLogin = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        const response = await onboardingApi.loginUser(transformLoginFormValues2UserLoginRequestDto(values));
        if (response?.status !== 200 || !response?.data.data) {
            let errorToastDescription: string =
                "Váratlan hiba történt bejelentkezés közben, kérjük próbálja meg később.";

            if (response?.data?.messages?.includes("USER_NOT_FOUND")) {
                errorToastDescription = "Felhasználó nem található.";
            } else if (response?.data?.messages?.includes("WRONG_PASSWORD")) {
                errorToastDescription = "Helytelen jelszó.";
            }

            this.showToast({
                title: "Sikertelen bejelentkezés.",
                description: errorToastDescription,
                status: "error",
            });

            actions.setSubmitting(false);

            return;
        }

        tokenStorage.save(
            response.data.data.accessToken.token,
            response.data.data.refreshToken.token,
            response.data.data.userId,
            `${response.data.data.userLastName} ${response.data.data.userFirstName}`
        );

        this.router?.push("/");
        this.showToast({
            title: "Sikeres bejelentkezés.",
            status: "success",
        });

        actions.resetForm();
    };

    navigateToRegisterPage = () => {
        this.router?.push("/register");
    };

    submitRegister = async (values: RegisterFormValues, actions: FormikHelpers<RegisterFormValues>) => {
        const response = await onboardingApi.createUser(transformRegisterFormValues2UserCreateRequestDto(values));
        if (response?.status < 200 || response?.status >= 300 || !response?.data.data) {
            let errorToastDescription: string =
                "Váratlan hiba történt regisztráció közben, kérjük próbálja meg később.";

            if (response?.data?.messages?.includes("USER_ALREADY_EXISTS_WITH_EMAIL")) {
                errorToastDescription = "E-Mail cím foglalt.";
            }

            this.showToast({
                title: "Sikertelen regisztráció.",
                description: errorToastDescription,
                status: "error",
            });

            actions.setSubmitting(false);

            return;
        }

        tokenStorage.save(
            response.data.data.accessToken.token,
            response.data.data.refreshToken.token,
            response.data.data.userId,
            `${response.data.data.userLastName} ${response.data.data.userFirstName}`
        );

        this.router?.push("/");
        this.showToast({
            title: "Sikeres regisztráció.",
            status: "success",
        });

        actions.resetForm();
    };

    navigateToLoginPage = () => {
        this.router?.push("/login");
    };
}

export default new OnboardingController(defaultOnboardingStore, onboardingStoreService);
