let popup = document.querySelector('.popup');
let accountEditButton = document.querySelector('.account__edit-button');
let popupExitButton = popup.querySelector('.popup__exit-button');
let formElement = document.querySelector('.popup__form');
let popupFieldName = popup.querySelector('.popup__field_name');
let popupFieldDescription = popup.querySelector('.popup__field_description');
let accountName = document.querySelector('.account__name');
let accountDescription = document.querySelector('.account__description');

let popupToggle = function() {
  popup.classList.toggle('popup_opened');
}

accountEditButton.addEventListener('click', popupToggle);
popupExitButton.addEventListener('click', popupToggle);

function formSubmitHandler (evt) {
  evt.preventDefault();
  accountName.textContent = popupFieldName.value;
  accountDescription.textContent = popupFieldDescription.value;
  popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);
