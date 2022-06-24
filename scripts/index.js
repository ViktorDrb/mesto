/* Author elements */
const popupProfileElement = document.querySelector('#edit-profile');
const popupFieldNameElement = popupProfileElement.querySelector('input[name="username"]');
const popupFieldDescriptionElement = popupProfileElement.querySelector('input[name="description"]');
const accountEditButtonElement = document.querySelector('.account__edit-button');
const popupExitButtonElement = popupProfileElement.querySelector('#close-popup-profile');
const addCardButtonElement = document.querySelector('.account__add-button');
const popupFormContainerElement = document.querySelector('.popup__container');
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
const popupExitViewButtonElement = popupViewElement.querySelector('#close-popup-photo');

const handleEscPress = (evt) => {
  console.log(evt)
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    console.log(popup)
    onClosePopup(popup);
  }
};

document.addEventListener("click", function(e) {
  const clickToElement = e.target
   if (clickToElement.classList.contains('popup_opened')) {
     clickToElement.classList.remove('popup_opened');
  }
});

function onOpenPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener(`keydown`, handleEscPress);
}

function onClosePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener(`keydown`, handleEscPress);
}

popupExitViewButtonElement.addEventListener('click',
    () => onClosePopup(popupViewElement));

function handleOpenAccountPopup() {
  popupFieldNameElement.value =  accountNameElement.textContent;
  popupFieldDescriptionElement.value = accountDescriptionElement.textContent;
  onOpenPopup(popupProfileElement);
}

accountEditButtonElement.addEventListener('click', handleOpenAccountPopup);
addCardButtonElement.addEventListener('click', () => onOpenPopup(popupCardElement));
popupExitButtonElement.addEventListener('click', () => onClosePopup(popupProfileElement));
popupExitCardButtonElement.addEventListener('click', () => onClosePopup(popupCardElement));

function formSubmitHandler(evt) {
  evt.preventDefault();
  accountNameElement.textContent = popupFieldNameElement.value;
  accountDescriptionElement.textContent = popupFieldDescriptionElement.value;
  onClosePopup(popupProfileElement);
}

function formSubmitHandlerCard(evt) {
  evt.preventDefault();
  const card = {
    name: popupFieldCardNameElement.value,
    link: popupFieldCardUrlElement.value,
  }
  const cardElement = createCard(card)
  cardContainer.prepend(cardElement);
  onClosePopup(popupCardElement);
  popupCardFormElement.reset();
}


popupFormContainerElement.addEventListener('submit', formSubmitHandler);
popupCardFormElement.addEventListener('submit', formSubmitHandlerCard);


// { link: url, name: text }
const cardTemplate = document.querySelector('#card').content;
function createCard(card) {
  const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);

  const imageElement = cardElement.querySelector('.elements__photo');
  cardElement.querySelector('.elements__title').textContent = card.name;
  imageElement.src = card.link;
  imageElement.alt = card.name;


  imageElement.addEventListener('click', function(evt) {
    popupViewImageElement.src = card.link
    popupViewImageElement.alt = card.name
    popupViewCaptionElement.textContent = card.name
    onOpenPopup(popupViewElement)
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