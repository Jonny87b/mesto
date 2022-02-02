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

popup.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
});

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

const Elements = document.querySelector(".elements");
const Template = document.querySelector("#template").content;
const inputName = document.querySelector(".popup-add__text_type_name");
const inputLink = document.querySelector(".popup-add__text_type_link");
const imagePopup = document.querySelector(".popup-image__image");
const subtitlePopup = document.querySelector(".popup-image__title");

initialCards.forEach(function (item) {
  let CardItem = createCard(item.name, item.link);
  render(CardItem);
});

function createCard(name, link) {
  let Card = Template.querySelector(".element").cloneNode(true);
  Card.querySelector(".element__title").textContent = name;
  Card.querySelector(".element__photo").src = link;
  Card.querySelector(".element__photo").alt = link;
  Card.querySelector(".element__heart").addEventListener(
    "click",
    function (evt) {
      evt.target.classList.toggle("element__heart_active");
    }
  );
  Card.querySelector(".element__delete").addEventListener(
    "click",
    function (evt) {
      evt.target.closest(".element").remove();
    }
  );
  Card.querySelector(".element__photo").addEventListener("click", function () {
    imagePopup.src = link;
    subtitlePopup.textContent = name;
    openPopupImage();
  });

  return Card;
}

function render(Card) {
  Elements.append(Card);
}

const profileOpenPopupButtonAdd = document.querySelector(".profile__button");
const popupAdd = document.querySelector(".popup-add");
const popupCloseButtonAdd = document.querySelector(".popup-add__close-button");

function openPopupAdd() {
  popupAdd.classList.add("popup-add_opened");
}

function closePopupAdd() {
  popupAdd.classList.remove("popup-add_opened");
}

function formSubmitHandlerAddCard(evt) {
  evt.preventDefault();
  let CardItem = createCard(inputName.value, inputLink.value);
  render(CardItem);
  Elements.prepend(CardItem);
  popupAdd.classList.remove("popup-add_opened");
}

let popupFormAdd = document.querySelector(".popup-add__form");
popupFormAdd.addEventListener("submit", formSubmitHandlerAddCard);

profileOpenPopupButtonAdd.addEventListener("click", openPopupAdd);
popupCloseButtonAdd.addEventListener("click", closePopupAdd);

popupAdd.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopupAdd();
  }
});

const PopupOpenElementPhoto = document.querySelector(".element__photo");
const popupImage = document.querySelector(".popup-image");
const popupCloseButtonImage = document.querySelector(
  ".popup-image__close-button"
);
const image = document.querySelector(".popup-image__image");

function openPopupImage() {
  popupImage.classList.add("popup-image_opened");
}

function closePopupImage() {
  popupImage.classList.remove("popup-image_opened");
}

PopupOpenElementPhoto.addEventListener("click", openPopupImage);
popupCloseButtonImage.addEventListener("click", closePopupImage);

popupImage.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopupImage();
  }
});
