import Image from '@/components/molecules/BlogPost/components/Image/Image';
import { mockBlogPost } from '@/components/molecules/BlogPost/testUtils/mockData';
import renderHelper from '@/testUtils/renderHelper';
import { screen } from '@testing-library/react';
import React from 'react';

describe('BlogPost.Image', () => {
    it('should render the image', async () => {
        renderHelper(<Image image={mockBlogPost.image} />);

        expect(await screen.findByRole('img')).toHaveAttribute(
            'src',
            '/_next/image?url=https%3A%2F%2Fapi.lorem.space%2Fimage%2Fpizza%3Fw%3D500%26h%3D500&w=640&q=75'
        );
    });
});
