import Title from '@/components/molecules/BlogPost/components/Title/Title';
import { mockBlogPost } from '@/components/molecules/BlogPost/testUtils/mockData';
import renderHelper from '@/testUtils/renderHelper';
import { screen } from '@testing-library/react';
import React from 'react';

describe('BlogPost.Title', () => {
    it('should render the title', async () => {
        renderHelper(<Title _id={mockBlogPost._id} title={mockBlogPost.title} />);

        expect(await screen.findByText(/^mock blog post/i)).toBeInTheDocument();
    });
});
