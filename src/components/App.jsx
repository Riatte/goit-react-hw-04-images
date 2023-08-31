import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import css from './App.module.css';
import { useState } from 'react';

export const App = () => {
  const [searching, setSearching] = useState('');
  const [page, setPage] = useState(1);

  const incrementPage = () => {
    setPage(prevState => ({ page: prevState.page + 1 }));
  };

  const handleFormSubmit = searching => {
    setSearching(searching);
    setPage(1);
  };
  return (
    <section className={css.App}>
      <div>
        <Searchbar handleFormSubmit={handleFormSubmit} />
        <ImageGallery
          page={page}
          searching={searching}
          incrementPage={incrementPage}
        />
      </div>
    </section>
  );
};
