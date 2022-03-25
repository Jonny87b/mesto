export class Card {
  constructor(data, cardTemplateSelector, handleImageClick) {
    this._template = document
      .querySelector(cardTemplateSelector)
      .content.querySelector(".element");
    this._name = data.name;
    this._link = data.link;
    this._handleImageClick = handleImageClick;
  }

  _handelLikeButton() {
    console.log(this._likeButton);
    this._likeButton.classList.toggle("element__heart_active");
  }

  _handelDeleteButton() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    const deleteButton = this._card.querySelector(".element__delete");
    this._likeButton.addEventListener("click", () => this._handelLikeButton());
    deleteButton.addEventListener("click", () => this._handelDeleteButton());
    this._photo.addEventListener("click", this._handleImageClick);
  }
  createCard() {
    this._card = this._template.cloneNode(true);
    // this._card = this._template.querySelector(".element").cloneNode(true);
    this._photo = this._card.querySelector(".element__photo");
    this._likeButton = this._card.querySelector(".element__heart");
    this._card.querySelector(".element__title").textContent = this._name;
    this._photo.src = this._link;
    this._photo.alt = `Изображение ${this._name}`;

    this._setEventListeners();

    return this._card;
  }
}
