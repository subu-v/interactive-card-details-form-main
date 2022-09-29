"use strict";

const inputCardName = document.getElementById("card-name");
const inputCardNumber = document.getElementById("card-number");
const inputCardExpMonth = document.querySelector(".card-exp-month");
const inputCardExpYear = document.querySelector(".card-exp-year");
const inputCardCvc = document.getElementById("card-cvc");

const cardImageName = document.querySelector(".card-details__name");
const cardImageNumber = document.querySelector(".card-details__number");
const cardImageExpMonth = document.querySelector(".card-details__exp-month");
const cardImageExpYear = document.querySelector(".card-details__exp-year");
const cardImageCvc = document.querySelector(".card-details__cvc");

const formElement = document.querySelector(".card-details__form");
const formCompletedState = document.querySelector(".card-details__completed");

const formSumbitBtn = document.querySelector(".card-details__sumbit-btn");
const formContinueBtn = document.querySelector(".card-details__continue-btn");

const checkInputForCardNumber = (ele, margins) => {
  if (ele.validity.valueMissing) {
    printErrorMsg(ele, "Can't be blank", margins);
  } else if (!Number(ele.value.split(" ").join(""))) {
    printErrorMsg(ele, "Wrong format, numbers only", margins);
  } else if (removeWhiteSpace(ele.value).length !== 16) {
    printErrorMsg(ele, "Wrong card number, enter 16 digits", margins);
  } else {
    successState(ele, margins);
  }
};

const checkInputForText = (ele, margins) => {
  if (ele.validity.valueMissing) {
    printErrorMsg(ele, "Can't be blank", margins);
  } else {
    successState(ele, margins);
  }
};

const checkInputForOthers = (ele, margins) => {
  if (ele.validity.valueMissing) {
    printErrorMsg(ele, "Can't be blank", margins);
  } else if (ele.validity.badInput) {
    printErrorMsg(ele, "Wrong format, numbers only", margins);
  } else {
    successState(ele, margins);
  }
};

const printErrorMsg = (inputEle, msg, margins) => {
  const errorMsgEle = inputEle.parentElement.lastElementChild;
  errorMsgEle.style.opacity = 100;
  errorMsgEle.textContent = msg;
  inputEle.classList.add("card-details__form-input-invalid");
  if (margins) {
    errorMsgEle.style.bottom = "24px";
    inputEle.style.marginBottom = "48px";
  }
};

const successState = (inputEle, margins) => {
  const errorMsgEle = inputEle.parentElement.lastElementChild;
  if (
    !inputEle.nextElementSibling.classList.contains(
      "card-details__form-input-invalid"
    ) &&
    !inputEle.previousElementSibling?.classList.contains(
      "card-details__form-input-invalid"
    )
  ) {
    /*
      The expDate and expYear inputs, both together has only one error msg element,
      without this above condition, let's say the user first enters a value for the expDate and then 
    
    */
    errorMsgEle.style.opacity = 0;
  }
  inputEle.classList.remove("card-details__form-input-invalid");
  if (margins) {
    errorMsgEle.style.bottom = "0";
    inputEle.style.marginBottom = "24px";
  }
};

const removeWhiteSpace = (str) => {
  let newLetterArray = [];
  str.split("").forEach((letter) => {
    letter !== " " && newLetterArray.push(letter);
  });
  return newLetterArray;
};

const insertCardNumber = (val) => {
  let limit = 0;
  let newNum = "";
  const arrayOfLetters = removeWhiteSpace(val);
  arrayOfLetters.forEach((letter) => {
    ++limit;
    newNum += letter;
    if (limit % 4 === 0) {
      newNum += " ";
    }
  });
  return newNum;
};

inputCardName.addEventListener("change", (e) => {
  e.preventDefault();
  checkInputForText(inputCardName, true);
  cardImageName.textContent = inputCardName.value.toUpperCase();
});

inputCardNumber.addEventListener("change", (e) => {
  e.preventDefault();
  checkInputForCardNumber(inputCardNumber, true);
  cardImageNumber.textContent = insertCardNumber(inputCardNumber.value);
});

inputCardExpMonth.addEventListener("change", (e) => {
  e.preventDefault();
  checkInputForOthers(inputCardExpMonth, false);
  cardImageExpMonth.textContent = inputCardExpMonth.value;
});

inputCardExpYear.addEventListener("change", (e) => {
  e.preventDefault();
  checkInputForOthers(inputCardExpYear, false);
  cardImageExpYear.textContent = inputCardExpYear.value;
});

inputCardCvc.addEventListener("change", (e) => {
  e.preventDefault();
  checkInputForOthers(inputCardCvc, false);
  cardImageCvc.textContent = inputCardCvc.value;
});

formSumbitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formElement.style.display = "none";
  formCompletedState.style.display = "block";
});

formContinueBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formElement.style.display = "block";
  formCompletedState.style.display = "none";
});
