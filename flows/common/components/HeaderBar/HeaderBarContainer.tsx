import React from "react";
import HeaderBarComponent from "./HeaderBarComponent";

type TProps = {
    userName: string;
    lastConversationsExpandButtonRef: React.RefObject<HTMLButtonElement>;
    onLastConversationsExpandButtonClick: () => void;
    onProfileButtonClick: () => void;
    onSettingsButtonClick: () => void;
    onSignOutButtonClick: () => void;
};

const HeaderBarContainer = ({
    userName,
    lastConversationsExpandButtonRef,
    onLastConversationsExpandButtonClick,
    onProfileButtonClick,
    onSettingsButtonClick,
    onSignOutButtonClick,
}: TProps) => {
    return (
        <HeaderBarComponent
            userName={userName}
            lastConversationsExpandButtonRef={lastConversationsExpandButtonRef}
            onLastConversationsExpandButtonClick={onLastConversationsExpandButtonClick}
            onProfileButtonClick={onProfileButtonClick}
            onSettingsButtonClick={onSettingsButtonClick}
            onSignOutButtonClick={onSignOutButtonClick}
        />
    );
};

export default HeaderBarContainer;
