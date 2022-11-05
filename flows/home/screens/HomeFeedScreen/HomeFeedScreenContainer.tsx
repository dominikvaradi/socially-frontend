import React, { useState } from "react";
import HomeFeedScreenComponent from "./HomeFeedScreenComponent";
import {
    CreateCommentFormValues,
    CreatePostFormValues,
    IPost,
    IReactionListItem,
    TReaction,
} from "../../../common/services/commonTypes";
import { FormikHelpers } from "formik";

const HomeFeedScreenContainer = () => {
    const [reactionListModalVisible, setReactionListModalVisible] = useState<boolean>(false);
    const [reactionListReactionItems, setReactionListReactionItems] =
        useState<IReactionListItem[]>(mockReactionListReactionItems);
    const [reactionListLoadMoreItemsButtonVisible, setReactionListLoadMoreItemsButtonVisible] = useState<boolean>(true);
    const [reactionListLoading, setReactionListLoading] = useState<boolean>(false);
    const [deletePostAlertDialogPostId, setDeletePostAlertDialogPostId] = useState<string | undefined>(undefined);
    const [deleteCommentAlertDialogCommentId, setDeleteCommentAlertDialogCommentId] = useState<string | undefined>(
        undefined
    );

    const handleCreatePostSubmit = (values: CreatePostFormValues, actions: FormikHelpers<CreatePostFormValues>) => {
        setTimeout(() => {
            const header = values.header.trim();
            const content = values.content.trim();

            console.log("post created\nHeader: " + (header || "undefined") + "\nContent: " + content);
            actions.resetForm();
        }, 500);
    };

    const handlePostEditClick = (postId: string) => {
        console.log("handlePostEditClick: " + postId);
    };

    const handlePostDeleteClick = (postId: string) => {
        setDeletePostAlertDialogPostId(postId);
    };

    const handlePostReactionCountButtonClick = (postId: string) => {
        setReactionListModalVisible(true);
        console.log("handlePostReactionCountButtonClick: " + postId);
    };

    const handlePostToggleReactionButtonClick = (postId: string, reaction: TReaction) => {
        console.log("handlePostToggleReactionButtonClick: " + postId + ", " + reaction);
    };

    const handleUserProfileClick = (userId: string) => {
        console.log("handleUserProfileClick: " + userId);
    };

    const handleCommentToggleReactionButtonClick = (commentId: string, reaction: TReaction) => {
        console.log("handleCommentToggleReactionButtonClick: " + commentId + ", " + reaction);
    };

    const handleCreateCommentSubmit = (
        postId: string,
        values: CreateCommentFormValues,
        actions: FormikHelpers<CreateCommentFormValues>
    ) => {
        setTimeout(() => {
            const content = values.content.trim();

            console.log("comment created for post: " + postId + "\nContent: " + content);

            actions.resetForm();
        }, 500);
    };

    const handleCommentEditButtonClick = (commentId: string) => {
        console.log("handleCommentEditButtonClick: " + commentId);
    };

    const handleCommentDeleteButtonClick = (commentId: string) => {
        setDeleteCommentAlertDialogCommentId(commentId);
    };

    const handleCommentReactionCountButtonClick = (commentId: string) => {
        console.log("handleCommentReactionCountButtonClick: " + commentId);
    };

    const handleReactionListModalClose = () => {
        setReactionListModalVisible(false);
    };

    const handleReactionListModalTabChange = (reaction?: TReaction) => {
        console.log("handleReactionListModalTabChange: " + reaction);
    };

    const handleReactionListLoadMoreItemsButtonClick = () => {
        console.log("handleReactionListLoadMoreItemsButtonClick");
    };

    const handleDeletePostAlertDialogClose = () => {
        setDeletePostAlertDialogPostId(undefined);
    };

    const handleDeletePostAlertDialogConfirmButtonClick = () => {
        if (!deletePostAlertDialogPostId) return;

        console.log("handleDeletePostAlertDialogConfirmButtonClick: " + deletePostAlertDialogPostId);
        setDeletePostAlertDialogPostId(undefined);
    };

    const handleDeleteCommentAlertDialogClose = () => {
        setDeleteCommentAlertDialogCommentId(undefined);
    };

    const handleDeleteCommentAlertDialogConfirmButtonClick = () => {
        if (!deleteCommentAlertDialogCommentId) return;

        console.log("handleDeleteCommentAlertDialogConfirmButtonClick: " + deleteCommentAlertDialogCommentId);
        setDeleteCommentAlertDialogCommentId(undefined);
    };

    const handleLoadMorePostsButtonClick = () => {
        console.log("handleLoadMorePostsButtonClick");
    };

    return (
        <HomeFeedScreenComponent
            posts={mockPosts}
            onCreatePostSubmit={handleCreatePostSubmit}
            onPostEditClick={handlePostEditClick}
            onPostDeleteClick={handlePostDeleteClick}
            onPostReactionCountButtonClick={handlePostReactionCountButtonClick}
            onPostToggleReactionButtonClick={handlePostToggleReactionButtonClick}
            onUserProfileClick={handleUserProfileClick}
            onCommentToggleReactionButtonClick={handleCommentToggleReactionButtonClick}
            onCreateCommentSubmit={handleCreateCommentSubmit}
            onCommentEditButtonClick={handleCommentEditButtonClick}
            onCommentDeleteButtonClick={handleCommentDeleteButtonClick}
            onCommentReactionCountButtonClick={handleCommentReactionCountButtonClick}
            reactionListModalVisible={reactionListModalVisible}
            onReactionListModalClose={handleReactionListModalClose}
            onReactionListModalTabChange={handleReactionListModalTabChange}
            reactionListReactionItems={reactionListReactionItems}
            reactionListLoadMoreItemsButtonVisible={reactionListLoadMoreItemsButtonVisible}
            onReactionListLoadMoreItemsButtonClick={handleReactionListLoadMoreItemsButtonClick}
            reactionListLoading={reactionListLoading}
            deletePostAlertDialogVisible={!!deletePostAlertDialogPostId}
            onDeletePostAlertDialogClose={handleDeletePostAlertDialogClose}
            onDeletePostAlertDialogConfirmButtonClick={handleDeletePostAlertDialogConfirmButtonClick}
            deleteCommentAlertDialogVisible={!!deleteCommentAlertDialogCommentId}
            onDeleteCommentAlertDialogClose={handleDeleteCommentAlertDialogClose}
            onDeleteCommentAlertDialogConfirmButtonClick={handleDeleteCommentAlertDialogConfirmButtonClick}
            postsLoading={false}
            loadMorePostsButtonVisible={true}
            onLoadMorePostsButtonClick={handleLoadMorePostsButtonClick}
        />
    );
};

export default HomeFeedScreenContainer;

const mockPosts: IPost[] = [
    {
        id: "0",
        content: "Lorem ipsum.",
        authorId: "0",
        authorName: "Naruto Uzumaki",
        commentCount: 0,
        createdTimeString: "2 perce",
        reactionCount: {
            likeCount: 1,
            heartCount: 0,
            funnyCount: 0,
            angryCount: 0,
        },
    },
    {
        id: "1",
        header: "Mock Post - Lorem Ipsum",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet leo nibh. Donec a dolor dictum eros finibus posuere quis non mauris. Morbi dictum tempor elit non rhoncus. Vivamus non rhoncus velit. Curabitur convallis id eros ac suscipit. Praesent aliquet sagittis facilisis. Curabitur posuere mi id faucibus ullamcorper. Suspendisse nulla ex, aliquam gravida enim eu, euismod luctus eros. Aenean eu urna fermentum, finibus tortor ac, pretium dolor. Vivamus finibus sapien et augue condimentum dignissim.",
        authorId: "0",
        authorName: "Naruto Uzumaki",
        commentCount: 0,
        createdTimeString: "14 perce",
        reactionCount: {
            likeCount: 1,
            heartCount: 0,
            funnyCount: 0,
            angryCount: 0,
        },
    },
    {
        id: "2",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet leo nibh. Donec a dolor dictum eros finibus posuere quis non mauris. Morbi dictum tempor elit non rhoncus. Vivamus non rhoncus velit. Curabitur convallis id eros ac suscipit. Praesent aliquet sagittis facilisis. Curabitur posuere mi id faucibus ullamcorper. Suspendisse nulla ex, aliquam gravida enim eu, euismod luctus eros. Aenean eu urna fermentum, finibus tortor ac, pretium dolor. Vivamus finibus sapien et augue condimentum dignissim.",
        authorId: "0",
        authorName: "Hubert Blaine Wolfe­schlegel­stein­hausen­berger­dorff Sr.",
        commentCount: 3,
        createdTimeString: "28 perce",
        reactionCount: {
            likeCount: 3,
            heartCount: 2,
            funnyCount: 0,
            angryCount: 0,
        },
    },
    {
        id: "3",
        header: "Mock Post - Lorem Ipsum",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum leo sed nisl aliquam viverra. Nunc dapibus urna id ante placerat porta. Nam vel orci id mi iaculis pellentesque. Suspendisse a mi sollicitudin, lobortis ipsum quis, placerat tellus. Vivamus sit amet semper dui. Ut luctus quam a magna semper vestibulum. Praesent id nisl quis augue iaculis convallis suscipit eget ligula. Donec eget semper ante. Etiam at tristique risus. Donec molestie quis dui et varius. Morbi lobortis lacus et felis posuere, in tristique nunc sagittis. Mauris efficitur ullamcorper eros sed ultricies.\n" +
            "\n" +
            "Phasellus felis augue, iaculis ac eros vel, sollicitudin hendrerit ante. Nam efficitur nisi sem, in pellentesque mauris iaculis a. Donec luctus nulla sed feugiat dignissim. Nam ut venenatis neque. Integer pellentesque efficitur mauris in auctor. Nunc leo urna, volutpat blandit arcu in, laoreet fringilla sapien. Integer ultricies diam sed neque imperdiet scelerisque. Quisque tortor risus, posuere at lacus vitae, accumsan fringilla lacus. Sed ac pulvinar mi, vel sodales nunc. Quisque sagittis magna in velit volutpat pellentesque.\n" +
            "\n" +
            "Cras sollicitudin mollis ultricies. Nulla maximus ac lorem eu convallis. Aliquam laoreet pharetra elit ac volutpat. In porttitor justo a magna rutrum, vitae sagittis enim tincidunt. Cras aliquam, enim quis blandit malesuada, nisl turpis tempor lectus, in egestas leo nisl vel lacus. Nunc tempus ultricies ipsum, quis consectetur dui auctor non. Maecenas et sapien sapien. In eleifend eros vel venenatis posuere. Cras sed ultricies sapien, vel dapibus quam. Nam interdum metus nec iaculis laoreet. Quisque viverra neque ante, id sagittis lectus pulvinar sit amet. Mauris rutrum eget eros in ornare. Aenean erat ipsum, hendrerit sit amet odio quis, bibendum venenatis diam.\n" +
            "\n" +
            "Nunc semper ullamcorper risus, id hendrerit odio euismod at. Sed id vulputate metus. Suspendisse quis massa dictum, pulvinar elit quis, sodales turpis. Vivamus gravida varius nisi, vel dictum ipsum molestie eu. Vivamus nec molestie nulla, quis efficitur sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut ut consectetur sem. Nullam bibendum sit amet dui quis scelerisque. Donec in nunc posuere, vulputate neque ac, mattis sapien. Mauris id augue at felis pellentesque interdum. Aenean euismod hendrerit enim, id pretium quam semper non.",
        authorId: "0",
        authorName: "Kovács-Nagyné Naruto Csillagvirág Narcisszusz Bonaventúra Szebasztián Esztella",
        commentCount: 5,
        createdTimeString: "1 órája",
        reactionCount: {
            likeCount: 0,
            heartCount: 0,
            funnyCount: 0,
            angryCount: 5,
        },
    },
    {
        id: "4",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet leo nibh. Donec a dolor dictum eros finibus posuere quis non mauris. Morbi dictum tempor elit non rhoncus. Vivamus non rhoncus velit. Curabitur convallis id eros ac suscipit. Praesent aliquet sagittis facilisis. Curabitur posuere mi id faucibus ullamcorper. Suspendisse nulla ex, aliquam gravida enim eu, euismod luctus eros. Aenean eu urna fermentum, finibus tortor ac, pretium dolor. Vivamus finibus sapien et augue condimentum dignissim.",
        authorId: "0",
        authorName: "Naruto Uzumaki",
        commentCount: 3,
        createdTimeString: "2 órája",
        reactionCount: {
            likeCount: 1,
            heartCount: 2,
            funnyCount: 0,
            angryCount: 0,
        },
    },
    {
        id: "5",
        header: "Mock Post - Lorem Ipsum",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet leo nibh. Donec a dolor dictum eros finibus posuere quis non mauris. Morbi dictum tempor elit non rhoncus. Vivamus non rhoncus velit. Curabitur convallis id eros ac suscipit. Praesent aliquet sagittis facilisis. Curabitur posuere mi id faucibus ullamcorper. Suspendisse nulla ex, aliquam gravida enim eu, euismod luctus eros. Aenean eu urna fermentum, finibus tortor ac, pretium dolor. Vivamus finibus sapien et augue condimentum dignissim.",
        authorId: "0",
        authorName: "Naruto Uzumaki",
        commentCount: 13,
        createdTimeString: "4 órája",
        reactionCount: {
            likeCount: 0,
            heartCount: 1,
            funnyCount: 1,
            angryCount: 0,
        },
    },
    {
        id: "6",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet leo nibh. Donec a dolor dictum eros finibus posuere quis non mauris. Morbi dictum tempor elit non rhoncus. Vivamus non rhoncus velit. Curabitur convallis id eros ac suscipit. Praesent aliquet sagittis facilisis. Curabitur posuere mi id faucibus ullamcorper. Suspendisse nulla ex, aliquam gravida enim eu, euismod luctus eros. Aenean eu urna fermentum, finibus tortor ac, pretium dolor. Vivamus finibus sapien et augue condimentum dignissim.",
        authorId: "0",
        authorName: "Naruto Uzumaki",
        commentCount: 20,
        createdTimeString: "5 órája",
        reactionCount: {
            likeCount: 10,
            heartCount: 8,
            funnyCount: 1,
            angryCount: 1,
        },
    },
    {
        id: "7",
        header: "Mock Post - Lorem Ipsum",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet leo nibh. Donec a dolor dictum eros finibus posuere quis non mauris. Morbi dictum tempor elit non rhoncus. Vivamus non rhoncus velit. Curabitur convallis id eros ac suscipit. Praesent aliquet sagittis facilisis. Curabitur posuere mi id faucibus ullamcorper. Suspendisse nulla ex, aliquam gravida enim eu, euismod luctus eros. Aenean eu urna fermentum, finibus tortor ac, pretium dolor. Vivamus finibus sapien et augue condimentum dignissim.",
        authorId: "0",
        authorName: "Naruto Uzumaki",
        commentCount: 1,
        createdTimeString: "10 órája",
        reactionCount: {
            likeCount: 15,
            heartCount: 0,
            funnyCount: 0,
            angryCount: 0,
        },
    },
    {
        id: "8",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet leo nibh. Donec a dolor dictum eros finibus posuere quis non mauris. Morbi dictum tempor elit non rhoncus. Vivamus non rhoncus velit. Curabitur convallis id eros ac suscipit. Praesent aliquet sagittis facilisis. Curabitur posuere mi id faucibus ullamcorper. Suspendisse nulla ex, aliquam gravida enim eu, euismod luctus eros. Aenean eu urna fermentum, finibus tortor ac, pretium dolor. Vivamus finibus sapien et augue condimentum dignissim.",
        authorId: "0",
        authorName: "Naruto Uzumaki",
        commentCount: 0,
        createdTimeString: "10 órája",
        reactionCount: {
            likeCount: 0,
            heartCount: 4,
            funnyCount: 20,
            angryCount: 0,
        },
    },
    {
        id: "9",
        header: "Mock Post - Lorem Ipsum",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet leo nibh. Donec a dolor dictum eros finibus posuere quis non mauris. Morbi dictum tempor elit non rhoncus. Vivamus non rhoncus velit. Curabitur convallis id eros ac suscipit. Praesent aliquet sagittis facilisis. Curabitur posuere mi id faucibus ullamcorper. Suspendisse nulla ex, aliquam gravida enim eu, euismod luctus eros. Aenean eu urna fermentum, finibus tortor ac, pretium dolor. Vivamus finibus sapien et augue condimentum dignissim.",
        authorId: "0",
        authorName: "Naruto Uzumaki",
        commentCount: 20,
        createdTimeString: "1 napja",
        reactionCount: {
            likeCount: 0,
            heartCount: 0,
            funnyCount: 0,
            angryCount: 0,
        },
    },
    {
        id: "10",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum arcu quis posuere porttitor. Donec sed leo et mi dignissim congue a sit amet lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus viverra iaculis ullamcorper. Quisque nec ex blandit tellus commodo interdum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer vel bibendum nisl, non lacinia massa. Nam iaculis tempor est in sagittis. In vel porttitor metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas sed tellus tempor, fringilla enim ac, bibendum quam. Nam blandit pharetra dui, vel pretium felis mollis et. Aliquam et arcu velit. In molestie ac dolor ut dignissim. Aenean lobortis efficitur tortor sit amet semper. Curabitur non nulla sodales, venenatis lorem nec, mattis lorem.\n" +
            "\n" +
            "Donec in blandit elit. Nulla venenatis ut arcu vel euismod. Mauris finibus libero vitae semper pulvinar. Vivamus nec arcu dui. Quisque accumsan vulputate quam, at finibus massa porta quis. Nullam tincidunt sollicitudin porta. Morbi fringilla sit amet arcu sed ultricies. Maecenas enim turpis, blandit quis erat vel, eleifend scelerisque lorem. Duis nec leo lectus. Cras dolor massa, aliquet nec fermentum a, gravida ut sapien. Nam ac scelerisque turpis. Etiam tortor neque, feugiat id lectus eu, sagittis porta tortor. Vivamus in ipsum at mi mattis lobortis ac blandit ligula.\n" +
            "\n" +
            "Cras in hendrerit enim. Morbi eget felis malesuada, mollis arcu non, tempor justo. Mauris velit nisi, molestie id egestas vel, eleifend nec nibh. Pellentesque nec euismod odio, eu consequat lacus. Mauris non erat vel libero accumsan sollicitudin vel vitae ante. Phasellus id elementum libero. Curabitur pellentesque maximus turpis, vel suscipit enim condimentum id. Nullam ut ex ut elit interdum fringilla quis eget nibh. Praesent ac gravida purus.\n" +
            "\n" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec ante venenatis, aliquet ipsum sit amet, lobortis mi. Quisque consequat, erat vel pellentesque ultricies, turpis lacus iaculis lacus, sed laoreet nibh eros a erat. Cras vel suscipit metus. Morbi euismod turpis a aliquam consequat. Fusce nibh velit, aliquam a tortor at, commodo rutrum nibh. Curabitur consectetur ligula augue, ut fringilla mi rutrum id. Fusce in purus turpis. Ut vehicula quam sed mauris pellentesque pulvinar. Duis ac tellus scelerisque, dictum elit at, volutpat arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut viverra sodales massa, ut eleifend nulla pretium nec.\n" +
            "\n" +
            "Cras non posuere tellus, a tincidunt quam. Suspendisse in consectetur nibh. In egestas mollis ligula, id dictum velit molestie id. Integer consequat mi ligula, a egestas nisl viverra quis. Nulla tincidunt orci sit amet pretium fringilla. Integer quis elit quis quam hendrerit posuere in ut dolor. Duis ut convallis turpis.\n" +
            "\n" +
            "Sed non magna diam. Donec iaculis tellus eros, non tempor ante venenatis scelerisque. Duis vitae felis libero. Nunc consequat sollicitudin lorem nec hendrerit. Nam accumsan tortor eget aliquam gravida. Donec auctor, diam luctus commodo tempor, sapien orci efficitur felis, vel semper lorem leo eget massa. Praesent tincidunt neque erat, sit amet consequat mi condimentum eu. Nullam cursus velit sapien, nec pharetra tortor fringilla pharetra. Suspendisse quis venenatis neque.\n" +
            "\n" +
            "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam ac metus a lacus hendrerit facilisis et sit amet lorem. Sed feugiat, quam pellentesque iaculis accumsan, eros leo tempor urna, eu rutrum neque tellus id nulla. Cras sed tincidunt sapien. Ut eleifend dolor sit amet iaculis hendrerit. Nulla libero mauris, luctus a nulla id, lacinia ultricies velit. Fusce tincidunt rutrum sem ac sollicitudin. Maecenas feugiat facilisis diam, sit amet molestie turpis egestas ut.\n" +
            "\n" +
            "Proin nec laoreet purus, non auctor enim. Nunc lorem massa, venenatis a ligula a, aliquet rutrum turpis. Maecenas congue posuere suscipit. In pellentesque dolor sapien, sed semper lorem tincidunt eget. Duis vehicula, libero at tempus cursus, purus libero faucibus nibh, vitae sollicitudin mauris ligula ac nibh. Phasellus fermentum, quam ut tristique pharetra, nisl nisl laoreet enim, lacinia molestie mi odio eu lacus. Aenean tortor enim, faucibus non dui id, ultricies convallis orci. Etiam ut leo mi. Curabitur non finibus eros, ut hendrerit sapien. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam mattis quam vel felis vulputate, eu dignissim ex fringilla. Ut aliquet auctor neque, ut eleifend arcu viverra non. Aliquam erat volutpat.\n" +
            "\n" +
            "Fusce eget sem eget velit mollis consequat. In ut pretium orci, nec mattis orci. In at turpis eget justo lobortis efficitur quis eget diam. Curabitur eu mauris sit amet purus posuere fermentum. Proin vestibulum aliquam ante eget blandit. Ut at ex sed eros tincidunt tincidunt vitae id lorem. Pellentesque euismod velit et metus tempus bibendum. Maecenas ut dictum augue. Maecenas vitae ipsum et tortor accumsan euismod nec vitae leo. Proin in dui massa. Integer accumsan, libero quis facilisis accumsan, augue nunc varius massa, non elementum mauris nisi ac nunc. Sed faucibus vulputate tortor ut bibendum. Fusce mi diam, feugiat a venenatis sed, vulputate et massa. Phasellus interdum metus neque, quis ultrices magna aliquet sed. Pellentesque suscipit semper dictum. Nulla facilisi.\n" +
            "\n" +
            "Integer tristique, nunc vel auctor lobortis, magna elit commodo metus, in bibendum elit lacus finibus nibh. Proin quis fermentum turpis. Etiam egestas lacus ex, ac accumsan mi tristique sed. Suspendisse condimentum, lectus sit amet aliquet maximus, dui risus suscipit nisl, in rhoncus leo dui ac lacus. Nunc non consequat lacus. Sed imperdiet sed justo ac venenatis. Nulla semper auctor ipsum id ullamcorper. Phasellus vehicula, ligula non efficitur mollis, est sapien pulvinar nunc, quis tincidunt orci erat sed quam. Vivamus ut lacinia diam, imperdiet dapibus enim.",
        authorId: "0",
        authorName: "Naruto Uzumaki",
        commentCount: 2,
        createdTimeString: "2 napja",
        reactionCount: {
            likeCount: 0,
            heartCount: 0,
            funnyCount: 0,
            angryCount: 0,
        },
    },
];

const mockReactionListReactionItems: IReactionListItem[] = [
    {
        id: "0",
        userId: "0",
        userName: "Naruto Uzumaki",
        reaction: "LIKE",
    },
    {
        id: "1",
        userId: "1",
        userName: "Sasuke Uchiha",
        reaction: "FUNNY",
    },
    {
        id: "2",
        userId: "2",
        userName: "Sakura Haruno",
        reaction: "ANGRY",
    },
    {
        id: "3",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "4",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "5",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "6",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "7",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "8",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "9",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "10",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "11",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
    {
        id: "12",
        userId: "3",
        userName: "Hinata Hyuga",
        reaction: "HEART",
    },
];
