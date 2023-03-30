export const RoutesEnum = {
    HOME: '/',
    POSTS: '/posts',
    POST: (id: number) => `/posts/${id}`,
    TAGS: '/tags',
    CREATE: '/create',
};
