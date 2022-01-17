const profileOpenPopupButton = document.querySelector(
  ".profile-info__edit_button"
);
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close");

function openPopup(event) {
  event.preventDefault();
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

profileOpenPopupButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);

// Находим форму в DOM
// let formElement = page.querySelector(".popup__body");
// // Находим поля формы в DOM
// let nameInput = formElement.querySelector(".popup_name");
// let jobInput = formElement.querySelector(".popup_status");

// let profileName = page.querySelector(".profile-info__title");
// nameInput.value = profileName.textContent;
// let profileStatus = page.querySelector(".profile-info__subtitle");
// jobInput.value = profileStatus.textContent;

// // Обработчик «отправки» формы, хотя пока
// // она никуда отправляться не будет
// function formSubmitHandler(evt) {
//   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//   // Так мы можем определить свою логику отправки.
//   // О том, как это делать, расскажем позже.

//   let nameInputValue = nameInput.value;
//   let jobInputValue = jobInput.value;

//   // Выберите элементы, куда должны быть вставлены значения полей
//   let profileName = page.querySelector(".profile-info__title");
//   profileName.textContent = nameInputValue;
//   let profileStatus = page.querySelector(".profile-info__subtitle");
//   profileStatus.textContent = jobInputValue;
//   // Вставьте новые значения с помощью textContent
// }

// // Прикрепляем обработчик к форме:
// // он будет следить за событием “submit” - «отправка»
// formElement.addEventListener("submit", formSubmitHandler);

let profileName = document.querySelector(".profile-info__title").textContent;
let popupName = document.querySelector(".popup__name");
popupName.value = profileName;

let profilestatus = document.querySelector(
  ".profile-info__subtitle"
).textContent;
let popupstatus = document.querySelector(".popup__status");
popupstatus.value = profilestatus;

let popupForm = document.querySelector(".popup__form");
popupForm.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector(".popup__name").value;
  document.querySelector(".profile-info__title").textContent = nameInput;
  popup.classList.remove("popup_opened");

  let jobInput = document.querySelector(".popup__status").value;
  document.querySelector(".profile-info__subtitle").textContent = jobInput;
  popup.classList.remove("popup_opened");
}
