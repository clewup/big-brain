import { BlogPost } from "@/types/blogPostTypes";
import { Tag } from "@/enums/tags";

export const mockBlogPost: BlogPost = {
  id: 1,
  title: "Mock Blog Post 1",
  image: "https://api.lorem.space/image/pizza?w=500&h=500",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula id, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
    "\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula id, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
    "\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula id, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
    "\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula id, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",

  date: new Date(),
  tags: [Tag.NEXTJS, Tag.TYPESCRIPT],

  titlePos: [0, 0],
  imagePos: [0, 0],
  contentPos: [0, 0],
  tagsPos: [0, 0],
};

export const mockBlogPosts: BlogPost[] = [
  mockBlogPost,
  {
    ...mockBlogPost,
    id: 2,
    title: "Mock Blog Post 2",
    image: "https://api.lorem.space/image/burger?w=500&h=500",
    tags: [Tag.REACT, Tag.TYPESCRIPT],
  },
  {
    ...mockBlogPost,
    id: 3,
    title: "Mock Blog Post 3",
    image: "https://api.lorem.space/image/drink?w=500&h=500",
    tags: [Tag.HEROKU, Tag.TYPESCRIPT],
  },
  {
    ...mockBlogPost,
    id: 4,
    title: "Mock Blog Post 4",
    image: "https://api.lorem.space/image/watch?w=500&h=500",
    tags: [Tag.DOTNET, Tag.REACT],
  },
  {
    ...mockBlogPost,
    id: 5,
    title: "Mock Blog Post 5",
    image: "https://api.lorem.space/image/furniture?w=500&h=500",
    tags: [Tag.NEXTJS, Tag.TYPESCRIPT],
  },
  {
    ...mockBlogPost,
    id: 6,
    title: "Mock Blog Post 6",
    image: "https://api.lorem.space/image/house?w=500&h=500",
    tags: [Tag.NEXTJS, Tag.REACT],
  },
];
