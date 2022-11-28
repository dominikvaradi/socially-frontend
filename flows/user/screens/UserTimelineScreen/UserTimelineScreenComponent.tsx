import { useColorMode } from "@chakra-ui/react";
import React from "react";
import CreatePost from "../../../common/components/CreatePost";
import MainLayout from "../../../common/components/MainLayout";
import ProfileLayout from "../../components/ProfileLayout";
import {
    CreateCommentFormValues,
    CreatePostFormValues,
    EditCommentFormValues,
    EditPostFormValues,
    IComment,
    IPost,
    IReactionListItem,
    TReaction,
} from "../../../common/services/commonTypes";
import PostList from "../../../common/components/PostList";
import ReactionListModal from "../../../common/components/ReactionListModal";
import DeletePostAlertDialog from "../../../common/components/DeletePostAlertDialog";
import DeleteCommentAlertDialog from "../../../common/components/DeleteCommentAlertDialog";
import { FormikHelpers } from "formik";
import ColorModeSpinner from "../../../common/components/ColorModeSpinner";
import { convertDate2DateString } from "../../services/userUtils";

type TProps = {
    userName: string;
    posts: IPost[];
    onCreatePostSubmit: (values: CreatePostFormValues, actions: FormikHelpers<CreatePostFormValues>) => void;
    onPostDeleteClick: (post: IPost) => void;
    onPostReactionCountButtonClick: (post: IPost) => void;
    onUserProfileClick: (userId: string) => void;
    onCommentDeleteButtonClick: (comment: IComment) => void;
    onCommentReactionCountButtonClick: (comment: IComment) => void;
    reactionListModalVisible: boolean;
    onReactionListModalClose: () => void;
    onReactionListModalTabChange: (reaction?: TReaction) => void;
    reactionListReactionItems: IReactionListItem[];
    reactionListLoadMoreItemsButtonVisible: boolean;
    onReactionListLoadMoreItemsButtonClick: () => void;
    reactionListLoading: boolean;
    deletePostAlertDialogVisible: boolean;
    onDeletePostAlertDialogClose: () => void;
    onDeletePostAlertDialogConfirmButtonClick: () => void;
    deletePostAlertDialogConfirmButtonLoading: boolean;
    deleteCommentAlertDialogVisible: boolean;
    onDeleteCommentAlertDialogClose: () => void;
    onDeleteCommentAlertDialogConfirmButtonClick: () => void;
    deleteCommentAlertDialogConfirmButtonLoading: boolean;
    postsLoading: boolean;
    loadMorePostsButtonVisible: boolean;
    onLoadMorePostsButtonClick: () => void;
    userEqualSelf: boolean;
    alreadyFriend: boolean;
    friendRequestIncoming: boolean;
    friendRequestAlreadySent: boolean;
    onTogglePostReaction: (post: IPost, reaction: TReaction) => Promise<void>;
    onEditPostSubmit: (
        post: IPost,
        values: EditPostFormValues,
        actions: FormikHelpers<EditPostFormValues>
    ) => Promise<void>;
    onLoadCommentsForPost: (post: IPost) => Promise<void>;
    onLoadMoreCommentsForPost: (post: IPost) => Promise<void>;
    onCreateCommentForPostSubmit: (
        post: IPost,
        values: CreateCommentFormValues,
        actions: FormikHelpers<CreateCommentFormValues>
    ) => void;
    onToggleCommentReaction: (post: IPost, comment: IComment, reaction: TReaction) => Promise<void>;
    onEditCommentSubmit: (
        post: IPost,
        comment: IComment,
        values: EditCommentFormValues,
        actions: FormikHelpers<EditCommentFormValues>
    ) => Promise<void>;
    userLoading: boolean;
    onRevokeOutgoingFriendRequestButtonClick: () => void;
    onAddFriendButtonClick: () => void;
    onAcceptIncomingFriendRequestButtonClick: () => void;
    onDeclineIncomingFriendRequestButtonClick: () => void;
    onDeleteFriend: () => Promise<void>;
    onTimelineButtonClick: () => void;
    onFriendsButtonClick: () => void;
    userBirthDate?: Date;
    userBirthCountry?: string;
    userBirthCity?: string;
    userCurrentCountry?: string;
    userCurrentCity?: string;
};

const UserTimelineScreenComponent = ({
    userName,
    posts,
    onCreatePostSubmit,
    onPostDeleteClick,
    onPostReactionCountButtonClick,
    onUserProfileClick,
    onCommentDeleteButtonClick,
    onCommentReactionCountButtonClick,
    reactionListModalVisible,
    onReactionListModalClose,
    onReactionListModalTabChange,
    reactionListReactionItems,
    reactionListLoadMoreItemsButtonVisible,
    onReactionListLoadMoreItemsButtonClick,
    reactionListLoading,
    deletePostAlertDialogVisible,
    onDeletePostAlertDialogClose,
    onDeletePostAlertDialogConfirmButtonClick,
    deletePostAlertDialogConfirmButtonLoading,
    deleteCommentAlertDialogVisible,
    onDeleteCommentAlertDialogClose,
    onDeleteCommentAlertDialogConfirmButtonClick,
    deleteCommentAlertDialogConfirmButtonLoading,
    postsLoading,
    loadMorePostsButtonVisible,
    onLoadMorePostsButtonClick,
    userEqualSelf,
    alreadyFriend,
    friendRequestIncoming,
    friendRequestAlreadySent,
    onTogglePostReaction,
    onEditPostSubmit,
    onLoadCommentsForPost,
    onLoadMoreCommentsForPost,
    onCreateCommentForPostSubmit,
    onToggleCommentReaction,
    onEditCommentSubmit,
    userLoading,
    onRevokeOutgoingFriendRequestButtonClick,
    onAddFriendButtonClick,
    onAcceptIncomingFriendRequestButtonClick,
    onDeclineIncomingFriendRequestButtonClick,
    onDeleteFriend,
    onTimelineButtonClick,
    onFriendsButtonClick,
    userBirthDate,
    userBirthCountry,
    userBirthCity,
    userCurrentCountry,
    userCurrentCity,
}: TProps) => {
    const { colorMode } = useColorMode();

    return (
        <MainLayout>
            <ProfileLayout
                userName={userName}
                activeTab="timeline"
                userEqualSelf={userEqualSelf}
                alreadyFriend={alreadyFriend}
                friendRequestIncoming={friendRequestIncoming}
                friendRequestAlreadySent={friendRequestAlreadySent}
                userLoading={userLoading}
                onRevokeOutgoingFriendRequestButtonClick={onRevokeOutgoingFriendRequestButtonClick}
                onAddFriendButtonClick={onAddFriendButtonClick}
                onAcceptIncomingFriendRequestButtonClick={onAcceptIncomingFriendRequestButtonClick}
                onDeclineIncomingFriendRequestButtonClick={onDeclineIncomingFriendRequestButtonClick}
                onDeleteFriend={onDeleteFriend}
                onTimelineButtonClick={onTimelineButtonClick}
                onFriendsButtonClick={onFriendsButtonClick}
            >
                <div className="flex justify-center sm:pl-16">
                    <div className="flex w-full flex-wrap items-start justify-start py-8 px-4 sm:w-[80%] sm:max-w-[1000px] sm:px-0 md:flex-nowrap">
                        <div
                            className={`mb-6 flex w-full flex-shrink-0 flex-col space-y-2 rounded-md bg-white p-4 drop-shadow-md md:mr-6 md:w-[150px] lg:w-[250px] ${
                                colorMode === "dark" ? "bg-slate-600" : "bg-white"
                            }`}
                        >
                            <span className="text-xl font-semibold">Névjegy</span>
                            {userLoading && <span>Betöltés alatt...</span>}
                            {!userLoading && (
                                <>
                                    {userBirthDate && (
                                        <div className="">Született: {convertDate2DateString(userBirthDate)}</div>
                                    )}
                                    {(userBirthCountry || userBirthCity) && (
                                        <div className="">
                                            Születési hely: {userBirthCountry} {userBirthCity}
                                        </div>
                                    )}
                                    {(userCurrentCountry || userCurrentCity) && (
                                        <div className="">
                                            Jelenlegi hely: {userCurrentCountry} {userCurrentCity}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        {userLoading && (
                            <div className="mt-8 flex flex-grow justify-center">
                                <div className="flex justify-center">
                                    <ColorModeSpinner size="xl" />
                                </div>
                            </div>
                        )}
                        {(userEqualSelf || alreadyFriend) && !userLoading && (
                            <div className="flex-grow">
                                <div className="flex w-full flex-col">
                                    <CreatePost
                                        placeholder={`Írj valamit ${userName} idővonalára`}
                                        onSubmit={onCreatePostSubmit}
                                    />
                                    <PostList
                                        posts={posts}
                                        onPostDeleteButtonClick={onPostDeleteClick}
                                        onPostReactionCountButtonClick={onPostReactionCountButtonClick}
                                        onCommentDeleteButtonClick={onCommentDeleteButtonClick}
                                        onCommentReactionCountButtonClick={onCommentReactionCountButtonClick}
                                        postsLoading={postsLoading}
                                        loadMorePostsButtonVisible={loadMorePostsButtonVisible}
                                        onLoadMorePostsButtonClick={onLoadMorePostsButtonClick}
                                        onTogglePostReaction={onTogglePostReaction}
                                        onEditPostSubmit={onEditPostSubmit}
                                        onLoadCommentsForPost={onLoadCommentsForPost}
                                        onLoadMoreCommentsForPost={onLoadMoreCommentsForPost}
                                        onCreateCommentForPostSubmit={onCreateCommentForPostSubmit}
                                        onToggleCommentReaction={onToggleCommentReaction}
                                        onEditCommentSubmit={onEditCommentSubmit}
                                    />
                                </div>
                            </div>
                        )}
                        {!userEqualSelf && !alreadyFriend && !userLoading && (
                            <div
                                className={`flex-grow rounded-md p-4 drop-shadow-md ${
                                    colorMode === "dark" ? "bg-slate-600" : "bg-white"
                                }`}
                            >
                                <p>
                                    <span className="font-semibold">{userName}</span> még nem a barátod, ezért nem
                                    láthatod az idővonalát.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </ProfileLayout>
            <ReactionListModal
                visible={reactionListModalVisible}
                onClose={onReactionListModalClose}
                onTabChange={onReactionListModalTabChange}
                reactionItems={reactionListReactionItems}
                loadMoreItemsButtonVisible={reactionListLoadMoreItemsButtonVisible}
                onLoadMoreItemsButtonClick={onReactionListLoadMoreItemsButtonClick}
                onUserProfileClick={onUserProfileClick}
                loading={reactionListLoading}
            />
            <DeletePostAlertDialog
                visible={deletePostAlertDialogVisible}
                onClose={onDeletePostAlertDialogClose}
                onConfirmButtonClick={onDeletePostAlertDialogConfirmButtonClick}
                confirmButtonLoading={deletePostAlertDialogConfirmButtonLoading}
            />
            <DeleteCommentAlertDialog
                visible={deleteCommentAlertDialogVisible}
                onClose={onDeleteCommentAlertDialogClose}
                onConfirmButtonClick={onDeleteCommentAlertDialogConfirmButtonClick}
                confirmButtonLoading={deleteCommentAlertDialogConfirmButtonLoading}
            />
        </MainLayout>
    );
};

export default UserTimelineScreenComponent;
