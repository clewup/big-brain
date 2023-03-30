import { EndpointsEnum, HttpMethodsEnum, LocalStorageEnum } from '@/enums';
import { PostFormValues } from '@/types';

const postPost = async (values: PostFormValues) => {
    const accessToken = localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN);

    return fetch(EndpointsEnum.POST, {
        method: HttpMethodsEnum.POST,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(values),
    });
};
export default postPost;
