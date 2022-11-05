import { Button, FormErrorMessage, useColorMode } from "@chakra-ui/react";
import React from "react";
import FloatingLabelFormControl from "../FloatingLabelFormControl";
import AutoResizeTextarea from "../AutoResizeTextarea";
import { Formik, Form, Field, FormikHelpers, FormikState, FieldProps } from "formik";
import { CreateCommentFormValues } from "../../services/commonTypes";

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
                    className={`flex w-full flex-col space-y-2 p-3 ${
                        colorMode === "dark" ? "bg-slate-600" : "bg-white"
                    } ${className || ""}`}
                >
                    <Field name="content">
                        {({ field, form }: FieldProps<string, CreateCommentFormValues>) => (
                            <FloatingLabelFormControl
                                label="Komment"
                                lightBgColor="white"
                                darkBgColor="slate-600"
                                isRequired
                                isInvalid={form.touched.content && !!form.errors.content}
                            >
                                <AutoResizeTextarea ref={inputRef} placeholder=" " {...field} />
                                <FormErrorMessage>{form.errors.content}</FormErrorMessage>
                            </FloatingLabelFormControl>
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
