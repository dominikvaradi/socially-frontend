export interface LoginFormValues {
    email: string;
    password: string;
}

export interface RegisterFormValues {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    password: string;
    passwordConfirm: string;
    birthCountry: string;
    birthCity: string;
    currentCountry: string;
    currentCity: string;
}
