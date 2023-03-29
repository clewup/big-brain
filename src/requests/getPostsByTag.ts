import { EndpointsEnum, HttpMethodsEnum } from '@/enums';
import { UserType } from '@/types';

interface Request {
tag: string;
user: UserType;
}

const getPostsByTag = async ({tag, user}: Request) => {
    return fetch(EndpointsEnum.POSTS_BY_TAG(tag), {
        method: HttpMethodsEnum.GET,
        headers: {
            'x-customer': `${user.customer}`
        }
    });
};

export default getPostsByTag;
