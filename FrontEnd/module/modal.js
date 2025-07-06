import {
  body,
  modalActionBtn,
  closeIcon,
  cancelBtn,
  modalMsg,
  closeSvg,
  updateForm,
  popUpDialog,
  allPopUpFormInputs,
  updateBtn,
  discardBtn,
  idTxtPopUp,
  nameTxtPopUp,
  addressTxtPopUp,
} from "./dom.js";
import { fetchData } from "./api.js";
import { loadData } from "./table.js";

let requestData;
let initialName;
let initialAddress;

// user actions
const userAction = (rqstData) => {
  // console.log(rqstData);
  const { method, url } = rqstData; //destructure if needed
  requestData = rqstData;
  console.log("user action called");
  console.log(method, url);
  console.log(requestData);
  initialName = requestData.body.name;
  console.log(initialName);
  initialAddress = requestData.body.address;
  console.log(initialAddress);
};

modalActionBtn.addEventListener("click", async () => {
  console.log(requestData);
  //animation start
  try {
    const response = await fetchData(requestData);
    console.log(response);
    if (response.ok) {
      //load table
      console.log("ressssok");
      loadData();
      modal.classList.add("hidden");
      return true;
    } else {
      console.error("Failed:", response.status, response.statusText);
      return false;
    }
  } catch (error) {
    //network errors and unexpected errors
    console.error("Error fetching data:", error);
    return false;
  }
});

//add event listner for close icon
closeIcon.addEventListener("click", () => {
  modal.classList.add("hidden");
});

//add hover for close icon
closeIcon.addEventListener("mouseover", () => {
  closeSvg.style.fill = "rgb(131, 131, 131)";
  closeSvg.style.stroke = "rgb(131, 131, 131)";
});

//revert hover close icon
closeIcon.addEventListener("mouseout", () => {
  closeSvg.style.fill = ""; //reset to default
  closeSvg.style.stroke = ""; //reset to default
});

//add event listner for cancel button
cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

console.log(allPopUpFormInputs);
const checkInputs = () => {
  console.log("--------------------------------");
  //Node list convert to an array
  const updated = Array.from(allPopUpFormInputs).every(
    (input) =>
      input.value.trim() !== "" &&
      (nameTxtPopUp.value.trim() !== initialName ||
        addressTxtPopUp.value.trim() !== initialAddress)
  );
  console.log("updated? ", updated);
  console.log("--------------------------------");
  updateBtn.disabled = !updated;
};
//add event listners for all inputs
allPopUpFormInputs.forEach((inputEl) => {
  inputEl.addEventListener("input", checkInputs);
});

//add event listner for update button
updateBtn.addEventListener("click", async () => {
  console.log(requestData.body);
  //get updated values from  form
  requestData.body = JSON.stringify({
    id: `${idTxtPopUp.value}`,
    name: `${nameTxtPopUp.value}`,
    address: `${addressTxtPopUp.value}`,
  });
  console.log(requestData.body);
  try {
    const response = await fetchData(requestData);
    if (response.ok) {
      //load table
      loadData();
      resetModal();
      return true;
    } else {
      console.error("Failed:", response.status, response.statusText);
      updateBtn.disabled = true;
      return false;
    }
  } catch (error) {
    //network errors and unexpected errors
    console.error("Error fetching data:", error);
    updateBtn.disabled = true;
    return false;
  }
});

//add event listner for discard button
discardBtn.addEventListener("click", () => {
  resetModal();
});

//open modal
export const openModal = ({ action, msg, body = "" }) => {
  modal.classList.remove("hidden");

  //msg
  modalMsg.textContent = msg;

  //headers
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestData = {
    method: "Get",
    url: "",
    headers: myHeaders,
    body: null,
    redirect: "follow",
  };

  switch (action.toLowerCase()) {
    case "post":
      //change button txt
      modalActionBtn.innerText = "Add";

      requestData.method = "POST";
      requestData.url = "http://localhost:8080/add-student";
      requestData.body = body;
      console.log(requestData.body);
      break;

    case "update":
      //change button txt
      // modalActionBtn.innerText = "Add";
      console.log("update action in modal");
      updateForm.classList.remove("hidden");
      popUpDialog.classList.add("hidden");
      // body.style.overFlow

      requestData.method = "PUT";
      requestData.url = "http://localhost:8080/update-student";
      requestData.body = body;
      console.log(requestData.body);

      //set values to form
      idTxtPopUp.value = requestData.body.id;
      nameTxtPopUp.value = requestData.body.name;
      addressTxtPopUp.value = requestData.body.address;
      break;

    case "delete":
      //change button txt
      // console.log("delete action in modal");
      modalActionBtn.innerText = "Delete";

      requestData.body = body;
      requestData.method = "DELETE";
      requestData.url = `http://localhost:8080/delete-student/${requestData.body.id}`;
      break;

    default:
      break;
  }

  userAction(requestData);
};

//reset the modal
export const resetModal = () => {
  modal.classList.add("hidden");
  popUpDialog.classList.remove("hidden");
  updateForm.classList.add("hidden");
  updateBtn.disabled = true;
};
