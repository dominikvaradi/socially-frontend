import React from "react";
import CreatePostComponent from "./CreatePostComponent";
import * as Yup from "yup";
import { CreatePostFormValues } from "../../services/commonTypes";
import { FormikHelpers } from "formik";

const CreatePostValidationSchema = Yup.object().shape({
    header: Yup.string(),
    content: Yup.string().trim().required("A mező kitöltése kötelező"),
});

type TProps = {
    className?: string;
    placeholder: string;
    onSubmit: (values: CreatePostFormValues, actions: FormikHelpers<CreatePostFormValues>) => void;
};

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
