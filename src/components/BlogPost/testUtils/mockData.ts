import { BlogPost } from "@/types/blogPost";
import { Tag } from "@/enums/tags";

export const mockBlogPost: BlogPost = {
  id: 1,
  title: "Mock Blog Post",
  imageUrl: "https://placekitten.com/200/300",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula id, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
    "\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula id, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
    "\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula id, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
    "\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula id, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",

  date: new Date(),
  tags: [Tag.NEXTJS, Tag.TYPESCRIPT],
};

export const mockBlogPosts: BlogPost[] = [
  mockBlogPost,
  { ...mockBlogPost, id: 2 },
  { ...mockBlogPost, id: 3 },
  { ...mockBlogPost, id: 4 },
  { ...mockBlogPost, id: 5 },
  { ...mockBlogPost, id: 6 },
];
