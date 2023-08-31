import axios from 'axios';

export const fetchArticlesWithQuery = async (searchQuery, queryPage) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const searchParams = new URLSearchParams({
    key: `33589472-7e528a5ba368de1ef1987cb1f`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  });

  const response = await axios.get(
    `${BASE_URL}?${searchParams}&q=${searchQuery}&page=${queryPage}`
  );
  return response.data.hits;
};
