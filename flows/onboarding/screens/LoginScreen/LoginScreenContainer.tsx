import { FormikHelpers } from "formik";
import React from "react";
import { LoginFormValues } from "../../services/onboardingTypes";
import LoginScreenComponent from "./LoginScreenComponent";
import * as Yup from "yup";

const LoginValidationSchema = Yup.object().shape({
    email: Yup.string().trim().required("Az mező kitöltése kötelező"),
    password: Yup.string().trim().required("A mező kitöltése kötelező"),
});

const LoginScreenContainer = () => {
    const handleSubmit = (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        setTimeout(() => {
            const email = values.email.trim();
            const password = values.password.trim();

            console.log("login\nEmail: " + email + "\nPassword: " + password);
            actions.resetForm();
        }, 500);
    };

    const handleRegisterButtonClick = () => {
        console.log("handleRegisterButtonClick");
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
