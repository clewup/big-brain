import { EndpointsEnum, HttpMethodsEnum, LocalStorageEnum } from '@/enums';

const getPosts = async () => {
    const accessToken = localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN);

    return fetch(EndpointsEnum.POST, {
        method: HttpMethodsEnum.GET,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export default getPosts;
