import Title from '@/components/molecules/Post/components/Title/Title';
import { mockPost } from '@/components/molecules/Post/testUtils/mockData';
import renderHelper from '@/testUtils/renderHelper';
import { screen } from '@testing-library/react';
import React from 'react';

describe('Post.Title', () => {
    it('should render the title', async () => {
        renderHelper(<Title id={mockPost.id} title={mockPost.title} />);

        expect(await screen.findByText(/^mock blog post/i)).toBeInTheDocument();
    });
});
