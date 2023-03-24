import { mockBlogPosts } from '@/components/molecules/BlogPost/testUtils/mockData';
import BlogPostList from '@/components/organisms/BlogPostList/BlogPostList';
import renderHelper from '@/testUtils/renderHelper';
import { screen } from '@testing-library/react';

describe('BlogPostList', () => {
    it('should render a list of blog posts', async () => {
        renderHelper(<BlogPostList blogPosts={mockBlogPosts} />);

        expect(await screen.findAllByTestId(/blogpost /)).toHaveLength(6);
    });
});
