export class Card {
  constructor(
    data,
    cardTemplateSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._template = document
      .querySelector(cardTemplateSelector)
      .content.querySelector(".element");

    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;

    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  handlerDeleteCard() {
    this._card.remove();
    this._card = null;
  }

  isLiked() {
    const userLike = this._likes.find((user) => user._id === this._userId);
    return userLike;
  }

  _fillLike() {
    this._likeButton.classList.toggle("element__heart_active");
  }

  _unfillLike() {
    this._likeButton.classList.remove("element__heart_active");
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const heartCountElement = this._card.querySelector(".element__heart-count");
    heartCountElement.textContent = this._likes.length;

    if (this.isLiked()) {
      this._fillLike();
    } else {
      this._unfillLike();
    }
  }

  _setEventListeners() {
    this._deleteButton = this._card.querySelector(".element__delete");
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this._id)
    );
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this._id)
    );
    this._photo.addEventListener("click", () => this._handleImageClick());
  }
  createCard() {
    this._card = this._template.cloneNode(true);
    this._photo = this._card.querySelector(".element__photo");
    this._likeButton = this._card.querySelector(".element__heart");
    this._card.querySelector(".element__title").textContent = this._name;
    this._photo.src = this._link;
    this._photo.alt = `Изображение ${this._name}`;

    this._setEventListeners();

    this.setLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = "none";
    }

    return this._card;
  }
}
