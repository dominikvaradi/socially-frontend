import { FormikHelpers } from "formik";
import React from "react";
import RegisterScreenComponent from "./RegisterScreenComponent";
import * as Yup from "yup";
import { RegisterFormValues } from "../../services/onboardingTypes";

const LoginValidationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("Az mező kitöltése kötelező"),
    lastName: Yup.string().trim().required("Az mező kitöltése kötelező"),
    email: Yup.string().trim().required("Az mező kitöltése kötelező"),
    birthDate: Yup.string().trim().required("A mező kitöltése kötelező"),
    password: Yup.string().trim().required("A mező kitöltése kötelező"),
    passwordConfirm: Yup.string().trim().required("A mező kitöltése kötelező"),
    birthCountry: Yup.string(),
    birthCity: Yup.string(),
    currentCountry: Yup.string(),
    currentCity: Yup.string(),
});

const RegisterScreenContainer = () => {
    const handleSubmit = (values: RegisterFormValues, actions: FormikHelpers<RegisterFormValues>) => {
        setTimeout(() => {
            const email = values.email.trim();
            const password = values.password.trim();

            console.log("login\nEmail: " + email + "\nPassword: " + password);
            actions.resetForm();
        }, 500);
    };

    const handleLoginButtonClick = () => {
        console.log("handleLoginButtonClick");
    };

    return (
        <RegisterScreenComponent
            validationSchema={LoginValidationSchema}
            onSubmit={handleSubmit}
            onLoginButtonClick={handleLoginButtonClick}
        />
    );
};

export default RegisterScreenContainer;
