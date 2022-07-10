export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticles() {
    const BASE_URL = 'https://pixabay.com/api/';
    const MAIN_KEY = '28495383-c7081478f2b14739d603dcbf8&';
    const EXACT_REQUEST = `image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    return fetch(
      `${BASE_URL}?key=${MAIN_KEY}q=${this.searchQuery}&${EXACT_REQUEST}`
    )
      .then(res => {
        this.incrementPage();
        // console.log(res);
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        return res.json();
      })
      .then(data => {
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
