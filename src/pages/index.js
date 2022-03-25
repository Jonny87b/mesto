import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { initialCards } from "../utils/InitialCards.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  popupFormAdd,
  profileOpenPopupButtonAdd,
  profileOpenPopupButton,
  popupProfileForm,
  popupTextTypeName,
  popupTextTypeStatus,
} from "../utils/constants.js";

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

profileOpenPopupButtonAdd.addEventListener("click", () => popupAddForm.open());
profileOpenPopupButton.addEventListener("click", () => openProfile());

const popupImage = new PopupWithImage(".popup-image");
popupImage.setEventListeners();

const popupEditForm = new PopupWithForm(".popup-edit", submitProfileForm);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(".popup-add", handleCardFormSubmit);
popupAddForm.setEventListeners();

const userInfo = new UserInfo({
  profileUsernameSelection: ".profile-info__title",
  profileStatusSelection: ".profile-info__subtitle",
});

const createCard = (data) => {
  const card = new Card(data, "#template", () => {
    popupImage.open(data.name, data.link);
  }).createCard();
  return card;
};
const render = (data, elements) => {
  const card = createCard(data);
  elements.prepend(card);
};

function handleCardFormSubmit(data) {
  const card = createCard(data);
  section.addItem(card);
  popupAddForm.close();
}
const section = new Section(
  { items: initialCards, renderer: render },
  ".elements"
);
section.renderItems();
