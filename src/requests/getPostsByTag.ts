import { EndpointsEnum, HttpMethodsEnum, LocalStorageEnum } from '@/enums';

const getPostsByTag = async (tag: string) => {
    const accessToken = localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN);

    return fetch(EndpointsEnum.POSTS_BY_TAG(tag), {
        method: HttpMethodsEnum.GET,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export default getPostsByTag;
