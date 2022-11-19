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
};

const DeletePostAlertDialog = ({ visible, onClose, onConfirmButtonClick }: TProps) => {
    const cancelButtonRef = React.useRef<HTMLButtonElement>(null);

    return (
        <AlertDialog isOpen={visible} leastDestructiveRef={cancelButtonRef} onClose={onClose} isCentered>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>Poszt törlése</AlertDialogHeader>

                    <AlertDialogBody>Biztosan törölni szeretnéd a kiválasztott posztot?</AlertDialogBody>

                    <AlertDialogFooter>
                        <div className="flex w-full items-center justify-end space-x-2">
                            <Button ref={cancelButtonRef} onClick={onClose}>
                                Mégsem
                            </Button>
                            <Button colorScheme="red" onClick={onConfirmButtonClick}>
                                Törlés
                            </Button>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default DeletePostAlertDialog;
