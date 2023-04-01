import Tags from '@/components/organisms/PostList/components/Post/components/Tags/Tags';
import { mockPost } from '@/components/organisms/PostList/components/Post/testUtils/mockData';
import renderHelper from '@/testUtils/renderHelper';
import { screen } from '@testing-library/react';
import React from 'react';

describe('Post.Tags', () => {
    it('should render each tag', async () => {
        renderHelper(<Tags tags={mockPost.tags} />);

        expect(await screen.findByText(/nextjs/)).toBeInTheDocument();
        expect(await screen.findByText(/typescript/)).toBeInTheDocument();
    });

    it('should prefix each tag with a #', async () => {
        renderHelper(<Tags tags={mockPost.tags} />);

        expect(await screen.findByText(/#nextjs/)).toBeInTheDocument();
        expect(await screen.findByText(/#typescript/)).toBeInTheDocument();
    });

    it.todo('should style the tags');
});
