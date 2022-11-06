import { Button, Icon, Input } from "@chakra-ui/react";
import React from "react";
import { LoginFormValues } from "../../services/onboardingTypes";
import { TbSocial } from "react-icons/tb";
import { Field, FieldProps, Form, Formik, FormikHelpers, FormikState } from "formik";
import FloatingLabelFormControl from "../../../common/components/FloatingLabelFormControl";
import AutoResizeTextarea from "../../../common/components/AutoResizeTextarea";

type TProps = {
    validationSchema: any;
    onSubmit: (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => void;
};

const LoginScreenComponent = ({ validationSchema, onSubmit }: TProps) => {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-slate-100">
            <div className="flex w-full max-w-[400px] flex-col space-y-2 px-4">
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(props: FormikState<LoginFormValues>) => (
                        <Form
                            noValidate
                            className="flex flex-col space-y-2 rounded-xl bg-white px-4 pb-6 pt-2 drop-shadow-md"
                        >
                            <div className="flex select-none items-center justify-center">
                                <Icon as={TbSocial} className="text-8xl !text-brand-500 sm:text-9xl" />
                                <p className="text-5xl text-slate-700 sm:text-6xl">
                                    <span className="!text-brand-500">S</span>ocially
                                </p>
                            </div>
                            <p className="!mb-4 text-center text-xl">Kérjük jelentkezz be!</p>
                            <Field name="email">
                                {({ field, form }: FieldProps<string, LoginFormValues>) => (
                                    <FloatingLabelFormControl
                                        label="E-Mail cím"
                                        lightBgColor="white"
                                        darkBgColor="slate-600"
                                        isRequired
                                        isInvalid={form.touched.email && !!form.errors.email}
                                        errorMessage={form.errors.email}
                                    >
                                        <Input placeholder=" " {...field} />
                                    </FloatingLabelFormControl>
                                )}
                            </Field>
                            <Field name="password">
                                {({ field, form }: FieldProps<string, LoginFormValues>) => (
                                    <FloatingLabelFormControl
                                        label="Jelszó"
                                        lightBgColor="white"
                                        darkBgColor="slate-600"
                                        isRequired
                                        isInvalid={form.touched.password && !!form.errors.password}
                                        errorMessage={form.errors.password}
                                    >
                                        <AutoResizeTextarea placeholder=" " {...field} />
                                    </FloatingLabelFormControl>
                                )}
                            </Field>
                            <Button colorScheme="brand" isLoading={props.isSubmitting} type="submit">
                                Bejelentkezés
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginScreenComponent;
