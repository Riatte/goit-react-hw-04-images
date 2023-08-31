import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { fetchArticlesWithQuery } from 'Services/Api';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import css from './ImageGallery.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

export const ImageGallery = ({ page, searching, incrementPage }) => {
  const [image, setImage] = useState([]);
  const [status, setStatus] = useState('idel');
  const [error, setError] = useState(null);

  useEffect(
    prevProps => {
      if (searching === '') return;

      async function getImg() {
        try {
          if (page === 1) {
            setImage([]);
          }
          setStatus('pending');
          const material = await fetchArticlesWithQuery(searching, page);
          setImage(prevState => [...prevState, ...material]);
          setStatus('resolved');
        } catch (error) {
          setError(error);
          setStatus('rejected');
        }
      }

      getImg();
    },
    [searching, page]
  );

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
        <Button incrementPage={incrementPage} />
      </>
    );
  }
};
