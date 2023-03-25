import { EndpointsEnum } from '@/enums';

const getCategories = async () => {
    return fetch(EndpointsEnum.CATEGORY)
}

export default getCategories;