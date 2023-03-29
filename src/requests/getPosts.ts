import { EndpointsEnum, HttpMethodsEnum } from '@/enums';

interface Request {
    customer: number | undefined;
}

const getPosts = async ({customer}: Request) => {
    return fetch(EndpointsEnum.POST, {
        method: HttpMethodsEnum.GET,
        headers: {
            'x-customer': `${customer}`
        }
    });
};

export default getPosts;
