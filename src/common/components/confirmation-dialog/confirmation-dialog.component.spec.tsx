import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  const mockOnClose = jest.fn();
  const mockOnAccept = jest.fn();

  const props = {
    isOpen: true,
    onAccept: mockOnAccept,
    onClose: mockOnClose,
    title: 'Test Dialog',
    labels: {
      closeButton: 'Close',
      acceptButton: 'Accept',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dialog with the correct content', () => {
    const { getByText, baseElement } = render(
      <ConfirmationDialogComponent {...props}>
        <p>Test Content</p>
      </ConfirmationDialogComponent>
    );

    expect(getByText('Test Dialog')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
    expect(getByText('Accept')).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
  });

  it('calls onClose when the close button is clicked', () => {
    const { getByText, baseElement } = render(
      <ConfirmationDialogComponent {...props}>
        <p>This is a test for close</p>
      </ConfirmationDialogComponent>
    );

    fireEvent.click(getByText('Close'));

    expect(mockOnClose).toHaveBeenCalled();
    expect(baseElement).toMatchSnapshot();
  });

  it('calls onAccept and onClose when the accept button is clicked', () => {
    const { getByText, baseElement } = render(
      <ConfirmationDialogComponent {...props}>
        <p>This is a test for accept</p>
      </ConfirmationDialogComponent>
    );

    fireEvent.click(getByText('Accept'));

    expect(mockOnAccept).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
    expect(baseElement).toMatchSnapshot();
  });
});
