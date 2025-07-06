//body element
export const body = document.getElementById("body");

// submit form elements
export const allInputs = document.querySelectorAll(
  "#submitForm input:not(#idTxt), #submitForm textarea"
);
export const idTxt = document.getElementById("idTxt");
export const nameTxt = document.getElementById("nameTxt");
export const addressTxt = document.getElementById("addressTxt");
export const submitBtn = document.getElementById("submitBtn");

//update form elements
export const allPopUpFormInputs = document.querySelectorAll(
  "#update-form input:not(#idTxtPopUp), #update-form textarea"
);
export const updateForm = document.getElementById("update-form");
export const idTxtPopUp = document.getElementById("idTxtPopUp");
export const nameTxtPopUp = document.getElementById("nameTxtPopUp");
export const addressTxtPopUp = document.getElementById("addressTxtPopUp");
export const updateBtn = document.getElementById("updateBtn");
export const discardBtn = document.getElementById("discardBtn");

//data table elements
export const dataTable = document.getElementById("data-table");
export const tBody = document.getElementById("tBody");
export const colGroup = document.getElementById("col-group");

//loading animation element
export const loader = document.getElementById("loader");

//modal element
export const modal = document.getElementById("modal");

//pop-up dialog elements
export const popUpDialog = document.getElementById("pop-up-dialog");
export const modalMsg = document.getElementById("modal-msg");
export const closeSvg = document.querySelector(".close-svg");
export const closeIcon = document.getElementById("close-icon");
export const modalActionBtn = document.getElementById("modal-action-btn");
export const cancelBtn = document.getElementById("cancel-btn");
