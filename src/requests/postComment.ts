import { EndpointsEnum, HttpMethodsEnum, LocalStorageEnum } from '@/enums';
import { CommentFormValues } from '@/types/postTypes';

const postComment = async (values: CommentFormValues) => {
    const accessToken = localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN);

    return fetch(EndpointsEnum.COMMENT, {
        method: HttpMethodsEnum.POST,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(values),
    });
};
export default postComment;
