import { Field, FieldProps, Form, Formik, FormikHelpers, FormikState } from "formik";
import React from "react";
import { CreateMessageFormValues } from "../../services/conversationTypes";
import { Button, Icon, IconButton } from "@chakra-ui/react";
import FloatingLabelInput from "../../../common/components/FloatingLabelInput";
import { FiSend } from "react-icons/fi";

type TProps = {
    validationSchema: any;
    onSubmit: (values: CreateMessageFormValues, actions: FormikHelpers<CreateMessageFormValues>) => void;
};

const CreateMessageComponent = ({ validationSchema, onSubmit }: TProps) => {
    return (
        <Formik
            initialValues={{
                content: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(props: FormikState<CreateMessageFormValues>) => (
                <Form noValidate className="flex items-center gap-2 px-4 pb-1 pt-4">
                    <Field name="content">
                        {({ field, form }: FieldProps<string, CreateMessageFormValues>) => (
                            <FloatingLabelInput
                                label="Üzenet"
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
                        <div className="mb-4">
                            <Button
                                className="!hidden md:!flex"
                                colorScheme="brand"
                                rightIcon={<Icon as={FiSend} />}
                                isLoading={props.isSubmitting}
                                type="submit"
                            >
                                Küldés
                            </Button>
                            <IconButton
                                className="md:!hidden"
                                colorScheme="brand"
                                icon={<Icon as={FiSend} />}
                                aria-label={"Send message"}
                                isLoading={props.isSubmitting}
                                type="submit"
                            />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CreateMessageComponent;
