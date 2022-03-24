// const popupEditProfile = new PopupWithForm(".popup-edit");
// popupEditProfile.setEventListeners();
// const popupAddCard = new PopupWithForm(".popup-add");
// console.log(123);
// popupAddCard.setEventListeners();

// export function handelPhotoPopup(evt) {
//   const cardData = evt.target;
//   const name = cardData
//     .closest(".element")
//     .querySelector(".element__title").textContent;
//   const link = evt.target.src;
//   imagePopup.src = link;
//   imagePopup.alt = name;
//   subtitlePopup.textContent = name;
//   popupImg.open();
// }

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
