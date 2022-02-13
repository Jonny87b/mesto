const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const profileOpenPopupButton = document.querySelector(".profile-info__button");
const popupProfile = document.querySelector(".popup-edit");
const popupProfileCloseButton = document.querySelector("#popup-edit_close");
const popupTextTypeName = document.querySelector(".popup__text_type_username");
const popupTextTypeStatus = document.querySelector(".popup__text_type_status");
const profileInfoTitle = document.querySelector(".profile-info__title");
const profileInfoSubtitle = document.querySelector(".profile-info__subtitle");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

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

const popupProfileForm = popupProfile.querySelector(".popup__form");
popupProfileForm.addEventListener("submit", submitProfileForm);

function submitProfileForm(evt) {
  evt.preventDefault();
  profileInfoTitle.textContent = popupTextTypeName.value;
  profileInfoSubtitle.textContent = popupTextTypeStatus.value;
  closePopup(popupProfile);
}

profileOpenPopupButton.addEventListener("click", openProfile);

const elements = document.querySelector(".elements");
const template = document.querySelector("#template").content;
const inputName = document.querySelector(".popup__text_type_name");
const inputLink = document.querySelector(".popup__text_type_link");
const imagePopup = document.querySelector(".popup-image__image");
const subtitlePopup = document.querySelector(".popup-image__title");

initialCards.forEach(function (item) {
  const cardItem = createCard(item.name, item.link);
  render(cardItem);
});

function createCard(name, link) {
  const card = template.querySelector(".element").cloneNode(true);
  const photo = card.querySelector(".element__photo");
  card.querySelector(".element__title").textContent = name;
  photo.src = link;
  photo.alt = link;
  card
    .querySelector(".element__heart")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__heart_active");
    });
  card
    .querySelector(".element__delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    });
  photo.addEventListener("click", function () {
    imagePopup.src = link;
    imagePopup.alt = name;
    subtitlePopup.textContent = name;
    openPopup(popupImage);
  });

  return card;
}

function render(card) {
  elements.append(card);
}

const profileOpenPopupButtonAdd = document.querySelector(".profile__button");
const popupAdd = document.querySelector(".popup-add");
const popupCloseButtonAdd = document.querySelector("#popup-add_close");
const buttonSubmit = document.querySelector("#submit");

profileOpenPopupButtonAdd.addEventListener("click", () => openPopup(popupAdd));

function handleFormSubmitAddCard(evt) {
  evt.preventDefault();
  const cardItem = createCard(inputName.value, inputLink.value);
  elements.prepend(cardItem);
  evt.target.reset();
  inputName.value = "";
  inputLink.value = "";
  buttonSubmit.classList.add("submit-button_inactive");
  closePopup(popupAdd);
}

const popupFormAdd = document.querySelector("#popup__form-add");
popupFormAdd.addEventListener("submit", handleFormSubmitAddCard);

const popupOpenElementPhoto = document.querySelector(".element__photo");
const popupImage = document.querySelector(".popup-image");

popupOpenElementPhoto.addEventListener("click", () => openPopup(popupImage));
