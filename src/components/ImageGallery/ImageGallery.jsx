import { ImageGalleryItem } from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem';

import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import css from './ImageGallery.module.css';

export const ImageGallery = ({
  status,
  error,
  image,
  incrementPage,
  loadMore,
}) => {
  if (status === 'idel') {
    return null;
  }
  if (status === 'pending') {
    return image.length > 0 ? (
      <>
        <ul className={css.ImageGallery}>
          {image.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>
        <Loader />
      </>
    ) : (
      <Loader />
    );
  }
  if (status === 'rejected') {
    return <p>{error.message}</p>;
  }
  if (status === 'resolved') {
    return (
      <>
        <ul className={css.ImageGallery}>
          {image.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>
        {loadMore && <Button incrementPage={incrementPage} />}
      </>
    );
  }
};
