import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Tab,
    TabList,
    Tabs,
    useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { getUnicodeStringByReaction } from "../../services/commonUtils";
import UserNameAvatar from "../UserNameAvatar";
import { IReactionListItem } from "../../services/commonTypes";
import ColorModeSpinner from "../ColorModeSpinner";

type TProps = {
    visible: boolean;
    onClose: () => void;
    currentTabIndex: number;
    onTabChange: (tabIndex: number) => void;
    reactionItems: IReactionListItem[];
    loadMoreItemsButtonVisible: boolean;
    onLoadMoreItemsButtonClick: () => void;
    onUserProfileClick: (userId: string) => void;
    loading: boolean;
};

const ReactionListModalComponent = ({
    visible,
    onClose,
    currentTabIndex,
    onTabChange,
    reactionItems,
    loadMoreItemsButtonVisible,
    onLoadMoreItemsButtonClick,
    onUserProfileClick,
    loading,
}: TProps) => {
    const { colorMode } = useColorMode();

    const itemHoverStyle = `lg:hover:bg-brand-100 ${colorMode === "dark" ? "lg:hover:text-black" : ""}`;
    const itemActiveStyle = `active:bg-brand-300 lg:hover:bg-brand-100 lg:hover:active:bg-brand-300 ${
        colorMode === "dark" ? "active:text-black" : ""
    }`;

    return (
        <Modal isOpen={visible} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Reakciók</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="flex max-h-[70vh] w-full flex-col">
                        <Tabs index={currentTabIndex} onChange={onTabChange}>
                            <TabList>
                                <Tab>Összes</Tab>
                                <Tab>{getUnicodeStringByReaction("LIKE")}</Tab>
                                <Tab>{getUnicodeStringByReaction("HEART")}</Tab>
                                <Tab>{getUnicodeStringByReaction("FUNNY")}</Tab>
                                <Tab>{getUnicodeStringByReaction("ANGRY")}</Tab>
                            </TabList>
                        </Tabs>
                        <div className="flex flex-col space-y-1 overflow-y-auto py-4">
                            {reactionItems.map((ri) => (
                                <div
                                    key={ri.id}
                                    onClick={() => onUserProfileClick(ri.userId)}
                                    className={`flex cursor-pointer select-none items-center space-x-2 rounded-lg p-2 ${itemHoverStyle} ${itemActiveStyle}`}
                                >
                                    <div className="relative flex items-center justify-center">
                                        <UserNameAvatar userName={ri.userName} className="!h-14 !w-14" />
                                        <span
                                            className={`absolute -bottom-1 -right-1 flex !h-6 !w-6 items-center justify-center rounded-full text-xl shadow-md ${
                                                colorMode === "dark" ? "bg-slate-600" : "bg-gray-100"
                                            }`}
                                        >
                                            {getUnicodeStringByReaction(ri.reaction)}
                                        </span>
                                    </div>
                                    <span className="text-xl">{ri.userName}</span>
                                </div>
                            ))}
                            {reactionItems.length === 0 && loading && (
                                <div className="flex justify-center">
                                    <ColorModeSpinner size="xl" />
                                </div>
                            )}
                            {reactionItems.length === 0 && !loading && <p>Nincsen még reakció.</p>}
                            {reactionItems.length > 0 && loadMoreItemsButtonVisible && (
                                <div className="!mt-4 flex justify-center">
                                    <Button
                                        colorScheme="brand"
                                        variant="ghost"
                                        onClick={onLoadMoreItemsButtonClick}
                                        isLoading={loading}
                                        spinner={<ColorModeSpinner size="lg" />}
                                    >
                                        Több reakció betöltése
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ReactionListModalComponent;
