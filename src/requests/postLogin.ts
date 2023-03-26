import { EndpointsEnum, HttpMethodsEnum } from '@/enums';
import { UserLoginType } from '@/types';

const postLogin = async (userLogin: UserLoginType) => {
    return fetch(EndpointsEnum.AUTH_LOGIN, {
        method: HttpMethodsEnum.POST,
        body: JSON.stringify(userLogin),
    });
};

export default postLogin;
