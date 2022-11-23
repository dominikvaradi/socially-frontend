import { CreatePostFormValues } from "../../commonTypes";
import { PostCreateRequestDto } from "../../../../../generated/api";

export const transformCreatePostFormValues2PostCreateRequestDto = (
    createPostFormValues: CreatePostFormValues
): PostCreateRequestDto => {
    return {
        header: createPostFormValues.header ? createPostFormValues.header : undefined,
        content: createPostFormValues.content,
    };
};
