import { EndpointsEnum, HttpMethodsEnum } from '@/enums';
import { PostFormValues } from '@/types';

const postPost = async (values: PostFormValues) => {
    return fetch(EndpointsEnum.POST, {
        method: HttpMethodsEnum.POST,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
};
export default postPost;
