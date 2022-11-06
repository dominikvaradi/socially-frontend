import { Button, Icon, Input, useColorMode } from "@chakra-ui/react";
import React from "react";
import { LoginFormValues } from "../../services/onboardingTypes";
import { TbSocial } from "react-icons/tb";
import { Field, FieldProps, Form, Formik, FormikHelpers, FormikState } from "formik";
import FloatingLabelFormControl from "../../../common/components/FloatingLabelFormControl";
import AutoResizeTextarea from "../../../common/components/AutoResizeTextarea";

type TProps = {
    validationSchema: any;
    onSubmit: (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => void;
    onRegisterButtonClick: () => void;
};

const LoginScreenComponent = ({ validationSchema, onSubmit, onRegisterButtonClick }: TProps) => {
    const { colorMode } = useColorMode();
    return (
        <div
            className={`flex h-screen w-screen items-center justify-center overflow-y-auto ${
                colorMode === "dark" ? "bg-slate-700" : "bg-slate-100"
            }`}
        >
            <div className="m-auto flex h-max w-full max-w-[450px] flex-col space-y-2 p-4">
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
                            className={`flex flex-col space-y-2 rounded-xl px-6 pb-6 pt-2 drop-shadow-md sm:px-8 ${
                                colorMode === "dark" ? "bg-slate-600" : "bg-white"
                            }`}
                        >
                            <div className="flex select-none items-center justify-center">
                                <Icon
                                    as={TbSocial}
                                    className={`text-8xl sm:text-9xl ${
                                        colorMode === "dark" ? "!text-brand-400" : "!text-brand-500"
                                    }`}
                                />
                                <p
                                    className={`text-5xl sm:text-6xl ${
                                        colorMode === "dark" ? "text-slate-100" : "text-slate-700"
                                    }`}
                                >
                                    <span className={colorMode === "dark" ? "!text-brand-400" : "!text-brand-500"}>
                                        S
                                    </span>
                                    ocially
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
                            <div className="!mt-4 flex flex-grow flex-wrap items-center justify-center gap-x-1">
                                <span>Nincsen még felhasználód?</span>
                                <Button variant="link" colorScheme="brand" onClick={onRegisterButtonClick}>
                                    Regisztráció
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginScreenComponent;
