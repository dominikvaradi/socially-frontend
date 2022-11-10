import React from "react";
import EditPostComponent from "./EditPostComponent";
import * as Yup from "yup";
import { EditPostFormValues } from "../../services/commonTypes";
import { FormikHelpers } from "formik";

const EditPostValidationSchema = Yup.object().shape({
    header: Yup.string(),
    content: Yup.string().trim().required("A mező kitöltése kötelező"),
});

type TProps = {
    className?: string;
    onSubmit: (values: EditPostFormValues, actions: FormikHelpers<EditPostFormValues>) => void;
    initialValues: EditPostFormValues;
    onCancelButtonClick: () => void;
};

const EditPostContainer = ({ className, onSubmit, initialValues, onCancelButtonClick }: TProps) => {
    return (
        <EditPostComponent
            className={className}
            validationSchema={EditPostValidationSchema}
            onSubmit={onSubmit}
            initialValues={initialValues}
            onCancelButtonClick={onCancelButtonClick}
        />
    );
};

export default EditPostContainer;
