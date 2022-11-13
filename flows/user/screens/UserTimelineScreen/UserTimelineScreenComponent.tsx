import { useColorMode } from "@chakra-ui/react";
import React from "react";
import CreatePost from "../../../common/components/CreatePost";
import MainLayout from "../../../common/components/MainLayout";
import ProfileLayout from "../../components/ProfileLayout";
import { CreatePostFormValues, IPost, IReactionListItem, TReaction } from "../../../common/services/commonTypes";
import PostList from "../../../common/components/PostList";
import ReactionListModal from "../../../common/components/ReactionListModal";
import DeletePostAlertDialog from "../../../common/components/DeletePostAlertDialog";
import DeleteCommentAlertDialog from "../../../common/components/DeleteCommentAlertDialog";
import { FormikHelpers } from "formik";

type TProps = {
    userName: string;
    posts: IPost[];
    onCreatePostSubmit: (values: CreatePostFormValues, actions: FormikHelpers<CreatePostFormValues>) => void;
    onPostDeleteClick: (postId: string) => void;
    onPostReactionCountButtonClick: (postId: string) => void;
    onUserProfileClick: (userId: string) => void;
    onCommentDeleteButtonClick: (commentId: string) => void;
    onCommentReactionCountButtonClick: (commentId: string) => void;
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
    deleteCommentAlertDialogVisible: boolean;
    onDeleteCommentAlertDialogClose: () => void;
    onDeleteCommentAlertDialogConfirmButtonClick: () => void;
    postsLoading: boolean;
    loadMorePostsButtonVisible: boolean;
    onLoadMorePostsButtonClick: () => void;
    userSelf: boolean;
    alreadyFriend: boolean;
    friendRequestIncoming: boolean;
    friendRequestAlreadySent: boolean;
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
    deleteCommentAlertDialogVisible,
    onDeleteCommentAlertDialogClose,
    onDeleteCommentAlertDialogConfirmButtonClick,
    postsLoading,
    loadMorePostsButtonVisible,
    onLoadMorePostsButtonClick,
    userSelf,
    alreadyFriend,
    friendRequestIncoming,
    friendRequestAlreadySent,
}: TProps) => {
    const { colorMode } = useColorMode();

    return (
        <MainLayout>
            <ProfileLayout
                userName={userName}
                activeTab="timeline"
                userSelf={userSelf}
                alreadyFriend={alreadyFriend}
                friendRequestIncoming={friendRequestIncoming}
                friendRequestAlreadySent={friendRequestAlreadySent}
            >
                <div className="flex justify-center sm:pl-16">
                    <div className="flex w-full flex-wrap items-start justify-start py-8 px-4 sm:w-[80%] sm:max-w-[1000px] sm:px-0 md:flex-nowrap">
                        <div
                            className={`mb-6 flex w-full flex-shrink-0 flex-col space-y-2 rounded-md bg-white p-4 drop-shadow-md md:mr-6 md:w-[150px] lg:w-[250px] ${
                                colorMode === "dark" ? "bg-slate-600" : "bg-white"
                            }`}
                        >
                            <span className="text-xl font-semibold">Névjegy</span>
                            <div className="">Született: 2000. szeptember 15.</div>
                            <div className="">Születési hely: Japan, Leaf Village</div>
                            <div className="">Jelenlegi hely: Japán, Leaf Village modern version</div>
                        </div>
                        {(userSelf || alreadyFriend) && (
                            <div className="flex-grow">
                                <div className="flex w-full flex-col">
                                    <CreatePost
                                        placeholder="Írj valamit Naruto idővonalára"
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
                                    />
                                </div>
                            </div>
                        )}
                        {!userSelf && !alreadyFriend && (
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
            />
            <DeleteCommentAlertDialog
                visible={deleteCommentAlertDialogVisible}
                onClose={onDeleteCommentAlertDialogClose}
                onConfirmButtonClick={onDeleteCommentAlertDialogConfirmButtonClick}
            />
        </MainLayout>
    );
};

export default UserTimelineScreenComponent;
