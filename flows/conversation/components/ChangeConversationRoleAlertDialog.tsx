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

const ChangeConversationRoleAlertDialog = ({
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
                    <AlertDialogHeader>Beszélgetés-szerepkör szerkesztése</AlertDialogHeader>

                    <AlertDialogBody>
                        Biztosan meg szeretnéd változtatni a kiválasztott személy szerepkörét?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <div className="flex w-full items-center justify-end space-x-2">
                            <Button ref={cancelButtonRef} onClick={onClose}>
                                Nem
                            </Button>
                            <Button
                                colorScheme="yellow"
                                onClick={onConfirmButtonClick}
                                isLoading={confirmButtonLoading}
                            >
                                Igen
                            </Button>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default ChangeConversationRoleAlertDialog;
