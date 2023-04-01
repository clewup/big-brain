import Post from '@/components/organisms/PostList/components/Post/Post';
import { mockPost } from '@/components/organisms/PostList/components/Post/testUtils/mockData';
import renderHelper from '@/testUtils/renderHelper';
import { screen } from '@testing-library/react';
import React from 'react';

describe('Post', () => {
    it('should render the title component', async () => {
        renderHelper(<Post post={mockPost} />);

        expect(await screen.findByTestId('post_title')).toBeInTheDocument();
    });

    it('should render the image component', async () => {
        renderHelper(<Post post={mockPost} />);

        expect(await screen.findByTestId('post_image')).toBeInTheDocument();
    });

    it('should render the details component', async () => {
        renderHelper(<Post post={mockPost} />);

        expect(await screen.findByTestId('post_details')).toBeInTheDocument();
    });

    it('should render the tags component', async () => {
        renderHelper(<Post post={mockPost} />);

        expect(await screen.findByTestId('post_tags')).toBeInTheDocument();
    });
});
