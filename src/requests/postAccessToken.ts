import { EndpointsEnum, HttpMethodsEnum } from '@/enums';

const postAccessToken = async (code: string) => {
    return fetch(EndpointsEnum.ACCESS_TOKEN, {
        method: HttpMethodsEnum.POST,
        body: JSON.stringify({code: code})
    });
};

export default postAccessToken;
