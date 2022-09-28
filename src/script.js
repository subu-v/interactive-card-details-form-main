"use strict";

const inputCardName = document.getElementById("card-name");
const inputCardNumber = document.getElementById("card-number");
const inputCardExpMonth = document.querySelector(".card-exp-month");
const inputCardExpYear = document.querySelector(".card-exp-year");
const inputCardCvc = document.getElementById("card-cvc");

const cardImageName = document.querySelector(".card-details__name");
const cardImageNumber = document.querySelector(".card-details__number");
const cardImageExpDate = document.querySelector(".card-details__exp-date");
const cardImageCvc = document.querySelector(".card-details__cvc");

const checkInputs = (ele, margins) => {
  if (ele.validity.valueMissing) {
    printErrorMsg(ele, "Can't be blank", margins);
  } else if (!Number(ele.value.split(" ").join(""))) {
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

const insertCardNumber = (val) => {
  let limit = 0;
  let newNum = "";
  val.split("").forEach((letter, index) => {
    ++limit;
    newNum += letter;
    if (limit % 4 === 0) {
      newNum += " ";
    }
  });
  return newNum;
};

inputCardName.addEventListener("input", (e) => {
  e.preventDefault();
  checkInputs(inputCardName, true);
  cardImageName.textContent = inputCardName.value.toUpperCase();
});

inputCardNumber.addEventListener("change", (e) => {
  e.preventDefault();
  checkInputs(inputCardNumber, true);
  cardImageNumber.textContent = insertCardNumber(inputCardNumber.value);
});

inputCardExpMonth.addEventListener("input", (e) => {
  e.preventDefault();
  checkInputs(inputCardExpMonth, false);
});

inputCardExpYear.addEventListener("input", (e) => {
  e.preventDefault();
  checkInputs(inputCardExpYear, false);
});

inputCardCvc.addEventListener("input", (e) => {
  e.preventDefault();
  checkInputs(inputCardCvc, false);
  cardImageCvc.textContent = inputCardCvc.value;
});
