import React, { useEffect, useState } from "react";
import UserEditScreenComponent from "./UserEditScreenComponent";
import * as Yup from "yup";
import { UserEditFormValues } from "../../services/userTypes";
import { FormikHelpers } from "formik";

const UserEditValidationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("A mező kitöltése kötelező"),
    lastName: Yup.string().trim().required("A mező kitöltése kötelező"),
    birthDate: Yup.date().nullable().required("A mező kitöltése kötelező"),
    birthCountry: Yup.string(),
    birthCity: Yup.string(),
    currentCountry: Yup.string(),
    currentCity: Yup.string(),
});

const UserEditScreenContainer = () => {
    const [formikInitialValues, setFormikInitialValues] = useState<UserEditFormValues>({
        firstName: "",
        lastName: "",
        birthDate: new Date(),
        birthCountry: "",
        birthCity: "",
        currentCountry: "",
        currentCity: "",
    });

    useEffect(() => {
        setTimeout(() => {
            setFormikInitialValues({
                firstName: "teszt",
                lastName: "teszt",
                birthDate: new Date("2022-05-19"),
                birthCountry: "teszt",
                birthCity: "teszt",
                currentCountry: "teszt",
                currentCity: "teszt",
            });
        }, 50);
    }, []);

    const handleSubmit = (values: UserEditFormValues, actions: FormikHelpers<UserEditFormValues>) => {
        setTimeout(() => {
            console.log("user-edit\n" + JSON.stringify(values, null, 2));
            actions.resetForm();
        }, 500);
    };

    return (
        <UserEditScreenComponent
            formikInitialValues={formikInitialValues}
            validationSchema={UserEditValidationSchema}
            onSubmit={handleSubmit}
        />
    );
};

export default UserEditScreenContainer;
