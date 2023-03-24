import BlogPost from '@/components/molecules/BlogPost/BlogPost';
import { mockBlogPost } from '@/components/molecules/BlogPost/testUtils/mockData';
import renderHelper from '@/testUtils/renderHelper';
import { screen } from '@testing-library/react';

describe('BlogPost', () => {
    it('should render the title component', async () => {
        renderHelper(<BlogPost blogPost={mockBlogPost} />);

        expect(await screen.findByTestId('blog_post_title')).toBeInTheDocument();
    });

    it('should render the image component', async () => {
        renderHelper(<BlogPost blogPost={mockBlogPost} />);

        expect(await screen.findByTestId('blog_post_image')).toBeInTheDocument();
    });

    it('should render the details component', async () => {
        renderHelper(<BlogPost blogPost={mockBlogPost} />);

        expect(await screen.findByTestId('blog_post_details')).toBeInTheDocument();
    });

    it('should render the tags component', async () => {
        renderHelper(<BlogPost blogPost={mockBlogPost} />);

        expect(await screen.findByTestId('blog_post_tags')).toBeInTheDocument();
    });
});
