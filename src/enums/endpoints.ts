export const Endpoints = {
  BLOG_POST: "/api/blogpost",
  BLOG_POST_BY_CATEGORY: (category: string) =>
    `/api/blogpost?category=${category}`,
  BLOG_POST_BY_ID: (id: number) => `/api/blogpost?id=${id}`,

  CLOUDINARY_UPLOAD: "https://res.cloudinary.com/clewup/image/upload",
};
