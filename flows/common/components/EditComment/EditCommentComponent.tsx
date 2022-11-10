import { Icon, IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Formik, Form, Field, FormikHelpers, FormikState, FieldProps } from "formik";
import FloatingLabelAutoResizeTextarea from "../FloatingLabelAutoResizeTextarea";
import { EditCommentFormValues } from "../../services/commonTypes";
import { FiCheck, FiX } from "react-icons/fi";

type TProps = {
    className?: string;
    validationSchema: any;
    onSubmit: (values: EditCommentFormValues, actions: FormikHelpers<EditCommentFormValues>) => void;
    initialValues: EditCommentFormValues;
    onCancelButtonClick: () => void;
};

const EditCommentComponent = ({
    className,
    validationSchema,
    onSubmit,
    initialValues,
    onCancelButtonClick,
}: TProps) => {
    const { colorMode } = useColorMode();

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(props: FormikState<EditCommentFormValues>) => (
                <Form
                    noValidate
                    className={`flex w-full flex-col gap-1 rounded-md px-3 pb-3 pt-2 drop-shadow-md sm:px-8 ${
                        colorMode === "dark" ? "bg-slate-700" : "bg-blue-100"
                    } ${className || ""}`}
                >
                    <div className="mb-1">
                        <span className="text-xl">Komment szerkesztése</span>
                    </div>
                    <Field name="content">
                        {({ field, form }: FieldProps<string, EditCommentFormValues>) => (
                            <FloatingLabelAutoResizeTextarea
                                label="Komment"
                                bgColorLight="blue-100"
                                bgColorDark="slate-700"
                                required
                                invalid={form.touched.content && !!form.errors.content}
                                errorMessage={form.errors.content}
                                fieldInputProps={field}
                            />
                        )}
                    </Field>
                    <div className="flex items-center justify-end gap-2">
                        <IconButton
                            colorScheme="green"
                            icon={<Icon as={FiCheck} />}
                            isLoading={props.isSubmitting}
                            type="submit"
                            aria-label={"Save edited post"}
                        />
                        <IconButton
                            colorScheme="red"
                            icon={<Icon as={FiX} />}
                            aria-label={"Cancel editing"}
                            onClick={onCancelButtonClick}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default EditCommentComponent;
