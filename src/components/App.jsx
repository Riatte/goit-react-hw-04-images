import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import css from './App.module.css';
import { useState, useEffect } from 'react';
import { fetchArticlesWithQuery } from 'Services/Api';

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
        if (page === 1) {
          setImage([]);
        }
        setStatus('pending');

        const material = await fetchArticlesWithQuery(query, page);
        setImage(prevState => [...prevState, ...material]);
        setStatus('resolved');
        if (material.length === 12) {
          setLoadMore(true);
        } else {
          setLoadMore(false);
        }
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
        <ImageGallery
          incrementPage={incrementPage}
          status={status}
          error={error}
          image={image}
          loadMore={isLoadMore}
        />
      </div>
    </section>
  );
};
