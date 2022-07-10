import NewApiService from './newsService';
import Notiflix from 'notiflix';
import { buildPixabayMarcup } from './buildPixabayMarcup';

// import { onLoadMore } from '../onLoadMore';
import '../src/sass/_example.scss';

const refs = {
  inputValue: document.querySelector('.search-form'),
  pixabayContainer: document.querySelector('.gallery'),
  // loadMoreBtn: document.querySelector('.load-more'),
};

// refs.loadMoreBtn.disabled = true;

const newsApiService = new NewApiService();

refs.inputValue.addEventListener('submit', searchPixabay);

// refs.loadMoreBtn.addEventListener('click', onLoadMore());

async function searchPixabay(e) {
  e.preventDefault();

  refs.pixabayContainer.insertAdjacentHTML('beforeend', onLoadMore);

  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  newsApiService.fetchArticles().then(search => {
    if (search.total === 0) {
      onFetchError();
    }

    if (newsApiService.query === '') {
      return Notiflix.Notify.failure('The search string must not be empty.');
    }

    clearArticlesContainer();

    newsApiService.resetPage();

    search.map(hits =>
      refs.pixabayContainer.insertAdjacentHTML(
        'afterbegin',
        buildPixabayMarcup(hits)
      )
    );
  });
}

async function onLoadMore() {
  newsApiService
    .fetchArticles()
    .then(search =>
      search.map(hits =>
        refs.pixabayContainer.insertAdjacentHTML(
          'beforeend',
          buildPixabayMarcup(hits)
        )
      )
    )
    .catch(error => {
      console.log(error);
    });
}

async function clearArticlesContainer() {
  refs.pixabayContainer.innerHTML = '';
}

async function onFetchError() {
  Notiflix.Notify.failure(
    `Sorry, there are no images matching your search query. Please try again.`
  );
  refs.inputValue.reset();
}
