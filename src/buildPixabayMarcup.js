export const buildPixabayMarcup = ({
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `<div class="photo-card">
  <img src="${largeImageURL}" class="img-card"  alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Dowloads: ${downloads}</b>
    </p>
  </div>
</div>`;
};
