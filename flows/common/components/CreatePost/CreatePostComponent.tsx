import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Formik, Form, Field, FormikHelpers, FormikState, FieldProps } from "formik";
import { CreatePostFormValues } from "../../services/commonTypes";
import FloatingLabelInput from "../FloatingLabelInput";
import FloatingLabelAutoResizeTextarea from "../FloatingLabelAutoResizeTextarea";

type TProps = {
    className?: string;
    placeholder: string;
    validationSchema: any;
    onSubmit: (values: CreatePostFormValues, actions: FormikHelpers<CreatePostFormValues>) => void;
};

const CreatePostComponent = ({ className, placeholder, validationSchema, onSubmit }: TProps) => {
    const { colorMode } = useColorMode();

    return (
        <Formik
            initialValues={{
                header: "",
                content: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(props: FormikState<CreatePostFormValues>) => (
                <Form
                    noValidate
                    className={`flex w-full flex-col space-y-1 rounded-md p-8 shadow-md ${
                        colorMode === "dark" ? "bg-slate-600" : "bg-white"
                    } ${className || ""}`}
                >
                    <p className="mb-2 text-2xl">{placeholder}</p>
                    <Field name="header">
                        {({ field, form }: FieldProps<string, CreatePostFormValues>) => (
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
                        {({ field, form }: FieldProps<string, CreatePostFormValues>) => (
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
                    <div>
                        <Button colorScheme="brand" isLoading={props.isSubmitting} type="submit">
                            Létrehozás
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CreatePostComponent;
