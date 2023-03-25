import Tags from '@/components/molecules/BlogPost/components/Tags/Tags';
import { mockBlogPost } from '@/components/molecules/BlogPost/testUtils/mockData';
import { CategoriesEnum, CategoryStylesEnum } from '@/enums';
import renderHelper from '@/testUtils/renderHelper';
import { screen } from '@testing-library/react';
import React from 'react';

describe('BlogPost.Tags', () => {
    it('should render each tag', async () => {
        renderHelper(<Tags tags={mockBlogPost.tags} />);

        expect(await screen.findByText(/nextjs/)).toBeInTheDocument();
        expect(await screen.findByText(/typescript/)).toBeInTheDocument();
    });

    it('should prefix each tag with a #', async () => {
        renderHelper(<Tags tags={mockBlogPost.tags} />);

        expect(await screen.findByText(/#nextjs/)).toBeInTheDocument();
        expect(await screen.findByText(/#typescript/)).toBeInTheDocument();
    });

    it('should style each tag with the mapped color', async () => {
        renderHelper(<Tags tags={mockBlogPost.tags} />);

        const nextJsColor = CategoryStylesEnum[CategoriesEnum.NEXTJS];
        const typescriptColor = CategoryStylesEnum[CategoriesEnum.TYPESCRIPT];

        expect(await screen.findByText(/#nextjs/)).toHaveStyle(`color: ${nextJsColor}`);
        expect(await screen.findByText(/#typescript/)).toHaveStyle(`color: ${typescriptColor}`);
    });
});
