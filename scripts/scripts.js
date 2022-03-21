import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./InitialCards.js";
// import { Popup } from "./Popup.js";
import { Section } from "./Section.js";
import {
  cardListSelector,
  popupFormAdd,
  popupProfileForm,
} from "./constants.js";
// import { openPopup, closePopup } from "./utils.js";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".submit-button",
  inactiveButtonClass: "submit-button_inactive",
  inputErrorClass: "popup__text_type_error",
  errorClass: "popup-error_visible",
};

const editProfileValidation = new FormValidator(config, popupProfileForm);
const addCardValidation = new FormValidator(config, popupFormAdd);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

// const popupClass = new Popup(".popup");
// popupClass.setEventListeners();

// const popups = document.querySelectorAll(".popup");

// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//     if (evt.target.classList.contains("popup_opened")) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains("popup__close-button")) {
//       closePopup(popup);
//     }
//   });
// });

// initialCards.forEach(function (item) {
//   render(item);
// });

// function render(item) {
//   const card = new Card(item.name, item.link, "#template");
//   const addCard = card.createCard();
//   elements.append(addCard);
// }

const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, ".template");
      const cardElement = card.createCard();
      defaultCardList.addItem(cardElement);
    },
  },
  cardListSelector
);

defaultCardList.renderItems();
