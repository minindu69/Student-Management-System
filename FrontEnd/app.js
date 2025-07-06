import { loadData } from "./module/table.js";
import { openModal, resetModal } from "./module/modal.js";
import {
  allInputs,
  nameTxt,
  addressTxt,
  submitBtn,
  modal,
  updateForm,
  popUpDialog,
} from "./module/dom.js";

//check if all inputs are filled
const checkInputs = ()=>{
  console.log("inputting");
  const allFilled = Array.from(allInputs).every(input => input.value.trim() !== "");
  console.log(allFilled);
  submitBtn.disabled = !allFilled;
}

console.log(allInputs);

//add event listners for all inputs
allInputs.forEach(inputEl => {
  console.log(inputEl);
  inputEl.addEventListener("input", checkInputs);
});

submitBtn.addEventListener("click", () => {
  openModal({
    action: "post",
    msg: "Do you want to Add the new record?",
    body: JSON.stringify({
      name: `${nameTxt.value}`,
      address: `${addressTxt.value}`,
    }),
  });

  //clear inputs
  nameTxt.value = "";
  addressTxt.value = "";
  submitBtn.disabled = true;
});

tBody.addEventListener("click", (event) => {
  //update button click - get update btn element
  const updateBtn = event.target.closest(".updateBtn");
  //delete button click - get delete btn element
  const deleteBtn = event.target.closest(".deleteBtn");

  let actionType = null;

  if (updateBtn) actionType = "update";
  else if (deleteBtn) actionType = "delete";
  else return;

  const row = (updateBtn || deleteBtn).closest("tr");
  console.log(row);
  const uid = row?.querySelector(".uid")?.innerText; //optional chaning for avoid null errors
  const uFirstName = row?.querySelector(".uFirstName")?.innerText; //optional chaning for avoid null errors
  console.log(uFirstName);
  const uAddress = row?.querySelector(".uAddress")?.innerText; //optional chaning for avoid null errors

  if (!uid) return;

  switch (actionType) {
    case "update":
      openModal({
        action: "update",
        msg: "Do you want to Update the record?",
        body: {
          id: uid,
          name: uFirstName,
          address: uAddress,
        },
      });
      break;

    case "delete":
      openModal({
        action: "delete",
        msg: "Do you want to Delete the record?",
        body: {
          id: uid,
        },
      });
      break;

    default:
      break;
  }
});

// Close the modal when clicking outside the modal
window.addEventListener("click", (event) => {
  // console.log(event.target);
  if (event.target === modal || event.target === updateForm) {
    resetModal();
  }
});

// Close the modal when the browser window loses focus
window.addEventListener("blur", (event) => {
  // modal.classList.add("hidden");
});

//load data
(async () => {
  // emptyTbl();
  await loadData();
  console.log("Data loaded!");
})();
