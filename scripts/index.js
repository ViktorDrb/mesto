const popupElement = document.querySelector('.popup');
const accountEditButtonElement = document.querySelector('.account__edit-button');
const popupExitButtonElement = popupElement.querySelector('.popup__exit-button');
const formElement = document.querySelector('.popup__container');
const popupFieldNameElement = popupElement.querySelector('.popup__field_type_name');
const popupFieldDescriptionElement = popupElement.querySelector('.popup__field_type_description');
const accountNameElement = document.querySelector('.account__name');
const accountDescriptionElement = document.querySelector('.account__description');

function popupToggle() {
  popupElement.classList.toggle('popup_opened');
}

function handleOpenPopup() {
  popupFieldNameElement.value =  accountNameElement.textContent;
  popupFieldDescriptionElement.value = accountDescriptionElement.textContent;
  popupToggle();
}

accountEditButtonElement.addEventListener('click', handleOpenPopup);
popupExitButtonElement.addEventListener('click', popupToggle);

function formSubmitHandler(evt) {
  evt.preventDefault();
  accountNameElement.textContent = popupFieldNameElement.value;
  accountDescriptionElement.textContent = popupFieldDescriptionElement.value;
  popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);

document.querySelectorAll('.elements__like').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
})