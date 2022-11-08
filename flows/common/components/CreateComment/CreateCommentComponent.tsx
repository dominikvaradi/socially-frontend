import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Formik, Form, Field, FormikHelpers, FormikState, FieldProps } from "formik";
import { CreateCommentFormValues } from "../../services/commonTypes";
import FloatingLabelAutoResizeTextarea from "../FloatingLabelAutoResizeTextarea";

type TProps = {
    className?: string;
    inputRef: React.RefObject<HTMLTextAreaElement>;
    validationSchema: any;
    onSubmit: (values: CreateCommentFormValues, actions: FormikHelpers<CreateCommentFormValues>) => void;
};

const CreateCommentComponent = ({ className, inputRef, validationSchema, onSubmit }: TProps) => {
    const { colorMode } = useColorMode();

    return (
        <Formik
            initialValues={{
                content: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(props: FormikState<CreateCommentFormValues>) => (
                <Form
                    noValidate
                    className={`flex w-full flex-col space-y-1 p-3 ${
                        colorMode === "dark" ? "bg-slate-600" : "bg-white"
                    } ${className || ""}`}
                >
                    <Field name="content">
                        {({ field, form }: FieldProps<string, CreateCommentFormValues>) => (
                            <FloatingLabelAutoResizeTextarea
                                inputRef={inputRef}
                                label="Komment"
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
                        <Button colorScheme="brand" isLoading={props.isSubmitting} type="submit" size="sm">
                            Kommentelés
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CreateCommentComponent;
