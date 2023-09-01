import css from './Button.module.css';

export const Button = ({ incrementPage }) => {
  return (
    <button onClick={incrementPage} type="button" className={css.Button}>
      Load more
    </button>
  );
};
