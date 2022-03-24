import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./InitialCards.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import {
  popupFormAdd,
  profileOpenPopupButtonAdd,
  profileOpenPopupButton,
  popupProfileForm,
  popupTextTypeName,
  popupTextTypeStatus,
  elements,
  inputName,
  inputLink,
  cardSubmitButton,
} from "./constants.js";

import "../pages/index.css";

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

const render = (item) => {
  const card = new Card(item.name, item.link, ".template", () => {
    popupImage.open(item.name, item.link);
  });
  const addCard = card.createCard();
  elements.append(addCard);
};

function openProfile() {
  popupEditForm.open();
  const { username, status } = userInfo.getUserInfo();
  popupTextTypeName.value = username;
  popupTextTypeStatus.value = status;
}

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
profileOpenPopupButton.addEventListener("click", () => openProfile());

const section = new Section(
  { items: initialCards, renderer: render },
  ".elements"
);
section.renderItems();

const popupImage = new PopupWithImage(".popup-image");
popupImage.setEventListeners();

const popupEditForm = new PopupWithForm(".popup-edit", submitProfileForm);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(".popup-add", handleFormSubmitAddCard);
popupAddForm.setEventListeners();

const userInfo = new UserInfo({
  profileUsernameSelection: ".profile-info__title",
  profileStatusSelection: ".profile-info__subtitle",
});
