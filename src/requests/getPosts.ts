import { EndpointsEnum, HttpMethodsEnum } from '@/enums';

const getPosts = async () => {
    return fetch(EndpointsEnum.POST, {
        method: HttpMethodsEnum.GET,
    });
};

export default getPosts;
