export const EndpointsEnum = {
    POST: '/api/post',
    CATEGORY: 'api/category',
    POST_BY_CATEGORY: (category: string) => `/api/post/category/${category}`,
    POST_BY_ID: (id: string) => `/api/post/${id}`,

    CLOUDINARY_UPLOAD: 'https://api.cloudinary.com/v1_1/dliog6kq6/image/upload',
    ACCESS_TOKEN: 'https://www.auth.clewup.co.uk/token'
};
