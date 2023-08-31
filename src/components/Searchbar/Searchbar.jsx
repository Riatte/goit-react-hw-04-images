import css from './Searchbar.module.css';
import { useState } from 'react';

export const Searchbar = ({ handleFormSubmit }) => {
  const [searching, setSearching] = useState('');

  const handleChange = ({ target }) => {
    setSearching(target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (searching.trim() === '') {
      alert('No search value!');
      return;
    }
    handleFormSubmit(searching);
    setSearching('');
    reset();
  };
  const reset = () => {
    setSearching('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          name="searching"
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searching}
        />
      </form>
    </header>
  );
};
