import React, { useState } from "react";
import ReactionListModalComponent from "./ReactionListModalComponent";
import { IReactionListItem, TReaction } from "../../services/commonTypes";

type TProps = {
    visible: boolean;
    onClose: () => void;
    onTabChange: (reaction?: TReaction) => void;
    reactionItems: IReactionListItem[];
    loadMoreItemsButtonVisible: boolean;
    onLoadMoreItemsButtonClick: () => void;
    onUserProfileClick: (userId: string) => void;
    loading: boolean;
};

const ReactionListModalContainer = ({
    visible,
    onClose,
    onTabChange,
    reactionItems,
    loadMoreItemsButtonVisible,
    onLoadMoreItemsButtonClick,
    onUserProfileClick,
    loading,
}: TProps) => {
    const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

    const handleTabChange = (tabIndex: number) => {
        setCurrentTabIndex(tabIndex);

        onTabChange(mapTabIndex2Reaction(tabIndex));
    };

    return (
        <ReactionListModalComponent
            visible={visible}
            onClose={onClose}
            currentTabIndex={currentTabIndex}
            onTabChange={handleTabChange}
            reactionItems={reactionItems}
            loadMoreItemsButtonVisible={loadMoreItemsButtonVisible}
            onLoadMoreItemsButtonClick={onLoadMoreItemsButtonClick}
            onUserProfileClick={onUserProfileClick}
            loading={loading}
        />
    );
};

export default ReactionListModalContainer;

const mapTabIndex2Reaction = (tabIndex: number): TReaction | undefined => {
    switch (tabIndex) {
        case 1:
            return "LIKE";
        case 2:
            return "HEART";
        case 3:
            return "FUNNY";
        case 4:
            return "ANGRY";
        default:
            return undefined;
    }
};
