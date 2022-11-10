import React from "react";
import EditCommentComponent from "./EditCommentComponent";
import * as Yup from "yup";
import { EditCommentFormValues } from "../../services/commonTypes";
import { FormikHelpers } from "formik";

type TProps = {
    className?: string;
    onSubmit: (values: EditCommentFormValues, actions: FormikHelpers<EditCommentFormValues>) => void;
    initialValues: EditCommentFormValues;
    onCancelButtonClick: () => void;
};

const EditCommentValidationSchema = Yup.object().shape({
    content: Yup.string().trim().required("A mező kitöltése kötelező"),
});

const EditCommentContainer = ({ className, onSubmit, initialValues, onCancelButtonClick }: TProps) => {
    return (
        <EditCommentComponent
            className={className}
            validationSchema={EditCommentValidationSchema}
            onSubmit={onSubmit}
            initialValues={initialValues}
            onCancelButtonClick={onCancelButtonClick}
        />
    );
};

export default EditCommentContainer;
