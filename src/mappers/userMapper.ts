import { UserType } from '@/types';
import { PublicUserType } from '@/types/userTypes';

const publicUserMapper = (user: UserType): PublicUserType => {
    return {
        id: user.id,
        username: user.email.match(/^[^@]*/)?.[0] || 'Randy Random',
    };
};

export { publicUserMapper };
