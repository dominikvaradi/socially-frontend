import React from "react";
import LoginScreenComponent from "./LoginScreenComponent";
import * as Yup from "yup";
import { useOnboardingContext } from "../../services/onboardingContext";
import { LoginFormValues } from "../../services/onboardingTypes";
import { FormikHelpers } from "formik";

const LoginValidationSchema = Yup.object().shape({
    email: Yup.string().trim().required("A mező kitöltése kötelező"),
    password: Yup.string().trim().required("A mező kitöltése kötelező"),
});

const LoginScreenContainer = () => {
    const { controller } = useOnboardingContext();

    const handleSubmit = (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        controller.submitLogin(values, actions);
    };

    const handleRegisterButtonClick = () => {
        controller.navigateToRegisterPage();
    };

    return (
        <LoginScreenComponent
            validationSchema={LoginValidationSchema}
            onSubmit={handleSubmit}
            onRegisterButtonClick={handleRegisterButtonClick}
        />
    );
};

export default LoginScreenContainer;
