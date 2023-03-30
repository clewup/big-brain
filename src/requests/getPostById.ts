import { EndpointsEnum, HttpMethodsEnum, LocalStorageEnum } from '@/enums';

const getPostById = async (id: number) => {
    const accessToken = localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN);

    return fetch(EndpointsEnum.POST_BY_ID(id), {
        method: HttpMethodsEnum.GET,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export default getPostById;
