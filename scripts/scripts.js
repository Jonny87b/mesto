import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./InitialCards.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import {
  popupFormAdd,
  profileOpenPopupButtonAdd,
  popupProfileForm,
  popupTextTypeName,
  popupTextTypeStatus,
  profileInfoTitle,
  profileInfoSubtitle,
  elements,
  inputName,
  inputLink,
  cardSubmitButton,
  profileOpenPopupButton,
} from "./constants.js";

import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

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

// initialCards.forEach((item) => {
//   render(item);
// });

const render = (item) => {
  const card = new Card(item.name, item.link, ".template", () => {
    popupImg.open(item.name, item.link);
  });
  const addCard = card.createCard();
  elements.append(addCard);
};

const section = new Section(
  { items: initialCards, renderer: render },
  ".elements"
);
section.renderItems();

const popupImg = new PopupWithImage(".popup-image");
popupImg.setEventListeners();

const popupEditForm = new PopupWithForm(".popup-edit", submitProfileForm);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(".popup-add", handleFormSubmitAddCard);
popupAddForm.setEventListeners();

const userInfo = new UserInfo({
  profileUsernameSelection: ".profile-info__title",
  profileStatusSelection: ".profile-info__subtitle",
});

function openProfile() {
  popupEditForm.open();
  const { username, status } = userInfo.getUserInfo();
  popupTextTypeName.value = username;
  popupTextTypeStatus.value = status;
}
profileOpenPopupButton.addEventListener("click", () => openProfile());

function submitProfileForm(data) {
  const { username, status } = data;
  userInfo.setUserInfo(username, status);
  popupEditForm.close();
}

function handleFormSubmitAddCard(data) {
  const cardItem = new Card(
    inputName.value,
    inputLink.value,
    "#template"
  ).createCard({
    name: data.name,
    link: data.link,
  });
  elements.prepend(cardItem);
  cardSubmitButton.setAttribute("disabled", "");
  cardSubmitButton.classList.add("submit-button_inactive");
  popupAddForm.close();
}

profileOpenPopupButtonAdd.addEventListener("click", () => popupAddForm.open());

// popupFormAdd.addEventListener("submit", handleFormSubmitAddCard);
// popupProfileForm.addEventListener("submit", submitProfileForm);
