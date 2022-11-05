import React from "react";
import CreateCommentComponent from "./CreateCommentComponent";
import * as Yup from "yup";
import { CreateCommentFormValues } from "../../services/commonTypes";
import { FormikHelpers } from "formik";

type TProps = {
    className?: string;
    inputRef: React.RefObject<HTMLTextAreaElement>;
    onSubmit: (values: CreateCommentFormValues, actions: FormikHelpers<CreateCommentFormValues>) => void;
};

const CreatePostValidationSchema = Yup.object().shape({
    content: Yup.string().trim().required("A mező kitöltése kötelező"),
});

const CreateCommentContainer = ({ className, inputRef, onSubmit }: TProps) => {
    return (
        <CreateCommentComponent
            className={className}
            inputRef={inputRef}
            validationSchema={CreatePostValidationSchema}
            onSubmit={onSubmit}
        />
    );
};

export default CreateCommentContainer;
