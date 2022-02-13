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
const popupProfileCloseButton = document.querySelector(".popup__close-button");
const popupTextTypeName = document.querySelector(".popup__text_type_username");
const popupTextTypeStatus = document.querySelector(".popup__text_type_status");
const profileInfoTitle = document.querySelector(".profile-info__title");
const profileInfoSubtitle = document.querySelector(".profile-info__subtitle");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openProfile() {
  openPopup(popupProfile);
  popupTextTypeName.value = profileInfoTitle.textContent;
  popupTextTypeStatus.value = profileInfoSubtitle.textContent;
}

popupProfileCloseButton.addEventListener("click", () =>
  closePopup(popupProfile)
);

const popupProfileForm = popupProfile.querySelector(".popup__form");
popupProfileForm.addEventListener("submit", submitProfileForm);

function submitProfileForm(evt) {
  evt.preventDefault();
  profileInfoTitle.textContent = popupTextTypeName.value;
  profileInfoSubtitle.textContent = popupTextTypeStatus.value;
  closePopup(popupProfile);
}

profileOpenPopupButton.addEventListener("click", openProfile);

popupProfile.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupProfile);
  }
});

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
  card.querySelector(".element__title").textContent = name;
  card.querySelector(".element__photo").src = link;
  card.querySelector(".element__photo").alt = link;
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
  card.querySelector(".element__photo").addEventListener("click", function () {
    imagePopup.src = link;
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
const popupCloseButtonAdd = document.querySelector(".popup-add__close-button");

profileOpenPopupButtonAdd.addEventListener("click", () => openPopup(popupAdd));
popupCloseButtonAdd.addEventListener("click", () => closePopup(popupAdd));

function formSubmitHandlerAddCard(evt) {
  evt.preventDefault();
  const cardItem = createCard(inputName.value, inputLink.value);
  elements.prepend(cardItem);
  inputName.value = "";
  inputLink.value = "";
  closePopup(popupAdd);
}

const popupFormAdd = document.querySelector(".popup-add__form");
popupFormAdd.addEventListener("submit", formSubmitHandlerAddCard);

popupAdd.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupAdd);
  }
});

const popupOpenElementPhoto = document.querySelector(".element__photo");
const popupImage = document.querySelector(".popup-image");
const popupCloseButtonImage = document.querySelector(
  ".popup-image__close-button"
);

popupOpenElementPhoto.addEventListener("click", () => openPopup(popupImage));
popupCloseButtonImage.addEventListener("click", () => closePopup(popupImage));

popupImage.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupImage);
  }
});
document.addEventListener("keydown", function (evt) {
  if (evt.key == "Escape") {
    closePopup(popupImage);
  }
});
document.addEventListener("keydown", function (evt) {
  if (evt.key == "Escape") {
    closePopup(popupAdd);
  }
});
document.addEventListener("keydown", function (evt) {
  if (evt.key == "Escape") {
    closePopup(popupProfile);
  }
});
