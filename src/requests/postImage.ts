import { EndpointsEnum, HttpMethodsEnum } from '@/enums';

const postImage = async (data: FormData) => {
    return fetch(EndpointsEnum.CLOUDINARY_UPLOAD, {
        method: HttpMethodsEnum.POST,
        body: data,
    });
};

export default postImage;
