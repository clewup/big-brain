import Image from '@/components/organisms/PostList/components/Post/components/Image/Image';
import { mockPost } from '@/components/organisms/PostList/components/Post/testUtils/mockData';
import renderHelper from '@/testUtils/renderHelper';
import { screen } from '@testing-library/react';
import React from 'react';

describe('Post.Image', () => {
    it('should render the image', async () => {
        renderHelper(<Image image={mockPost.image} />);

        expect(await screen.findByRole('img')).toHaveAttribute(
            'src',
            '/_next/image?url=https%3A%2F%2Fapi.lorem.space%2Fimage%2Fpizza%3Fw%3D500%26h%3D500&w=640&q=75'
        );
    });
});
