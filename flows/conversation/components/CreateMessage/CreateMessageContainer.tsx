import React from "react";
import CreateMessageComponent from "./CreateMessageComponent";
import * as Yup from "yup";
import { CreateMessageFormValues } from "../../services/conversationTypes";
import { FormikHelpers } from "formik";

type TProps = {
    onSubmit: (values: CreateMessageFormValues, actions: FormikHelpers<CreateMessageFormValues>) => void;
};

const CreateMessageValidationSchema = Yup.object().shape({
    content: Yup.string().trim().required("A mező kitöltése kötelező"),
});

const CreateMessageContainer = ({ onSubmit }: TProps) => {
    return <CreateMessageComponent validationSchema={CreateMessageValidationSchema} onSubmit={onSubmit} />;
};

export default CreateMessageContainer;
