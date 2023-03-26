export const RoutesEnum = {
    HOME: '/',
    POSTS: 'posts',
    POST: (id: string) => `posts/${id}`,
    CATEGORIES: 'categories',
    CREATE: 'create',
    LOGIN: 'login'
};
