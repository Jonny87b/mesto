import { handelPhotoPopup } from "./scripts.js";

export class Card {
  constructor(name, link, cardTemplateSelector) {
    this._template = document.querySelector(cardTemplateSelector).content;
    this._name = name;
    this._link = link;
  }

  _handelLikeButton() {
    console.log(this._likeButton);
    this._likeButton.classList.toggle("element__heart_active");
  }

  _handelDeleteButton() {
    this._card.remove();
  }
  _setEventListeners() {
    const deleteButton = this._card.querySelector(".element__delete");
    this._likeButton.addEventListener("click", () => this._handelLikeButton());
    deleteButton.addEventListener("click", () => this._handelDeleteButton());
    this._photo.addEventListener("click", handelPhotoPopup);
  }
  createCard() {
    this._card = this._template.querySelector(".element").cloneNode(true);
    this._photo = this._card.querySelector(".element__photo");
    this._likeButton = this._card.querySelector(".element__heart");

    this._card.querySelector(".element__title").textContent = this._name;
    this._photo.src = this._link;
    this._photo.alt = this._link;

    this._setEventListeners();

    return this._card;
  }
}
