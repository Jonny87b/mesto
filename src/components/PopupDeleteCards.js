import { PopupWithForm } from "./PopupWithForm";

export class PopupDeleteCards extends PopupWithForm {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector, handleSubmit);
  }
  changeSubmitHadler(newSubmitHadler) {
    this._handleSubmit = newSubmitHadler;
  }
}
