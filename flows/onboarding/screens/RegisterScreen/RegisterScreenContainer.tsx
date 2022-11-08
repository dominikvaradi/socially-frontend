import { FormikHelpers } from "formik";
import React from "react";
import RegisterScreenComponent from "./RegisterScreenComponent";
import * as Yup from "yup";
import { RegisterFormValues } from "../../services/onboardingTypes";

const LoginValidationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("Az mező kitöltése kötelező"),
    lastName: Yup.string().trim().required("Az mező kitöltése kötelező"),
    email: Yup.string().trim().required("Az mező kitöltése kötelező"),
    birthDate: Yup.date().nullable().required("Az mező kitöltése kötelező"),
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
            console.log("register\n" + JSON.stringify(values, null, 2));
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
