import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "../styles/chakra-theme";
import "../styles/index.scss";
import { OnboardingContextProvider } from "../flows/onboarding/services/onboardingContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <OnboardingContextProvider>
                <Component {...pageProps} />
            </OnboardingContextProvider>
        </ChakraProvider>
    );
}
