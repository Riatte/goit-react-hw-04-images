import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searching: '',
  };
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searching.trim() === '') {
      alert('No search value!');
      return;
    }
    this.props.handleFormSubmit(this.state.searching);
    this.setState({ searching: '' });
    this.reset();
  };

  reset = () => {
    this.setState({ searching: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
            value={this.state.searching}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = { handleFormSubmit: PropTypes.func.isRequired };
