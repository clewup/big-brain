import PostForm from '@/components/organisms/PostForm/PostForm';
import postPost from '@/requests/postPost';
import renderHelper from '@/testUtils/renderHelper';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

jest.mock('@/requests/postPost');

describe('PostForm', () => {
    beforeEach(() => {
        (postPost as jest.Mock).mockResolvedValue({});
    });

    it('should render the inputs', async () => {
        renderHelper(<PostForm post={undefined} isLoading={false}/>);

        expect(await screen.findByTestId('title_input')).toBeInTheDocument();
        expect(await screen.findByTestId('image_input')).toBeInTheDocument();
        expect(await screen.findByTestId('content_input')).toBeInTheDocument();
    });

    it('should render the action row', async () => {
        renderHelper(<PostForm post={undefined} isLoading={false}/>);

        expect(await screen.findByTestId('post_form_action_row')).toBeInTheDocument();
    });

    it("should set the date field to today's date", async () => {
        renderHelper(<PostForm post={undefined} isLoading={false}/>);

        expect(await screen.findByText(new Date().toDateString())).toBeInTheDocument();
    });

    it('should submit the form when the save button is clicked', async () => {
        renderHelper(<PostForm post={undefined} isLoading={false}/>);

        expect(postPost).not.toHaveBeenCalled();

        await userEvent.click(await screen.findByText(/^save/i, { selector: 'button[type="submit"]' }));

        expect(postPost).toHaveBeenCalled();
    });

    it.todo('should upload an image when the upload button is clicked');
    it.todo('should set the image field value when an image is uploaded');
    it.todo('should render the image and hide the upload button when an image is uploaded');
    it.todo('should prepopulate the form if the post prop is passed and not undefined')
    it.todo('should render the page loader if the isloading prop is passed as true')
});
