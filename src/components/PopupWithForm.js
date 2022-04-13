import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".submit-button");
    this._submitButtonText = this._submitButton.textContent;
  }
  _getInputValues() {
    const inputs = [...this._form.querySelectorAll(".popup__text")];
    const value = {};
    inputs.forEach((input) => {
      value[input.name] = input.value;
    });
    return value;
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  changeSubmitHadler(newSubmitHadler) {
    this._handleSubmit = newSubmitHadler;
  }
  close() {
    super.close();
    this._form.reset();
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}
