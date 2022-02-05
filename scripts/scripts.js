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
const popupTextTypeName = document.querySelector(".popup__text_type_name");
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
  const profileName = profileInfoTitle.textContent;
  const popupName = popupTextTypeName;
  popupName.value = profileName;

  const profilestatus = profileInfoSubtitle.textContent;
  const popupstatus = popupTextTypeStatus;
  popupstatus.value = profilestatus;
}

function closeProfile() {
  closePopup(popupProfile);
}

const popupProfileForm = document.querySelector(".popup__form");
popupProfileForm.addEventListener("submit", submitProfileForm);

function submitProfileForm(evt) {
  evt.preventDefault();
  const nameInput = popupTextTypeName.value;
  profileInfoTitle.textContent = nameInput;

  const jobInput = popupTextTypeStatus.value;
  profileInfoSubtitle.textContent = jobInput;
  popupProfile.classList.remove("popup_opened");
}

profileOpenPopupButton.addEventListener("click", openProfile);
popupProfileCloseButton.addEventListener("click", closeProfile);

popupProfile.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closeProfile();
  }
});

const elements = document.querySelector(".elements");
const template = document.querySelector("#template").content;
const inputName = document.querySelector(".popup-add__text_type_name");
const inputLink = document.querySelector(".popup-add__text_type_link");
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
    openPopupImage();
  });

  return card;
}

function render(card) {
  elements.append(card);
}

const profileOpenPopupButtonAdd = document.querySelector(".profile__button");
const popupAdd = document.querySelector(".popup-add");
const popupCloseButtonAdd = document.querySelector(".popup-add__close-button");

function openPopupAdd() {
  openPopup(popupAdd);
}

function closePopupAdd() {
  closePopup(popupAdd);
}

function formSubmitHandlerAddCard(evt) {
  evt.preventDefault();
  const cardItem = createCard(inputName.value, inputLink.value);
  render(cardItem);
  elements.prepend(cardItem);
  inputName.value = "";
  inputLink.value = "";
  closePopupAdd();
}

const popupFormAdd = document.querySelector(".popup-add__form");
popupFormAdd.addEventListener("submit", formSubmitHandlerAddCard);

profileOpenPopupButtonAdd.addEventListener("click", openPopupAdd);
popupCloseButtonAdd.addEventListener("click", closePopupAdd);

popupAdd.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopupAdd();
  }
});

const popupOpenElementPhoto = document.querySelector(".element__photo");
const popupImage = document.querySelector(".popup-image");
const popupCloseButtonImage = document.querySelector(
  ".popup-image__close-button"
);

function openPopupImage() {
  openPopup(popupImage);
}

function closePopupImage() {
  closePopup(popupImage);
}

popupOpenElementPhoto.addEventListener("click", openPopupImage);
popupCloseButtonImage.addEventListener("click", closePopupImage);

popupImage.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopupImage();
  }
});
