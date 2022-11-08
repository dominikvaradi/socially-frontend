import { useColorMode } from "@chakra-ui/react";
import React from "react";
import FloatingLabelInput from "../flows/common/components/FloatingLabelInput";
import { FiUser } from "react-icons/fi";
import FloatingLabelAutoResizeTextarea from "../flows/common/components/FloatingLabelAutoResizeTextarea";

const TestPage = () => {
    const { colorMode } = useColorMode();

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex h-[600px] w-[600px] flex-col items-center justify-center space-y-2">
                <FloatingLabelInput
                    className="w-full"
                    label="Felhasználónév"
                    bgColorLight="white"
                    bgColorDark="slate-600"
                    required
                    icon={FiUser}
                />
                <FloatingLabelInput
                    className="w-full"
                    label="Felhasználónév"
                    bgColorLight="white"
                    bgColorDark="slate-600"
                    required
                    invalid
                    errorMessage="A mező kitöltése kötelező"
                    icon={FiUser}
                    iconPosition="right"
                />
                <FloatingLabelAutoResizeTextarea
                    className="w-full"
                    label="Textbox"
                    bgColorLight="white"
                    bgColorDark="slate-600"
                />
            </div>
        </div>
    );
};

export default TestPage;
