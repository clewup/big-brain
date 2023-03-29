import { EndpointsEnum } from '@/enums';
import { UserType } from '@/types';

interface Request {
    user: UserType;
}

const getTags = async ({user}: Request) => {
    return fetch(EndpointsEnum.TAG, {
        headers: {
            'x-customer': `${user.customer}`
        }
    });
};

export default getTags;
