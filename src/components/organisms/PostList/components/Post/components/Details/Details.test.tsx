import Details from '@/components/organisms/PostList/components/Post/components/Details/Details';
import { mockPost } from '@/components/organisms/PostList/components/Post/testUtils/mockData';
import renderHelper from '@/testUtils/renderHelper';
import { screen } from '@testing-library/react';
import React from 'react';

describe('Post.Details', () => {
    it('should render the content', async () => {
        renderHelper(<Details content={mockPost.content} date={mockPost.date} />);

        expect(await screen.findByText(/^lorem ipsum/i)).toBeInTheDocument();
    });

    it('should render the date', async () => {
        renderHelper(<Details content={mockPost.content} date={mockPost.date} />);

        expect(await screen.findByText(new Date().toDateString())).toBeInTheDocument();
    });

    it('should render the content to 300 characters if more than 300', async () => {
        renderHelper(<Details content={mockPost.content} date={mockPost.date} />);

        const content = await screen.findByText(/^lorem ipsum/i);
        // 303 including '...'
        expect(content.textContent?.length).toBe(303);
        expect(content).toHaveTextContent('...');
    });

    it('should render the content to the content length if less than 300', async () => {
        renderHelper(<Details content={'Mock Content'} date={mockPost.date} />);

        const content = await screen.findByText(/^mock content/i);
        expect(content.textContent?.length).toBe(12);
        expect(content).not.toHaveTextContent('...');
    });
});
