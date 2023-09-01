import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';
import { useState } from 'react';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalShow, setIsModalShow] = useState(false);

  const toggleModal = () => {
    setIsModalShow(!isModalShow);
  };

  return (
    <li className={css.ImageGalleryItem} onClick={toggleModal}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItem_image}
      />
      {isModalShow && (
        <Modal onClose={toggleModal} src={largeImageURL} alt={tags} />
      )}
    </li>
  );
};
