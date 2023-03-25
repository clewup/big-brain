import { EndpointsEnum, HttpMethodsEnum } from '@/enums';
import { BlogPostFormValues } from '@/types';

const postPost = async (values: BlogPostFormValues) => {
    return fetch(EndpointsEnum.POST, {
        method: HttpMethodsEnum.POST,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
}
export default postPost;