const profileOpenPopupButton = document.querySelector(
  ".profile-info__edit-button"
);
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close");
// const popupContainer = document.querySelector(".popup__body");

function openPopup(event) {
  event.preventDefault();
  popup.classList.add("popup_opened");
  console.log(popup.classList);
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

profileOpenPopupButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
