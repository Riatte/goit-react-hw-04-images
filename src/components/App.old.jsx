import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import css from './App.module.css';

export class App extends Component {
  state = {
    materials: [],
    searching: '',
    page: 1,
  };

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = searching => {
    this.setState({ searching, page: 1 });
  };

  render() {
    return (
      <section className={css.App}>
        <div>
          <Searchbar handleFormSubmit={this.handleFormSubmit} />
          <ImageGallery
            page={this.state.page}
            searching={this.state.searching}
            incrementPage={this.incrementPage}
          />
        </div>
      </section>
    );
  }
}
