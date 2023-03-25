import BlogPostForm from '@/components/organisms/BlogPostForm/BlogPostForm';
import postPost from '@/requests/postPost';
import renderHelper from '@/testUtils/renderHelper';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/requests/postPost');

describe("BlogPostForm", () => {
    beforeEach(() => {
        (postPost as jest.Mock).mockResolvedValue({})
    })

    it("should render the inputs", async () => {
        renderHelper(<BlogPostForm/>);

        expect(await screen.findByLabelText("title")).toBeInTheDocument();
        expect(await screen.findByLabelText("image")).toBeInTheDocument();
        expect(await screen.findByLabelText("content")).toBeInTheDocument();
    })

    it("should render the action row", async () => {
        renderHelper(<BlogPostForm/>)

        expect(await screen.findByTestId('blog_post_form_action_row')).toBeInTheDocument();
    })

    it("should set the date field to today's date", async () => {
        renderHelper(<BlogPostForm/>)

        expect(await screen.findByText(new Date().toDateString())).toBeInTheDocument()
    })

    it("should submit the form when the save button is clicked", async () => {
        renderHelper(<BlogPostForm/>);

        await userEvent.click(await screen.findByText(/^save/i, {selector: 'button[type="submit"]'}));

        expect(postPost).toHaveBeenCalled();
    })

    it.todo("should allow for an image upload when the upload button is clicked");
    it.todo("should set the image field value when an image is uploaded");
    it.todo("should render the image and hide the upload button when an image is uploaded");
})