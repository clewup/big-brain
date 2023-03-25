import { EndpointsEnum, HttpMethodsEnum } from '@/enums';

const getPostsByCategory = async (category: string) => {
    return fetch(EndpointsEnum.POST_BY_CATEGORY(category), {
        method: HttpMethodsEnum.GET,
    });
};

export default getPostsByCategory;
