import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";
import React from "react";

type TProps = {
    visible: boolean;
    onClose: () => void;
    onConfirmButtonClick: () => void;
    confirmButtonLoading: boolean;
};

const RemoveMemberFromConversationAlertDialog = ({
    visible,
    onClose,
    onConfirmButtonClick,
    confirmButtonLoading,
}: TProps) => {
    const cancelButtonRef = React.useRef<HTMLButtonElement>(null);

    return (
        <AlertDialog isOpen={visible} leastDestructiveRef={cancelButtonRef} onClose={onClose} isCentered>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>Felhasználó eltávolítása a beszélgetésből</AlertDialogHeader>

                    <AlertDialogBody>
                        Biztosan el szeretnéd távolítani a kiválasztott felhasználót a beszélgetésből?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <div className="flex w-full items-center justify-end space-x-2">
                            <Button ref={cancelButtonRef} onClick={onClose}>
                                Nem
                            </Button>
                            <Button colorScheme="red" onClick={onConfirmButtonClick} isLoading={confirmButtonLoading}>
                                Igen
                            </Button>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default RemoveMemberFromConversationAlertDialog;
