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
import { PopupDeleteCards } from "../components/PopupDeleteCards.js";

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

profileOpenPopupButtonAdd.addEventListener("click", () => {
  addCardValidation.resetValidation();
  addCardValidation.disableSubmitButton();
  popupAddForm.open();
});
profileOpenPopupButton.addEventListener(
  "click",
  () => openProfile(),
  () => {
    editProfileValidation.resetValidation();
  }
);
avatarOpenPopupButton.addEventListener("click", () => {
  avatarValidation.resetValidation();
  avatarValidation.disableSubmitButton();
  popupAvatarForm.open();
});

const popupImage = new PopupWithImage(".popup-image");
popupImage.setEventListeners();

const popupEditForm = new PopupWithForm(".popup-edit", submitProfileForm);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(".popup-add", handleCardFormSubmit);
popupAddForm.setEventListeners();

const popupDeleteForm = new PopupDeleteCards(".popup-delete");
popupDeleteForm.setEventListeners();

const popupAvatarForm = new PopupWithForm(
  ".popup-avatar",
  handleAvatarFormSubmit
);
popupAvatarForm.setEventListeners();

let userId;

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([res, cards]) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    userId = res._id;

    cards.forEach((data) => {
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
  })
  .catch((err) => {
    console.log(err);
  });

function openProfile() {
  popupEditForm.open();
  const { username, status } = userInfo.getUserInfo();
  popupTextTypeName.value = username;
  popupTextTypeStatus.value = status;
}

function submitProfileForm(data) {
  popupEditForm.renderLoading(true);
  const { username, status } = data;
  api
    .getEditProfile(username, status)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    })
    .then(() => {
      popupEditForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditForm.renderLoading(false);
    });
}

function handleAvatarFormSubmit(data) {
  popupAvatarForm.renderLoading(true);
  api
    .editAvatar(data.linkAvatar)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    })
    .then(() => {
      popupAvatarForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatarForm.renderLoading(false);
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
        api
          .getDeleteCard(id)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            card.handlerDeleteCard();
            popupDeleteForm.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    (id) => {
      if (card.isLiked()) {
        api
          .getDeleteLike(id)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .getAddLike(id)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
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
  popupAddForm.renderLoading(true);
  api
    .getAddCards(data.name, data.link)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      const card = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id,
      });
      section.addItem(card);
    })
    .then(() => {
      popupAddForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddForm.renderLoading(false);
    });
}
const section = new Section({ items: [], renderer: render }, ".elements");
section.renderItems();
