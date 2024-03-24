import { renderHook, act } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { createEmptyLookup } from 'common/models';

describe('useConfirmationDialog', () => {
  it('should handle open and close dialog', () => {
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog({ id: '1', name: 'Test' });
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual({ id: '1', name: 'Test' });

    act(() => {
      result.current.onClose();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should handle accept', () => {
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog({ id: '1', name: 'Test' });
    });

    act(() => {
      result.current.onAccept();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });
});
