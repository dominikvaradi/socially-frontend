import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "../styles/chakra-theme";
import "../styles/index.scss";
import { OnboardingContextProvider } from "../flows/onboarding/services/onboardingContext";
import { HomeContextProvider } from "../flows/home/services/homeContext";
import { CommonContextProvider } from "../flows/common/services/commonContext";
import { UserContextProvider } from "../flows/user/services/userContext";
import { FriendRequestContextProvider } from "../flows/friend-request/services/friendRequestContext";
import { SearchContextProvider } from "../flows/search/services/searchContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <CommonContextProvider>
                <OnboardingContextProvider>
                    <HomeContextProvider>
                        <UserContextProvider>
                            <FriendRequestContextProvider>
                                <SearchContextProvider>
                                    <Component {...pageProps} />
                                </SearchContextProvider>
                            </FriendRequestContextProvider>
                        </UserContextProvider>
                    </HomeContextProvider>
                </OnboardingContextProvider>
            </CommonContextProvider>
        </ChakraProvider>
    );
}
