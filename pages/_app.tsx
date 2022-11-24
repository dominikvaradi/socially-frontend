import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "../styles/chakra-theme";
import "../styles/index.scss";
import { OnboardingContextProvider } from "../flows/onboarding/services/onboardingContext";
import { HomeContextProvider } from "../flows/home/services/homeContext";
import { CommonContextProvider } from "../flows/common/services/commonContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <CommonContextProvider>
                <OnboardingContextProvider>
                    <HomeContextProvider>
                        <Component {...pageProps} />
                    </HomeContextProvider>
                </OnboardingContextProvider>
            </CommonContextProvider>
        </ChakraProvider>
    );
}
