import { Icon, IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Formik, Form, Field, FormikHelpers, FormikState, FieldProps } from "formik";
import { EditPostFormValues } from "../../services/commonTypes";
import FloatingLabelInput from "../FloatingLabelInput";
import FloatingLabelAutoResizeTextarea from "../FloatingLabelAutoResizeTextarea";
import { FiCheck, FiX } from "react-icons/fi";

type TProps = {
    className?: string;
    validationSchema: any;
    onSubmit: (values: EditPostFormValues, actions: FormikHelpers<EditPostFormValues>) => void;
    initialValues: EditPostFormValues;
    onCancelButtonClick: () => void;
};

const EditPostComponent = ({ className, validationSchema, onSubmit, initialValues, onCancelButtonClick }: TProps) => {
    const { colorMode } = useColorMode();

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(props: FormikState<EditPostFormValues>) => (
                <Form
                    noValidate
                    className={`flex w-full flex-col gap-1 border-b px-3 pb-3 pt-2 sm:px-8 ${
                        colorMode === "dark" ? "bg-slate-600" : "bg-white"
                    } ${className || ""}`}
                >
                    <p className="mb-4 text-xl">Poszt szerkesztése</p>
                    <Field name="header">
                        {({ field, form }: FieldProps<string, EditPostFormValues>) => (
                            <FloatingLabelInput
                                label="Cím"
                                bgColorLight="white"
                                bgColorDark="slate-600"
                                invalid={form.touched.header && !!form.errors.header}
                                errorMessage={form.errors.header}
                                fieldInputProps={field}
                            />
                        )}
                    </Field>
                    <Field name="content">
                        {({ field, form }: FieldProps<string, EditPostFormValues>) => (
                            <FloatingLabelAutoResizeTextarea
                                label="Tartalom"
                                bgColorLight="white"
                                bgColorDark="slate-600"
                                required
                                invalid={form.touched.content && !!form.errors.content}
                                errorMessage={form.errors.content}
                                fieldInputProps={field}
                            />
                        )}
                    </Field>
                    <div className="-mt-3 flex items-center justify-end gap-2">
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

export default EditPostComponent;
