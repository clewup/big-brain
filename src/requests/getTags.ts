import { EndpointsEnum, LocalStorageEnum } from '@/enums';

const getTags = async () => {
    const accessToken = localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN);

    return fetch(EndpointsEnum.TAG, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export default getTags;
