// DOM элементы
const cardsTemplate = document.querySelector('#card-template').content;
const listCards = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editProfile = document.querySelector('.profile__edit-button');
const closePopup = document.querySelectorAll('.popup__close');

const newCardPopup = document.querySelector('.profile__add-button');
const formCardElement = document.forms['new-place'];
const nameCard = document.querySelector('.popup__input_type_card-name');
const urlLocation = document.querySelector('.popup__input_type_url');

const imagePopupSrcAlt = document.querySelector('.popup__image');
const imagePopupName = document.querySelector('.popup__caption');

const profileFormElement = document.forms['edit-profile'];

const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;

const profile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');

// Обработчик формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    
    const name = nameInput.value;
    const job = jobInput.value;

    profile.textContent = name;
    jobProfile.textContent = job;

    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

function handleLikeButton(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

editProfile.addEventListener('click', function () {
    nameInput.value = profile.textContent;
    jobInput.value = jobProfile.textContent;
    openModal(profilePopup);
});

closePopup.forEach(function (popup) {
    popup.addEventListener('click', function () {
        const pop = popup.closest('.popup');
        closeModal(pop);
    });
});

function createCard(cardInfo){
    const cards = cardsTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cards.querySelector('.card__image');
    const cardName = cards.querySelector('.card__title');
    const likeButton = cards.querySelector('.card__like-button');
    const deleteButton = cards.querySelector('.card__delete-button');

    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardName.textContent = cardInfo.name;

    likeButton.addEventListener('click', handleLikeButton);
    deleteButton.addEventListener('click', () => {
        const parentCardDel = deleteButton.closest('.places__item');
        parentCardDel.remove();
    });
    
    cardImage.addEventListener('click', function () {
        imagePopupSrcAlt.src = cardInfo.link;
        imagePopupName.textContent = cardInfo.name;
        imagePopupSrcAlt.alt = cardInfo.name;

        openModal(imagePopup);
    });

    return cards;
}

// Отображение начальных карточек
initialCards.forEach(function(item){
    listCards.append(createCard(item));
});

newCardPopup.addEventListener('click', function () {
    openModal(cardPopup);
});

// Обработчик формы добавления новой карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const locate = nameCard.value;
    const url = urlLocation.value;

    const newCard = createCard({
        name: locate,
        link: url
    });

    listCards.prepend(newCard);

    closeModal(cardPopup);
    formCardElement.reset();
}
formCardElement.addEventListener('submit', handleCardFormSubmit);
