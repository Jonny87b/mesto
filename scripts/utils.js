import {
  imagePopup,
  subtitlePopup,
  popupImage,
  profileOpenPopupButtonAdd,
  popupFormAdd,
  popupProfile,
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
  popupAdd,
} from "./constants.js";
import { Popup } from "./Popup.js";
import { Card } from "./Card.js";

const popupEdit = new Popup(".popup-edit");
popupEdit.setEventListeners();

const popupAddCard = new Popup(".popup-add");
popupAddCard.setEventListeners();

const popupImg = new Popup(".popup-image");
popupImg.setEventListeners();

function openProfile() {
  popupEdit.openPopup(popupProfile);
  popupTextTypeName.value = profileInfoTitle.textContent;
  popupTextTypeStatus.value = profileInfoSubtitle.textContent;
}
profileOpenPopupButton.addEventListener("click", openProfile);

function submitProfileForm(evt) {
  evt.preventDefault();
  profileInfoTitle.textContent = popupTextTypeName.value;
  profileInfoSubtitle.textContent = popupTextTypeStatus.value;
  popupEdit.closePopup(popupProfile);
}

popupProfileForm.addEventListener("submit", submitProfileForm);

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
  popupAddCard.closePopup(popupAdd);
}

profileOpenPopupButtonAdd.addEventListener("click", () =>
  popupAddCard.openPopup(popupAdd)
);

popupFormAdd.addEventListener("submit", handleFormSubmitAddCard);

export function handelPhotoPopup(evt) {
  const cardData = evt.target;
  const name = cardData
    .closest(".element")
    .querySelector(".element__title").textContent;
  const link = evt.target.src;
  imagePopup.src = link;
  imagePopup.alt = name;
  subtitlePopup.textContent = name;
  popupImg.openPopup(popupImage);
}

// export function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", handleEscClose);
// }
// export function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", handleEscClose);
// }
// function handleEscClose(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

// export function openProfile() {
//   openPopup(popupProfile);
//   popupTextTypeName.value = profileInfoTitle.textContent;
//   popupTextTypeStatus.value = profileInfoSubtitle.textContent;
// }

// export function submitProfileForm(evt) {
//   evt.preventDefault();
//   profileInfoTitle.textContent = popupTextTypeName.value;
//   profileInfoSubtitle.textContent = popupTextTypeStatus.value;
//   closePopup(popupProfile);
// }

// export function handleFormSubmitAddCard(evt) {
//   evt.preventDefault();
//   const cardItem = new Card(
//     inputName.value,
//     inputLink.value,
//     "#template"
//   ).createCard();
//   elements.prepend(cardItem);
//   evt.target.reset();
//   inputName.value = "";
//   inputLink.value = "";
//   cardSubmitButton.setAttribute("disabled", "");
//   cardSubmitButton.classList.add("submit-button_inactive");
//   closePopup(popupAdd);
// }
