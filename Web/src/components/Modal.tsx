import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div onClick={onClose} data-modal-backdrop />
      <div data-modal-content>
        <header>
          <h2 id="modal-title">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}
