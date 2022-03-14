import { imagePopup, subtitlePopup, popupImage } from "./Consts.js";

export function handelPhotoPopup(evt) {
  const cardData = evt.target;
  const name = cardData
    .closest(".element")
    .querySelector(".element__title").textContent;
  const link = evt.target.src;
  imagePopup.src = link;
  imagePopup.alt = name;
  subtitlePopup.textContent = name;
  openPopup(popupImage);
}
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}
