export const EndpointsEnum = {
    POST: '/api/post',
    TAG: 'api/tag',
    POSTS_BY_TAG: (tag: string) => `/api/post/tag/${tag}`,
    POST_BY_ID: (id: number) => `/api/post/${id}`,

    CLOUDINARY_UPLOAD: 'https://api.cloudinary.com/v1_1/dliog6kq6/image/upload',
    ACCESS_TOKEN: 'https://auth.clewup.co.uk/api/token',
};
