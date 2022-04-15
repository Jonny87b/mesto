import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup-image__image");
    this._title = this._popup.querySelector(".popup-image__title");
  }

  open(text, link) {
    this._image.src = link;
    this._image.alt = text;
    this._title.textContent = text;
    super.open();
  }
}
