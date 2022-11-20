import React from "react";
import RegisterScreenComponent from "./RegisterScreenComponent";
import * as Yup from "yup";
import { useOnboardingContext } from "../../services/onboardingContext";

const RegisterValidationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("A mező kitöltése kötelező"),
    lastName: Yup.string().trim().required("A mező kitöltése kötelező"),
    email: Yup.string().trim().required("A mező kitöltése kötelező"),
    birthDate: Yup.date().nullable().required("A mező kitöltése kötelező"),
    password: Yup.string()
        .trim()
        .required("A mező kitöltése kötelező")
        .oneOf([Yup.ref("passwordConfirm")], "A két jelszó mezőnek meg kell egyeznie!"),
    passwordConfirm: Yup.string()
        .trim()
        .required("A mező kitöltése kötelező")
        .oneOf([Yup.ref("password")], "A két jelszó mezőnek meg kell egyeznie!"),
    birthCountry: Yup.string(),
    birthCity: Yup.string(),
    currentCountry: Yup.string(),
    currentCity: Yup.string(),
});

const RegisterScreenContainer = () => {
    const { controller } = useOnboardingContext();

    const handleSubmit = controller.submitRegister;

    const handleLoginButtonClick = controller.navigateToLoginPage;

    return (
        <RegisterScreenComponent
            validationSchema={RegisterValidationSchema}
            onSubmit={handleSubmit}
            onLoginButtonClick={handleLoginButtonClick}
        />
    );
};

export default RegisterScreenContainer;
