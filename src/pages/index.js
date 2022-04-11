import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { initialCards } from "../utils/InitialCards.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  popupFormAdd,
  popupFormAvatar,
  profileOpenPopupButtonAdd,
  profileOpenPopupButton,
  avatarOpenPopupButton,
  popupProfileForm,
  popupTextTypeName,
  popupTextTypeStatus,
} from "../utils/constants.js";

import "../pages/index.css";
import { api } from "../components/Api.js";

let userId;

api.getProfile().then((res) => {
  userInfo.setUserInfo(res.name, res.about, res.avatar);
  userId = res._id;
});

api.getInitialCards().then((cardList) => {
  cardList.forEach((data) => {
    const card = createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id,
    });
    section.addItem(card);
  });
});

const userInfo = new UserInfo({
  profileUsernameSelection: ".profile-info__title",
  profileStatusSelection: ".profile-info__subtitle",
  profileAvatarSelection: ".profile__avatar",
});

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
const avatarValidation = new FormValidator(config, popupFormAvatar);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();
avatarValidation.enableValidation();

function openProfile() {
  popupEditForm.open();
  const { username, status } = userInfo.getUserInfo();
  popupTextTypeName.value = username;
  popupTextTypeStatus.value = status;
}

function submitProfileForm(data) {
  const { username, status, avatar } = data;
  api.getEditProfile(username, status, avatar).then((res) => {
    userInfo.setUserInfo(res.username, res.status, res.avatar);
    popupEditForm.close();
  });
}

profileOpenPopupButtonAdd.addEventListener("click", () => {
  addCardValidation.disableSubmitButton();
  popupAddForm.open();
});
profileOpenPopupButton.addEventListener("click", () => openProfile());
avatarOpenPopupButton.addEventListener("click", () => popupAvatarForm.open());

const popupImage = new PopupWithImage(".popup-image");
popupImage.setEventListeners();

const popupEditForm = new PopupWithForm(".popup-edit", submitProfileForm);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(".popup-add", handleCardFormSubmit);
popupAddForm.setEventListeners();

const popupDeleteForm = new PopupWithForm(".popup-delete");
popupDeleteForm.setEventListeners();

const popupAvatarForm = new PopupWithForm(
  ".popup-avatar",
  handleAvatarFormSubmit
);
popupAvatarForm.setEventListeners();

function handleAvatarFormSubmit() {
  // const { username, status, avatar } = data;
  api.editAvatar().then((res) => {
    console.log("res", res);
    userInfo.setUserInfo(res.username, res.status, res.avatar);
  });
}

const createCard = (data) => {
  const card = new Card(
    data,
    "#template",
    () => {
      popupImage.open(data.name, data.link);
    },
    (id) => {
      popupDeleteForm.open();
      popupDeleteForm.changeSubmitHadler(() => {
        api.getDeleteCard(id).then(() => {
          card.handlerDeleteCard();
          popupDeleteForm.close();
        });
      });
    },
    (id) => {
      if (card.isLiked()) {
        api.getDeleteLike(id).then((res) => {
          card.setLikes(res.likes);
        });
      } else {
        api.getAddLike(id).then((res) => {
          card.setLikes(res.likes);
        });
      }
    }
  );

  return card.createCard();
};

const render = (data) => {
  const card = createCard(data);
  section.addItem(card);
};

function handleCardFormSubmit(data) {
  api.getAddCards(data.name, data.link).then((res) => {
    const card = createCard({
      name: res.name,
      link: res.link,
      likes: res.likes,
      id: res._id,
      userId: userId,
      ownerId: res.owner._id,
    });
    section.addItem(card);
    popupAddForm.close();
  });
}
const section = new Section({ items: [], renderer: render }, ".elements");
section.renderItems();
