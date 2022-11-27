import React from "react";
import MainLayout from "../../../common/components/MainLayout";
import FriendRequestLayout from "../../components/FriendRequestLayout";
import UserNameAvatar from "../../../common/components/UserNameAvatar";
import { FiX } from "react-icons/fi";
import { Button, Icon, IconButton, useColorMode } from "@chakra-ui/react";
import { IFriendRequestItem } from "../../services/friendRequestTypes";
import ColorModeSpinner from "../../../common/components/ColorModeSpinner";

type TProps = {
    friendRequestItems: IFriendRequestItem[];
    onUserProfileClick: (userId: string) => void;
    onRevokeFriendRequestButtonClick: (friendRequestId: string) => void;
    friendRequestItemsLoading: boolean;
    loadMoreFriendRequestItemsButtonVisible: boolean;
    onLoadMoreFriendRequestItemsButtonClick: () => void;
    isRevokeFriendRequestButtonLoading: (friendRequestId: string) => boolean;
    onIncomingFriendRequestsButtonClick: () => void;
    onOutgoingFriendRequestsButtonClick: () => void;
};

const OutgoingFriendRequestsScreenComponent = ({
    friendRequestItems,
    onUserProfileClick,
    onRevokeFriendRequestButtonClick,
    friendRequestItemsLoading,
    loadMoreFriendRequestItemsButtonVisible,
    onLoadMoreFriendRequestItemsButtonClick,
    isRevokeFriendRequestButtonLoading,
    onIncomingFriendRequestsButtonClick,
    onOutgoingFriendRequestsButtonClick,
}: TProps) => {
    const { colorMode } = useColorMode();

    const nameHoverStyle = `lg:hover:bg-brand-100 ${colorMode === "dark" ? "lg:hover:text-black" : ""}`;
    const nameActiveStyle = `active:bg-brand-300 lg:hover:bg-brand-100 lg:hover:active:bg-brand-300 ${
        colorMode === "dark" ? "active:text-black" : ""
    }`;

    return (
        <MainLayout>
            <FriendRequestLayout
                activeTab="outgoing"
                onIncomingFriendRequestsButtonClick={onIncomingFriendRequestsButtonClick}
                onOutgoingFriendRequestsButtonClick={onOutgoingFriendRequestsButtonClick}
            >
                <div className="mt-2 flex flex-col gap-2 pt-2 sm:px-2">
                    {friendRequestItems.map((fri) => (
                        <div key={fri.id} className="flex items-center justify-between gap-1">
                            <div
                                className={`flex cursor-pointer items-center gap-1 rounded-lg p-1 sm:gap-2 ${nameHoverStyle} ${nameActiveStyle}`}
                                onClick={() => onUserProfileClick(fri.userId)}
                            >
                                <UserNameAvatar userName={fri.userName} size="lg" />
                                <span className="text-lg">{fri.userName}</span>
                            </div>
                            <div className="flex gap-1 sm:gap-2">
                                <IconButton
                                    onClick={() => onRevokeFriendRequestButtonClick(fri.id)}
                                    colorScheme="red"
                                    icon={<Icon as={FiX} />}
                                    aria-label={"Revoke outgoing friend-request"}
                                    isLoading={isRevokeFriendRequestButtonLoading(fri.id)}
                                />
                            </div>
                        </div>
                    ))}
                    {friendRequestItems.length === 0 && !friendRequestItemsLoading && (
                        <p className="text-center">Nem található bejövő barát-kérelem.</p>
                    )}
                    {friendRequestItems.length === 0 && friendRequestItemsLoading && (
                        <div className="flex justify-center">
                            <ColorModeSpinner size="lg" />
                        </div>
                    )}
                    {friendRequestItems.length > 0 && loadMoreFriendRequestItemsButtonVisible && (
                        <div className="flex justify-center">
                            <Button
                                colorScheme="brand"
                                variant="ghost"
                                onClick={onLoadMoreFriendRequestItemsButtonClick}
                                isLoading={friendRequestItemsLoading}
                                spinner={<ColorModeSpinner size="lg" />}
                            >
                                Több barát-kérelem betöltése
                            </Button>
                        </div>
                    )}
                </div>
            </FriendRequestLayout>
        </MainLayout>
    );
};

export default OutgoingFriendRequestsScreenComponent;
