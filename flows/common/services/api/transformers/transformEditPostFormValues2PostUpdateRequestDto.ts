import { EditPostFormValues } from "../../commonTypes";
import { PostUpdateRequestDto } from "../../../../../generated/api";

export const transformEditPostFormValues2PostUpdateRequestDto = (
    editPostFormValues: EditPostFormValues
): PostUpdateRequestDto => {
    return {
        header: editPostFormValues.header ? editPostFormValues.header : undefined,
        content: editPostFormValues.content,
    };
};
