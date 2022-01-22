const profileOpenPopupButton = document.querySelector(".profile-info__button");
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close-button");

function openPopup() {
  popup.classList.add("popup_opened");
  let profileName = document.querySelector(".profile-info__title").textContent;
  let popupName = document.querySelector(".popup__text_type_name");
  popupName.value = profileName;

  let profilestatus = document.querySelector(
    ".profile-info__subtitle"
  ).textContent;
  let popupstatus = document.querySelector(".popup__text_type_status");
  popupstatus.value = profilestatus;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

let popupForm = document.querySelector(".popup__form");
popupForm.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector(".popup__text_type_name").value;
  document.querySelector(".profile-info__title").textContent = nameInput;

  let jobInput = document.querySelector(".popup__text_type_status").value;
  document.querySelector(".profile-info__subtitle").textContent = jobInput;
  popup.classList.remove("popup_opened");
}

profileOpenPopupButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
