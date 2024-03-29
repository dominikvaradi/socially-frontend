import { Button, Icon, useColorMode } from "@chakra-ui/react";
import React from "react";
import UserNameAvatar from "../../../common/components/UserNameAvatar";
import { TProfileLayoutTab } from "../../services/userTypes";
import { FiUserPlus, FiUserMinus, FiUserX, FiUserCheck } from "react-icons/fi";
import DeleteFriendAlertDialog from "../DeleteFriendAlertDialog";

type TProps = {
    userName: string;
    activeTab: TProfileLayoutTab;
    userEqualSelf: boolean;
    alreadyFriend: boolean;
    friendRequestIncoming: boolean;
    friendRequestAlreadySent: boolean;
    onDeleteFriendButtonClick: () => void;
    onRevokeOutgoingFriendRequestButtonClick: () => void;
    onAddFriendButtonClick: () => void;
    onAcceptIncomingFriendRequestButtonClick: () => void;
    onDeclineIncomingFriendRequestButtonClick: () => void;
    deleteFriendAlertDialogVisible: boolean;
    onDeleteFriendAlertDialogClose: () => void;
    onDeleteFriendAlertDialogConfirmButtonClick: () => void;
    deleteFriendAlertDialogConfirmButtonLoading: boolean;
    userLoading: boolean;
    onTimelineButtonClick: () => void;
    onFriendsButtonClick: () => void;
};

const ProfileLayoutComponent = ({
    userName,
    activeTab,
    children,
    userEqualSelf,
    alreadyFriend,
    friendRequestIncoming,
    friendRequestAlreadySent,
    onDeleteFriendButtonClick,
    onRevokeOutgoingFriendRequestButtonClick,
    onAddFriendButtonClick,
    onAcceptIncomingFriendRequestButtonClick,
    onDeclineIncomingFriendRequestButtonClick,
    deleteFriendAlertDialogVisible,
    onDeleteFriendAlertDialogClose,
    onDeleteFriendAlertDialogConfirmButtonClick,
    deleteFriendAlertDialogConfirmButtonLoading,
    userLoading,
    onTimelineButtonClick,
    onFriendsButtonClick,
}: React.PropsWithChildren<TProps>) => {
    const { colorMode } = useColorMode();

    return (
        <div className="flex flex-col justify-center">
            <div
                className={`flex justify-center drop-shadow-md sm:pl-16 ${
                    colorMode === "dark" ? "bg-slate-600" : "bg-white"
                }`}
            >
                <div className="flex w-full flex-col px-4 sm:w-[80%] sm:px-0">
                    <div className="mt-8 flex flex-col gap-4 border-b border-black pb-1 md:flex-row md:items-end md:justify-between">
                        <div className={`flex items-end space-x-4 md:pb-4 ${userEqualSelf ? "pb-4" : ""}`}>
                            <UserNameAvatar userName={!userLoading ? userName : undefined} size="2xl" clickable />
                            <span className="text-4xl font-medium">
                                {userLoading && "Betöltés alatt..."}
                                {!userLoading && userName}
                            </span>
                        </div>
                        {!userEqualSelf && !userLoading && (
                            <div>
                                {alreadyFriend && (
                                    <Button
                                        onClick={onDeleteFriendButtonClick}
                                        colorScheme="red"
                                        variant="ghost"
                                        leftIcon={<Icon as={FiUserMinus} />}
                                    >
                                        Barát törlése
                                    </Button>
                                )}
                                {!alreadyFriend && (
                                    <>
                                        {!friendRequestIncoming && (
                                            <>
                                                {friendRequestAlreadySent && (
                                                    <Button
                                                        onClick={onRevokeOutgoingFriendRequestButtonClick}
                                                        colorScheme="red"
                                                        variant="ghost"
                                                        leftIcon={<Icon as={FiUserX} />}
                                                    >
                                                        Barát-kérelem visszavonása
                                                    </Button>
                                                )}
                                                {!friendRequestAlreadySent && (
                                                    <Button
                                                        onClick={onAddFriendButtonClick}
                                                        colorScheme="brand"
                                                        variant="ghost"
                                                        leftIcon={<Icon as={FiUserPlus} />}
                                                    >
                                                        Barát-kérelem küldése
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                        {friendRequestIncoming && (
                                            <div className="flex flex-col gap-1">
                                                <div>
                                                    <Button
                                                        onClick={onAcceptIncomingFriendRequestButtonClick}
                                                        colorScheme="green"
                                                        variant="ghost"
                                                        leftIcon={<Icon as={FiUserCheck} />}
                                                    >
                                                        Barát-kérelem elfogadása
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button
                                                        onClick={onDeclineIncomingFriendRequestButtonClick}
                                                        colorScheme="red"
                                                        variant="ghost"
                                                        leftIcon={<Icon as={FiUserX} />}
                                                    >
                                                        Barát-kérelem elutasítása
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex w-full space-x-2 py-4">
                        <Button
                            onClick={onTimelineButtonClick}
                            colorScheme="brand"
                            variant={activeTab === "timeline" ? "solid" : "ghost"}
                        >
                            Idővonal
                        </Button>
                        <Button
                            onClick={onFriendsButtonClick}
                            colorScheme="brand"
                            variant={activeTab === "friends" ? "solid" : "ghost"}
                        >
                            Ismerősök
                        </Button>
                    </div>
                </div>
            </div>
            {children}
            <DeleteFriendAlertDialog
                userName={userName}
                visible={deleteFriendAlertDialogVisible}
                onClose={onDeleteFriendAlertDialogClose}
                onConfirmButtonClick={onDeleteFriendAlertDialogConfirmButtonClick}
                confirmButtonLoading={deleteFriendAlertDialogConfirmButtonLoading}
            />
        </div>
    );
};

export default ProfileLayoutComponent;
