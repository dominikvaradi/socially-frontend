import React, { useEffect } from "react";
import UserEditScreenComponent from "./UserEditScreenComponent";
import * as Yup from "yup";
import { UserEditFormValues } from "../../services/userTypes";
import { FormikHelpers } from "formik";
import { useUserContext } from "../../services/userContext";
import { useCommonContext } from "../../../common/services/commonContext";

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
    const { controller: commonController } = useCommonContext();
    const { store, controller } = useUserContext();

    useEffect(() => {
        (async () => {
            await commonController.initMainLayout();
            await controller.initEditScreen();
        })();
    }, [controller, commonController]);

    const handleSubmit = async (values: UserEditFormValues, actions: FormikHelpers<UserEditFormValues>) => {
        const result = await controller.editUser(values, actions);
        if (!result) return;

        await commonController.initMainLayout();
    };

    return (
        <UserEditScreenComponent
            formikInitialValues={store.editScreenStore.userEditFormValues}
            validationSchema={UserEditValidationSchema}
            onSubmit={handleSubmit}
        />
    );
};

export default UserEditScreenContainer;
