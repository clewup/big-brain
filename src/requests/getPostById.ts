import { EndpointsEnum, HttpMethodsEnum } from '@/enums';
import { UserType } from '@/types';

interface Request {
    id: number;
    user: UserType;
}

const getPostById = async ({id, user}: Request) => {
    return fetch(EndpointsEnum.POST_BY_ID(id), {
        method: HttpMethodsEnum.GET,
        headers: {
            'x-customer': `${user.customer}`
        }
    });
};

export default getPostById;
