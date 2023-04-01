import { RolesEnum } from '@/enums';
import { UserType } from '@/types';

const mockUser: UserType = {
    id: 1,
    email: 'user@test.com',
    role: RolesEnum.USER,
};

export default mockUser;
