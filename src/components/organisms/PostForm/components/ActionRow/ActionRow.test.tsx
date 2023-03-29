import ActionRow from '@/components/organisms/PostForm/components/ActionRow/ActionRow';
import renderHelper, { wrapWithFormik } from '@/testUtils/renderHelper';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('PostForm.ActionRow', () => {
    it('should render the buttons', async () => {
        renderHelper(<ActionRow onCancel={jest.fn()} />);

        expect(await screen.findByText(/^cancel/i, { selector: 'button[type="button"]' })).toBeInTheDocument();
        expect(await screen.findByText(/^save/i, { selector: 'button[type="submit"]' })).toBeInTheDocument();
    });

    it('should execute the onCancel function when the cancel button is clicked', async () => {
        const mockOnCancel = jest.fn();
        renderHelper(<ActionRow onCancel={mockOnCancel} />);

        await userEvent.click(await screen.findByText(/^cancel/i, { selector: 'button[type="button"]' }));

        expect(mockOnCancel).toHaveBeenCalled();
    });

    it('should submit the form when the save button is clicked', async () => {
        const mockOnSubmit = jest.fn();
        renderHelper(
            wrapWithFormik(<ActionRow onCancel={jest.fn()} />, {
                initialValues: {
                    test: true,
                },
                onSubmit: mockOnSubmit,
            })
        );

        await userEvent.click(await screen.findByText(/^save/i, { selector: 'button[type="submit"]' }));

        expect(mockOnSubmit).toHaveBeenCalled();
    });
});
