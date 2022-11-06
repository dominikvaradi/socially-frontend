import { Button, Icon, Input, useColorMode } from "@chakra-ui/react";
import React from "react";
import { TbSocial } from "react-icons/tb";
import { Field, FieldProps, Form, Formik, FormikHelpers, FormikState } from "formik";
import FloatingLabelFormControl from "../../../common/components/FloatingLabelFormControl";
import { RegisterFormValues } from "../../services/onboardingTypes";

type TProps = {
    validationSchema: any;
    onSubmit: (values: RegisterFormValues, actions: FormikHelpers<RegisterFormValues>) => void;
    onLoginButtonClick: () => void;
};

const RegisterScreenComponent = ({ validationSchema, onSubmit, onLoginButtonClick }: TProps) => {
    const { colorMode } = useColorMode();
    return (
        <div
            className={`flex h-screen w-screen items-center justify-center overflow-y-auto ${
                colorMode === "dark" ? "bg-slate-700" : "bg-slate-100"
            }`}
        >
            <div className="m-auto flex h-max max-w-[800px] flex-col space-y-2 p-4">
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        birthDate: "",
                        password: "",
                        passwordConfirm: "",
                        birthCountry: "",
                        birthCity: "",
                        currentCountry: "",
                        currentCity: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(props: FormikState<RegisterFormValues>) => (
                        <Form
                            noValidate
                            className={`flex h-max flex-col space-y-2 rounded-xl px-6 pb-6 pt-2 drop-shadow-md sm:px-8 ${
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
                            <p className="!mb-4 text-center text-xl">Add meg az adataid a regisztrációhoz!</p>
                            <div className="flex w-full flex-wrap gap-4">
                                <Field name="lastName">
                                    {({ field, form }: FieldProps<string, RegisterFormValues>) => (
                                        <FloatingLabelFormControl
                                            className="!w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Vezetéknév"
                                            lightBgColor="white"
                                            darkBgColor="slate-600"
                                            isRequired
                                            isInvalid={form.touched.lastName && !!form.errors.lastName}
                                            errorMessage={form.errors.lastName}
                                        >
                                            <Input placeholder=" " {...field} />
                                        </FloatingLabelFormControl>
                                    )}
                                </Field>
                                <Field name="firstName">
                                    {({ field, form }: FieldProps<string, RegisterFormValues>) => (
                                        <FloatingLabelFormControl
                                            className="!w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Keresztnév"
                                            lightBgColor="white"
                                            darkBgColor="slate-600"
                                            isRequired
                                            isInvalid={form.touched.firstName && !!form.errors.firstName}
                                            errorMessage={form.errors.firstName}
                                        >
                                            <Input placeholder=" " {...field} />
                                        </FloatingLabelFormControl>
                                    )}
                                </Field>
                                <Field name="email">
                                    {({ field, form }: FieldProps<string, RegisterFormValues>) => (
                                        <FloatingLabelFormControl
                                            className="!w-full sm:!w-[calc(50%-0.5rem)]"
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
                                <Field name="birthDate">
                                    {({ field, form }: FieldProps<string, RegisterFormValues>) => (
                                        <FloatingLabelFormControl
                                            className="!w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Születési dátum"
                                            lightBgColor="white"
                                            darkBgColor="slate-600"
                                            isRequired
                                            isInvalid={form.touched.birthDate && !!form.errors.birthDate}
                                            errorMessage={form.errors.birthDate}
                                        >
                                            <Input placeholder=" " {...field} />
                                        </FloatingLabelFormControl>
                                    )}
                                </Field>
                                <Field name="password">
                                    {({ field, form }: FieldProps<string, RegisterFormValues>) => (
                                        <FloatingLabelFormControl
                                            className="!w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Jelszó"
                                            lightBgColor="white"
                                            darkBgColor="slate-600"
                                            isRequired
                                            isInvalid={form.touched.password && !!form.errors.password}
                                            errorMessage={form.errors.password}
                                        >
                                            <Input placeholder=" " {...field} type="password" />
                                        </FloatingLabelFormControl>
                                    )}
                                </Field>
                                <Field name="passwordConfirm">
                                    {({ field, form }: FieldProps<string, RegisterFormValues>) => (
                                        <FloatingLabelFormControl
                                            className="!w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Jelszó megerősítése"
                                            lightBgColor="white"
                                            darkBgColor="slate-600"
                                            isRequired
                                            isInvalid={form.touched.passwordConfirm && !!form.errors.passwordConfirm}
                                            errorMessage={form.errors.passwordConfirm}
                                        >
                                            <Input placeholder=" " {...field} type="password" />
                                        </FloatingLabelFormControl>
                                    )}
                                </Field>
                                <Field name="birthCountry">
                                    {({ field, form }: FieldProps<string, RegisterFormValues>) => (
                                        <FloatingLabelFormControl
                                            className="!w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Születési ország"
                                            lightBgColor="white"
                                            darkBgColor="slate-600"
                                            isInvalid={form.touched.birthCountry && !!form.errors.birthCountry}
                                            errorMessage={form.errors.birthCountry}
                                        >
                                            <Input placeholder=" " {...field} />
                                        </FloatingLabelFormControl>
                                    )}
                                </Field>
                                <Field name="birthCity">
                                    {({ field, form }: FieldProps<string, RegisterFormValues>) => (
                                        <FloatingLabelFormControl
                                            className="!w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Születési város"
                                            lightBgColor="white"
                                            darkBgColor="slate-600"
                                            isInvalid={form.touched.birthCity && !!form.errors.birthCity}
                                            errorMessage={form.errors.birthCity}
                                        >
                                            <Input placeholder=" " {...field} />
                                        </FloatingLabelFormControl>
                                    )}
                                </Field>
                                <Field name="currentCountry">
                                    {({ field, form }: FieldProps<string, RegisterFormValues>) => (
                                        <FloatingLabelFormControl
                                            className="!w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Jelenlegi ország"
                                            lightBgColor="white"
                                            darkBgColor="slate-600"
                                            isInvalid={form.touched.currentCountry && !!form.errors.currentCountry}
                                            errorMessage={form.errors.currentCountry}
                                        >
                                            <Input placeholder=" " {...field} />
                                        </FloatingLabelFormControl>
                                    )}
                                </Field>
                                <Field name="currentCity">
                                    {({ field, form }: FieldProps<string, RegisterFormValues>) => (
                                        <FloatingLabelFormControl
                                            className="!w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Jelenlegi város"
                                            lightBgColor="white"
                                            darkBgColor="slate-600"
                                            isInvalid={form.touched.currentCity && !!form.errors.currentCity}
                                            errorMessage={form.errors.currentCity}
                                        >
                                            <Input placeholder=" " {...field} />
                                        </FloatingLabelFormControl>
                                    )}
                                </Field>
                            </div>
                            <div className="flex w-full items-center justify-center">
                                <Button
                                    colorScheme="brand"
                                    isLoading={props.isSubmitting}
                                    type="submit"
                                    className="w-full sm:w-1/2"
                                >
                                    Regisztráció
                                </Button>
                            </div>
                            <div className="!mt-4 flex flex-grow flex-wrap items-center justify-center gap-x-1">
                                <span>Van már felhasználód?</span>
                                <Button variant="link" colorScheme="brand" onClick={onLoginButtonClick}>
                                    Bejelentkezés
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default RegisterScreenComponent;
