import React from "react";
import LoginScreenComponent from "./LoginScreenComponent";
import * as Yup from "yup";
import { useOnboardingContext } from "../../services/onboardingContext";

const LoginValidationSchema = Yup.object().shape({
    email: Yup.string().trim().required("A mező kitöltése kötelező"),
    password: Yup.string().trim().required("A mező kitöltése kötelező"),
});

const LoginScreenContainer = () => {
    const { controller } = useOnboardingContext();

    const handleSubmit = controller.submitLogin;

    const handleRegisterButtonClick = controller.navigateToRegisterPage;

    return (
        <LoginScreenComponent
            validationSchema={LoginValidationSchema}
            onSubmit={handleSubmit}
            onRegisterButtonClick={handleRegisterButtonClick}
        />
    );
};

export default LoginScreenContainer;
