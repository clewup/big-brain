import { EndpointsEnum, HttpMethodsEnum, LocalStorageEnum } from '@/enums';

const getPostsBySearch = async (search: string) => {
    const accessToken = localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN);

    return fetch(EndpointsEnum.POSTS_BY_SEARCH(search), {
        method: HttpMethodsEnum.GET,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export default getPostsBySearch;
