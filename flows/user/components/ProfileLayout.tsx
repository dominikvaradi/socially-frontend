import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";
import UserNameAvatar from "../../common/components/UserNameAvatar";
import { TProfileLayoutTab } from "../services/userTypes";

type TProps = {
    userName: string;
    activeTab: TProfileLayoutTab;
};

const ProfileLayout = ({ userName, activeTab, children }: React.PropsWithChildren<TProps>) => {
    const { colorMode } = useColorMode();

    return (
        <div className="flex flex-col justify-center">
            <div
                className={`flex justify-center drop-shadow-md sm:pl-16 ${
                    colorMode === "dark" ? "bg-slate-600" : "bg-white"
                }`}
            >
                <div className="flex w-full flex-col px-4 sm:w-[80%] sm:px-0">
                    <div className="mt-8 flex items-end space-x-4 border-b border-black py-4">
                        <UserNameAvatar userName={userName} size="2xl" clickable />
                        <div className="flex flex-col">
                            <span className="text-4xl font-medium">{userName}</span>
                            <span>13 ismerős</span>
                        </div>
                    </div>
                    <div className="flex w-full space-x-2 py-4">
                        <Button colorScheme="brand" variant={activeTab === "timeline" ? "solid" : "ghost"}>
                            Idővonal
                        </Button>
                        <Button colorScheme="brand" variant={activeTab === "friends" ? "solid" : "ghost"}>
                            Ismerősök
                        </Button>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};

export default ProfileLayout;
