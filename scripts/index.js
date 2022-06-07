/* Author elements */
const popupProfileElement = document.querySelector('#edit-profile');
const popupFieldNameElement = popupProfileElement.querySelector('input[name="username"]');
const popupFieldDescriptionElement = popupProfileElement.querySelector('input[name="description"]');
const accountEditButtonElement = document.querySelector('.account__edit-button');
const popupExitButtonElement = popupProfileElement.querySelector('#close-popup-profile');
const addCardButtonElement = document.querySelector('.account__add-button');
const formElement = document.querySelector('.popup__container');
const accountNameElement = document.querySelector('.account__name');
const accountDescriptionElement = document.querySelector('.account__description');

/* Card elements */
const popupCardElement = document.querySelector('#add-card');
const popupCardFormElement = popupCardElement.querySelector('form')
const popupFieldCardNameElement = popupCardFormElement.querySelector('input[name="cardname"]');
const popupFieldCardUrlElement = popupCardFormElement.querySelector('input[name="link"]');
const popupExitCardButtonElement = popupCardElement.querySelector('#close-popup-card');
const cardContainer = document.querySelector('.elements__items');

/* Popup view elements */
const popupViewElement = document.querySelector('#popup-show-photo')
const popupViewImageElement = popupViewElement.querySelector('.popup__image')
const popupViewCaptionElement = popupViewElement.querySelector('.popup__caption')


function popupToggle(popup) {
  popup.classList.toggle('popup_opened');
}

function handleOpenAccountPopup() {
  popupFieldNameElement.value =  accountNameElement.textContent;
  popupFieldDescriptionElement.value = accountDescriptionElement.textContent;
  popupToggle(popupProfileElement);
}

function handleOpenAddCardPopup() {
  popupToggle(popupCardElement);
}

accountEditButtonElement.addEventListener('click', handleOpenAccountPopup);
addCardButtonElement.addEventListener('click', handleOpenAddCardPopup);
popupExitButtonElement.addEventListener('click', () => popupToggle(popupProfileElement));
popupExitCardButtonElement.addEventListener('click', () => popupToggle(popupCardElement));

function formSubmitHandler(evt) {
  evt.preventDefault();
  accountNameElement.textContent = popupFieldNameElement.value;
  accountDescriptionElement.textContent = popupFieldDescriptionElement.value;
  popupToggle(popupProfileElement);
}

function formSubmitHandlerCard(evt) {
  evt.preventDefault();
  console.log()
  const card = {
    name: popupFieldCardNameElement.value,
    link: popupFieldCardUrlElement.value,
  }
  const cardElement = createCard(card)
  cardContainer.append(cardElement)
  popupToggle(popupCardElement);
}

formElement.addEventListener('submit', formSubmitHandler);
popupCardFormElement.addEventListener('submit', formSubmitHandlerCard);

// { link: url, name: text }
function createCard(card) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);

  const imageElement = cardElement.querySelector('.elements__photo');
  cardElement.querySelector('.elements__title').textContent = card.name;
  imageElement.src = card.link;
  imageElement.alt = card.name;

  imageElement.addEventListener('click', function(evt) {
    popupViewImageElement.src = card.link
    popupViewCaptionElement.textContent = card.name
    popupToggle(popupViewElement)
  });

  cardElement.querySelector('.elements__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.elements__delete').addEventListener('click', function(evt) {
    cardElement.remove();
  });


  return cardElement
}

initialCards.forEach((card) => {
  const cardElement = createCard(card)
  cardContainer.append(cardElement)
});


//document.querySelector('.elements__like').addEventListener('click', function(evt) {
  //evt.target.classList.toggle('element__like_active');
//});
