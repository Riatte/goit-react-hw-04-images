import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ src, alt, onClose }) => {
  const handleClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const handleEscModal = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscModal);
    return () => window.removeEventListener('keydown', handleEscModal);
  }, [onClose]);

  return createPortal(
    <div className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};
