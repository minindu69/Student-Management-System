import { delay } from "./utils.js";
import { dataTable, colGroup, tBody } from "./dom.js";

let tBodyData = "";

//For empty table
const tableMSG = (msg) => {
  const tblContentEl = `<div class="text-center" style="width: 96%; color: blue">
      <p class="m-0 p-5 pt-4">${msg}</p>
    </div>`;

  if (colGroup) colGroup.remove();
  dataTable.classList.add("text-center");
  dataTable.insertAdjacentHTML("afterend", tblContentEl);
};

const emptyTbl = () => {
  tableMSG("No Students Registered Yet!");
};

const insertDataToTable = (obj) => {
  tBodyData = `<tr>
              <th class="uid" scope="row">${obj.id}</th>
              <td class ="uFirstName">${obj.name}</td>
              <td class ="uLastName">${obj.address}</td>
              <td
                class="d-flex gap-4 flex-wrap justify-content-between align-items-center"
              >
                <div class="data uAddress">${obj.address}</div>
                <div class="actions d-flex gap-2">
                  <!-- edit button -->
                  <button class="btn btn-primary updateBtn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
                      />
                    </svg>
                  </button>

                  <!-- delete button -->
                  <button class="btn btn-danger deleteBtn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>`;

  // tBody.innerHTML = tBodyData;
  tBody.insertAdjacentHTML("beforeend", tBodyData);
};

//add animation
export const animation = (aniStatus)=>{
  if (aniStatus.toLowerCase() === 'active') {
    loader.classList.remove("hidden");
    tBody.classList.add("hidden");
  } else {
    loader.classList.add("hidden");
    tBody.classList.remove("hidden");
  }
  //change loader speed
  loader.playbackRate = 2.5;
}

//load data
export const loadData = async () => {
  animation('active');

  //give 2sec delay for appear animation
  await delay(1200);

  try {
    const response = await fetch("http://localhost:8080/get-students"); // resolved promise(response)
    let data = await response.json(); // get data as json
    console.log(data);
    // data = []; // when DB empty

    //stop loader animation
    animation('disable');

    if (response.ok && !(data.length === 0)) {
      tBody.innerHTML = "";
      //table styling
      dataTable.classList.remove("text-center");
      colGroup.classList.toggle("hidden");

      console.log("data");
      console.log(data);
      data.forEach((obj) => {
        console.log(obj);
        insertDataToTable(obj);
      });
    } else {
      emptyTbl();
    }
  } catch (error) {
    //stop loader animation
    animation('disable');

    console.error("Error during fetch or processing(loading data):", error);
    tableMSG("fetching error");
  }
};
