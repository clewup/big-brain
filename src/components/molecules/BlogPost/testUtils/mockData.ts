import { BlogPost } from "@/types/blogPostTypes";
import { Category } from "@/enums/categories";

export const mockBlogPost: BlogPost = {
  _id: "1",
  title: "Mock Blog Post 1",
  image: "https://api.lorem.space/image/pizza?w=500&h=500",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula _id, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur r_idiculus mus." +
    "\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula _id, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur r_idiculus mus." +
    "\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula _id, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur r_idiculus mus." +
    "\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula _id, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur r_idiculus mus.",

  date: new Date(),
  tags: [Category.NEXTJS, Category.TYPESCRIPT],
};

export const mockBlogPosts: BlogPost[] = [
  mockBlogPost,
  {
    ...mockBlogPost,
    _id: "2",
    title: "Mock Blog Post 2",
    image: "https://api.lorem.space/image/burger?w=500&h=500",
    tags: [Category.REACT, Category.TYPESCRIPT],
  },
  {
    ...mockBlogPost,
    _id: "3",
    title: "Mock Blog Post 3",
    image: "https://api.lorem.space/image/drink?w=500&h=500",
    tags: [Category.HEROKU, Category.TYPESCRIPT],
  },
  {
    ...mockBlogPost,
    _id: "4",
    title: "Mock Blog Post 4",
    image: "https://api.lorem.space/image/watch?w=500&h=500",
    tags: [Category.DOTNET, Category.REACT],
  },
  {
    ...mockBlogPost,
    _id: "5",
    title: "Mock Blog Post 5",
    image: "https://api.lorem.space/image/furniture?w=500&h=500",
    tags: [Category.NEXTJS, Category.TYPESCRIPT],
  },
  {
    ...mockBlogPost,
    _id: "6",
    title: "Mock Blog Post 6",
    image: "https://api.lorem.space/image/house?w=500&h=500",
    tags: [Category.NEXTJS, Category.REACT],
  },
];
