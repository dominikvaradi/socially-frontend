import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";
import { TFriendRequestLayoutTab } from "../../services/friendRequestTypes";

type TProps = {
    activeTab: TFriendRequestLayoutTab;
};

const FriendRequestLayoutComponent = ({ activeTab, children }: React.PropsWithChildren<TProps>) => {
    const { colorMode } = useColorMode();

    return (
        <div className="flex w-full justify-center sm:pl-16">
            <div
                className={`m-4 flex w-full max-w-[1000px] flex-col rounded-md p-4 drop-shadow-md sm:m-8 ${
                    colorMode === "dark" ? "bg-slate-600" : "bg-white"
                }`}
            >
                <div className="flex flex-col gap-4 border-b pb-2">
                    <p className="text-2xl">
                        {activeTab === "incoming" ? "Bejövő barát-kérelmek" : "Kimenő barát-kérelmek"}
                    </p>
                    <div className="flex gap-2">
                        <Button colorScheme="brand" variant={activeTab === "incoming" ? "solid" : "ghost"}>
                            Bejövő
                        </Button>
                        <Button colorScheme="brand" variant={activeTab === "outgoing" ? "solid" : "ghost"}>
                            Kimenő
                        </Button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default FriendRequestLayoutComponent;
