import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import css from './App.module.css';
import { useState, useEffect } from 'react';
import { fetchArticlesWithQuery } from 'Services/Api';
import { Button } from 'components/Button/Button';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [image, setImage] = useState([]);
  const [status, setStatus] = useState('idel');
  const [error, setError] = useState(null);
  const [isLoadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (query === '') return;
    async function getImg() {
      try {
        setStatus('pending');

        const material = await fetchArticlesWithQuery(query, page);
        setImage(prevState => [...prevState, ...material]);
        setStatus('resolved');
        setLoadMore(material.length === 12);
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    }

    getImg();
  }, [query, page]);

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = querys => {
    if (query !== querys) {
      setQuery(querys);
      setImage([]);
      setPage(1);
    }
  };
  return (
    <section className={css.App}>
      <div>
        <Searchbar handleFormSubmit={handleFormSubmit} />
        <ImageGallery status={status} error={error} image={image} />
        {isLoadMore && <Button incrementPage={incrementPage} />}
      </div>
    </section>
  );
};
