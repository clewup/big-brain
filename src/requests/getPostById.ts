import { EndpointsEnum, HttpMethodsEnum } from '@/enums';

const getPostById = async (id: string) => {
    return fetch(EndpointsEnum.POST_BY_ID(id), {
        method: HttpMethodsEnum.GET,
    })
}

export default getPostById;