import { EndpointsEnum, HttpMethodsEnum } from '@/enums';

const postAccessToken = async (code: string) => {
    return fetch(EndpointsEnum.ACCESS_TOKEN, {
        method: HttpMethodsEnum.POST,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({code: code})
    });
};

export default postAccessToken;
