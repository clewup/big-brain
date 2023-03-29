import { mockPosts } from '@/components/molecules/Post/testUtils/mockData';
import PostList from '@/components/organisms/PostList/PostList';
import renderHelper from '@/testUtils/renderHelper';
import { screen } from '@testing-library/react';
import React from 'react';

describe('PostList', () => {
    it('should render a list of posts', async () => {
        renderHelper(<PostList posts={mockPosts} />);

        expect(await screen.findAllByTestId(/post /)).toHaveLength(6);
    });
});
