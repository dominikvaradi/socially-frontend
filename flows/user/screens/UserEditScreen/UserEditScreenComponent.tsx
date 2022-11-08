import { Button, useColorMode } from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik, FormikHelpers, FormikState } from "formik";
import React from "react";
import MainLayout from "../../../common/components/MainLayout";
import { UserEditFormValues } from "../../services/userTypes";
import FloatingLabelInput from "../../../common/components/FloatingLabelInput";
import FloatingLabelDatePickerComponent from "../../../common/components/FloatingLabelDatePicker";
import { FaRegAddressCard, FaRegCalendarAlt } from "react-icons/fa";
import { IoEarthOutline, IoBusinessOutline } from "react-icons/io5";

type TProps = {
    formikInitialValues: UserEditFormValues;
    validationSchema: any;
    onSubmit: (values: UserEditFormValues, actions: FormikHelpers<UserEditFormValues>) => void;
};

const UserEditScreenComponent = ({ formikInitialValues, validationSchema, onSubmit }: TProps) => {
    const { colorMode } = useColorMode();
    return (
        <MainLayout>
            <div className="flex h-full items-center justify-center sm:pl-16">
                <div className="mx-2 w-full max-w-[800px] rounded-md bg-white p-4 drop-shadow-md sm:mx-4 sm:p-6">
                    <p className={`mb-4 text-2xl ${colorMode === "dark" ? "text-black" : ""}`}>Profil szerkesztése</p>
                    <Formik
                        initialValues={formikInitialValues}
                        enableReinitialize
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {(props: FormikState<UserEditFormValues>) => (
                            <Form
                                noValidate
                                className={`flex flex-col flex-wrap justify-center gap-x-4 gap-y-2 sm:flex-row`}
                            >
                                <Field name="lastName">
                                    {({ field, form }: FieldProps<string, UserEditFormValues>) => (
                                        <FloatingLabelInput
                                            className="w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Vezetéknév"
                                            bgColorLight="white"
                                            bgColorDark="slate-600"
                                            required
                                            invalid={form.touched.lastName && !!form.errors.lastName}
                                            errorMessage={form.errors.lastName}
                                            fieldInputProps={field}
                                            icon={FaRegAddressCard}
                                            iconPosition="right"
                                        />
                                    )}
                                </Field>
                                <Field name="firstName">
                                    {({ field, form }: FieldProps<string, UserEditFormValues>) => (
                                        <FloatingLabelInput
                                            className="w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Keresztnév"
                                            bgColorLight="white"
                                            bgColorDark="slate-600"
                                            required
                                            invalid={form.touched.firstName && !!form.errors.firstName}
                                            errorMessage={form.errors.firstName}
                                            fieldInputProps={field}
                                            icon={FaRegAddressCard}
                                            iconPosition="right"
                                        />
                                    )}
                                </Field>
                                <Field name="birthCountry">
                                    {({ field, form }: FieldProps<string, UserEditFormValues>) => (
                                        <FloatingLabelInput
                                            className="w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Születési ország"
                                            bgColorLight="white"
                                            bgColorDark="slate-600"
                                            invalid={form.touched.birthCountry && !!form.errors.birthCountry}
                                            errorMessage={form.errors.birthCountry}
                                            fieldInputProps={field}
                                            icon={IoEarthOutline}
                                            iconPosition="right"
                                        />
                                    )}
                                </Field>
                                <Field name="birthCity">
                                    {({ field, form }: FieldProps<string, UserEditFormValues>) => (
                                        <FloatingLabelInput
                                            className="w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Születési város"
                                            bgColorLight="white"
                                            bgColorDark="slate-600"
                                            invalid={form.touched.birthCity && !!form.errors.birthCity}
                                            errorMessage={form.errors.birthCity}
                                            fieldInputProps={field}
                                            icon={IoBusinessOutline}
                                            iconPosition="right"
                                        />
                                    )}
                                </Field>
                                <Field name="currentCountry">
                                    {({ field, form }: FieldProps<string, UserEditFormValues>) => (
                                        <FloatingLabelInput
                                            className="w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Jelenlegi ország"
                                            bgColorLight="white"
                                            bgColorDark="slate-600"
                                            invalid={form.touched.currentCountry && !!form.errors.currentCountry}
                                            errorMessage={form.errors.currentCountry}
                                            fieldInputProps={field}
                                            icon={IoEarthOutline}
                                            iconPosition="right"
                                        />
                                    )}
                                </Field>
                                <Field name="currentCity">
                                    {({ field, form }: FieldProps<string, UserEditFormValues>) => (
                                        <FloatingLabelInput
                                            className="w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Jelenlegi város"
                                            bgColorLight="white"
                                            bgColorDark="slate-600"
                                            invalid={form.touched.currentCity && !!form.errors.currentCity}
                                            errorMessage={form.errors.currentCity}
                                            fieldInputProps={field}
                                            icon={IoBusinessOutline}
                                            iconPosition="right"
                                        />
                                    )}
                                </Field>
                                <Field name="birthDate">
                                    {({ field, form }: FieldProps<Date, UserEditFormValues>) => (
                                        <FloatingLabelDatePickerComponent
                                            className="!w-full sm:!w-[calc(50%-0.5rem)]"
                                            label="Születési dátum"
                                            bgColorLight="white"
                                            bgColorDark="slate-600"
                                            required
                                            invalid={form.touched.birthDate && !!form.errors.birthDate}
                                            errorMessage={form.errors.birthDate as string}
                                            fieldInputProps={field}
                                            icon={FaRegCalendarAlt}
                                            iconPosition={"right"}
                                        />
                                    )}
                                </Field>
                                <div className="flex w-full items-center justify-center">
                                    <Button
                                        colorScheme="brand"
                                        isLoading={props.isSubmitting}
                                        type="submit"
                                        className="w-full sm:w-1/2"
                                    >
                                        Mentés
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </MainLayout>
    );
};

export default UserEditScreenComponent;
