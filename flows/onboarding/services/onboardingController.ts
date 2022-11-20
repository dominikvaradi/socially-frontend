import { FormikHelpers } from "formik";
import BaseController from "../../common/services/BaseController";
import { defaultOnboardingStore, IOnboardingStore } from "./onboardingStore";
import onboardingStoreService, { OnboardingStoreService } from "./onboardingStoreService";
import { LoginFormValues, RegisterFormValues } from "./onboardingTypes";
import { authApi } from "../../common/services/apiHandler";
import { transformLoginFormValues2UserLoginRequestDto } from "./apiTransformers/transformLoginFormValues2UserLoginRequestDto";
import tokenStorage from "../../common/services/tokenStorage";
import { transformRegisterFormValues2UserCreateRequestDto } from "./apiTransformers/transformRegisterFormValues2UserCreateRequestDto";

export class OnboardingController extends BaseController<IOnboardingStore, OnboardingStoreService> {
    submitLogin = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        const requestBody = transformLoginFormValues2UserLoginRequestDto(values);

        try {
            const response = await authApi(false).loginUser(requestBody);
            if (!response || !response.data.data) {
                this.showToast({
                    title: "Váratlan hiba történt bejelentkezés közben, kérjük próbálja meg később.",
                    description: "",
                    status: "error",
                });

                actions.setSubmitting(false);

                return;
            }

            tokenStorage.save(
                response.data.data.accessToken.token,
                response.data.data.refreshToken.token,
                response.data.data.userId,
                response.data.data.userName
            );

            this.router?.push("/");
            this.showToast({
                title: "Sikeres bejelentkezés.",
                status: "success",
            });

            actions.resetForm();
        } catch (error: any) {
            let toastDescription: string = "Váratlan hiba történt bejelentkezés közben, kérjük próbálja meg később.";

            if (error?.response?.data?.messages?.includes("USER_NOT_FOUND")) {
                toastDescription = "Felhasználó nem található.";
            } else if (error?.response?.data?.messages?.includes("WRONG_PASSWORD")) {
                toastDescription = "Helytelen jelszó.";
            }

            this.showToast({
                title: "Sikertelen bejelentkezés.",
                description: toastDescription,
                status: "error",
            });

            actions.setSubmitting(false);
        }
    };

    navigateToRegisterPage = () => {
        this.router?.push("/register");
    };

    submitRegister = async (values: RegisterFormValues, actions: FormikHelpers<RegisterFormValues>) => {
        const requestBody = transformRegisterFormValues2UserCreateRequestDto(values);

        try {
            const response = await authApi(false).createUser(requestBody);
            if (!response || !response.data.data) {
                this.showToast({
                    title: "Váratlan hiba történt regisztráció közben, kérjük próbálja meg később.",
                    description: "",
                    status: "error",
                });

                actions.setSubmitting(false);

                return;
            }

            this.router?.push("/login");
            this.showToast({
                title: "Sikeres regisztráció.",
                status: "success",
            });

            actions.resetForm();
        } catch (error) {
            let toastDescription: string = "Váratlan hiba történt regisztráció közben, kérjük próbálja meg később.";

            this.showToast({
                title: "Sikertelen regisztráció.",
                description: toastDescription,
                status: "error",
            });

            actions.setSubmitting(false);
        }
    };

    navigateToLoginPage = () => {
        this.router?.push("/login");
    };
}

export default new OnboardingController(defaultOnboardingStore, onboardingStoreService);
