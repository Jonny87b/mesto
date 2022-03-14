import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./InitialCards.js";
import { openPopup, closePopup } from "./utils.js";

const profileOpenPopupButton = document.querySelector(".profile-info__button");
const popupProfile = document.querySelector(".popup-edit");
const popupTextTypeName = document.querySelector(".popup__text_type_username");
const popupTextTypeStatus = document.querySelector(".popup__text_type_status");
const profileInfoTitle = document.querySelector(".profile-info__title");
const profileInfoSubtitle = document.querySelector(".profile-info__subtitle");

const popupProfileForm = popupProfile.querySelector(".popup__form");
const popupFormAdd = document.querySelector("#popup__form-add");

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
  openPopup(popupProfile);
  popupTextTypeName.value = profileInfoTitle.textContent;
  popupTextTypeStatus.value = profileInfoSubtitle.textContent;
}

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

popupProfileForm.addEventListener("submit", submitProfileForm);

function submitProfileForm(evt) {
  evt.preventDefault();
  profileInfoTitle.textContent = popupTextTypeName.value;
  profileInfoSubtitle.textContent = popupTextTypeStatus.value;
  closePopup(popupProfile);
}

profileOpenPopupButton.addEventListener("click", openProfile);

const elements = document.querySelector(".elements");
const inputName = document.querySelector(".popup__text_type_name");
const inputLink = document.querySelector(".popup__text_type_link");

initialCards.forEach(function (item) {
  render(item);
});

function render(item) {
  const card = new Card(item.name, item.link, "#template");
  const addCard = card.createCard();
  elements.append(addCard);
}

const profileOpenPopupButtonAdd = document.querySelector(".profile__button");
const popupAdd = document.querySelector(".popup-add");
const cardSubmitButton = document.querySelector("#submit");

profileOpenPopupButtonAdd.addEventListener("click", () => openPopup(popupAdd));

function handleFormSubmitAddCard(evt) {
  evt.preventDefault();
  const cardItem = new Card(
    inputName.value,
    inputLink.value,
    "#template"
  ).createCard();
  elements.prepend(cardItem);
  evt.target.reset();
  inputName.value = "";
  inputLink.value = "";
  cardSubmitButton.setAttribute("disabled", "");
  cardSubmitButton.classList.add("submit-button_inactive");
  closePopup(popupAdd);
}

popupFormAdd.addEventListener("submit", handleFormSubmitAddCard);
