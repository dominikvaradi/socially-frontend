import React from "react";
import CreatePostComponent from "./CreatePostComponent";
import * as Yup from "yup";
import { CreatePostFormValues } from "../../services/commonTypes";
import { FormikHelpers } from "formik";

type TProps = {
    className?: string;
    placeholder: string;
    onSubmit: (values: CreatePostFormValues, actions: FormikHelpers<CreatePostFormValues>) => void;
};

const CreatePostValidationSchema = Yup.object().shape({
    header: Yup.string(),
    content: Yup.string().trim().required("A mező kitöltése kötelező"),
});

const CreatePostContainer = ({ className, placeholder, onSubmit }: TProps) => {
    return (
        <CreatePostComponent
            className={className}
            placeholder={placeholder}
            validationSchema={CreatePostValidationSchema}
            onSubmit={onSubmit}
        />
    );
};

export default CreatePostContainer;
