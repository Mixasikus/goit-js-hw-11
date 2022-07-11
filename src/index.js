import '../src/sass/_example.scss';
import { buildPixabayMarcup } from './buildPixabayMarcup';
import NewApiService from './newsService';
import Notiflix from 'notiflix';
import LoadMoreBtn from './LoadMoreBtn';

const refs = {
  inputValue: document.querySelector('.search-form'),
  pixabayContainer: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.inputValue.addEventListener('submit', searchPixabay);

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

const newsApiService = new NewApiService();

async function searchPixabay(e) {
  e.preventDefault();

  loadMoreBtn.show();
  loadMoreBtn.disabled();

  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  newsApiService.fetchArticles().then(search => {
    if (search.total === 0) {
      onFetchError();
    }

    if (newsApiService.query === '') {
      return Notiflix.Notify.failure('The search string must not be empty.');
    }
    loadMoreBtn.enable();

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
  loadMoreBtn.disabled();

  newsApiService
    .fetchArticles()
    .then(search => {
      search.map(hits =>
        refs.pixabayContainer.insertAdjacentHTML(
          'beforeend',
          buildPixabayMarcup(hits)
        )
      );
      loadMoreBtn.enable();
    })
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
