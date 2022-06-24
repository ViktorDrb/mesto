const invalidButton = (buttonElement, options) => {
    buttonElement.disabled = true
    buttonElement.classList.add(options.buttonErrorClass)
}

const validButton = (buttonElement, options) => {
    buttonElement.disabled = false
    buttonElement.classList.remove(options.buttonErrorClass)
}

const hasValidInput = (inputList) => {
    return inputList.every(inputElement => inputElement.validity.valid);
}

const toggleButtonState = (inputList, buttonElement, options) => {
    if (hasValidInput(inputList)) {
        validButton(buttonElement, options)
    } else {
        invalidButton(buttonElement, options)
    }
}

const showInputError = (formElement, inputElement, errorMessage, options) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(options.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
};

const hideInputError = (formElement, inputElement, options) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, options) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, options);
    } else {
        hideInputError(formElement, inputElement, options);
    }
};

const setEventListeners = (formElement, options) => {
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const buttonElement = formElement.querySelector(options.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            toggleButtonState(inputList, buttonElement, options);
            checkInputValidity(formElement, inputElement, options);
        });
    });
};

const enableValidation = (options) => {
    const formList = Array.from(document.querySelectorAll(options.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, options);
    });
};

const resetForm = (popup, options) => {
    const formElement = popup.querySelector(options.formSelector)
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const buttonElement = formElement.querySelector(options.submitButtonSelector);
    inputList.forEach(inputElement => hideInputError(formElement, inputElement, options))
    toggleButtonState(inputList, buttonElement, options)
}