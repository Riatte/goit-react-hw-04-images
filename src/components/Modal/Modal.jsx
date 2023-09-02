import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleEscModal = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscModal);
    return () => window.removeEventListener('keydown', handleEscModal);
  }, [onClose]);

  const handleClick = e => {
    console.log(e.target);
    console.log(e.currentTarget);
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};
