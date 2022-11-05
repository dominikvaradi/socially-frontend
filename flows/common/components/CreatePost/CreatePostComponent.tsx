import { Button, FormErrorMessage, Input, useColorMode } from "@chakra-ui/react";
import React from "react";
import FloatingLabelFormControl from "../FloatingLabelFormControl";
import AutoResizeTextarea from "../AutoResizeTextarea";
import { Formik, Form, Field, FormikHelpers, FormikState, FieldProps } from "formik";
import { CreatePostFormValues } from "../../services/commonTypes";

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
                    className={`flex w-full flex-col space-y-4 rounded-md p-8 shadow-md ${
                        colorMode === "dark" ? "bg-slate-600" : "bg-white"
                    } ${className || ""}`}
                >
                    <p className="text-2xl">{placeholder}</p>

                    <Field name="header">
                        {({ field, form }: FieldProps<string, CreatePostFormValues>) => (
                            <FloatingLabelFormControl
                                label="Cím"
                                lightBgColor="white"
                                darkBgColor="slate-600"
                                isInvalid={form.touched.header && !!form.errors.header}
                            >
                                <Input placeholder=" " {...field} />
                                <FormErrorMessage>{form.errors.header}</FormErrorMessage>
                            </FloatingLabelFormControl>
                        )}
                    </Field>
                    <Field name="content">
                        {({ field, form }: FieldProps<string, CreatePostFormValues>) => (
                            <FloatingLabelFormControl
                                label="Tartalom"
                                lightBgColor="white"
                                darkBgColor="slate-600"
                                isRequired
                                isInvalid={form.touched.content && !!form.errors.content}
                            >
                                <AutoResizeTextarea placeholder=" " {...field} />
                                <FormErrorMessage>{form.errors.content}</FormErrorMessage>
                            </FloatingLabelFormControl>
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
