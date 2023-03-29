import { PostType } from '@/types';

export const mockPost: PostType = {
    id: 1,
    customer: 1,
    user: 20,
    title: 'Mock Post 1',
    image: 'https://api.lorem.space/image/pizza?w=500&h=500',
    content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' +
        '\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' +
        '\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' +
        '\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac magna efficitur, elementum ipsum eu, ultricies tellus. Etiam at nulla mauris. Vestibulum fermentum odio a mauris auctor, sit amet pellentesque sem accumsan. Mauris suscipit eu nisi non elementum. Etiam a dui ultrices, congue ligula, commodo diam. Donec commodo, magna in iaculis cursus, nisl nisi sollicitudin augue, quis consectetur enim neque in turpis. Praesent euismod vel tortor sed vulputate. Praesent iaculis, quam ut facilisis rutrum, nisl orci ornare lorem, at cursus justo ipsum eget metus. Nam ultrices vestibulum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',

    date: new Date(),
    tags: ["nextjs"],
};

export const mockPosts: PostType[] = [
    mockPost,
    {
        ...mockPost,
        id: 2,
        title: 'Mock Post 2',
        image: 'https://api.lorem.space/image/burger?w=500&h=500',
        tags: ["react", "typescript"],
    },
    {
        ...mockPost,
        id: 3,
        title: 'Mock Post 3',
        image: 'https://api.lorem.space/image/drink?w=500&h=500',
        tags: ["angular", "typescript"],
    },
    {
        ...mockPost,
        id: 4,
        title: 'Mock Post 4',
        image: 'https://api.lorem.space/image/watch?w=500&h=500',
        tags: ["dotnet", "react"],
    },
    {
        ...mockPost,
        id: 5,
        title: 'Mock Post 5',
        image: 'https://api.lorem.space/image/furniture?w=500&h=500',
        tags: ["nextjs", "typescript"],
    },
    {
        ...mockPost,
        id: 6,
        title: 'Mock Post 6',
        image: 'https://api.lorem.space/image/house?w=500&h=500',
        tags: ["nextjs", "react"],
    },
];
