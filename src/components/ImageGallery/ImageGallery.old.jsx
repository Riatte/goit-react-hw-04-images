import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { fetchArticlesWithQuery } from 'Services/Api';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    searching: [],
    status: 'idel',
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searching, page } = this.props;
    if (
      prevProps.searching !== searching ||
      (prevProps.searching === searching && prevProps.page !== page)
    ) {
      try {
        if (page === 1) {
          this.setState({ searching: [] });
        }
        this.setState({ status: 'pending' });

        const material = await fetchArticlesWithQuery(searching, page);
        this.setState(prevState => ({
          searching: [...prevState.searching, ...material],
          status: 'resolved',
        }));
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  render() {
    const { searching, status, error } = this.state;

    if (status === 'idel') {
      return;
    }
    if (status === 'pending') {
      return searching.length > 0 ? (
        <>
          <ul className={css.ImageGallery}>
            {searching.map(({ id, webformatURL, largeImageURL, tags }) => (
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
            {searching.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
          </ul>
          <Button incrementPage={this.props.incrementPage} />
        </>
      );
    }
  }
}
