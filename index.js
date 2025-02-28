import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://leads-tracker-app-4ff79-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

console.log(firebaseConfig)

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log(firebaseConfig.databaseURL);


const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const referenceInDB=ref(database,"lead")




onValue(referenceInDB, function(snapshot){
  console.log(snapshot)
  const snapshotExist=snapshot.exists()
  if(snapshotExist){
    const snapshotValues=snapshot.val()
    const leads = Object.values(snapshotValues)
    render(leads)
  }

 
})

deleteBtn.addEventListener("dblclick", function () {
  remove(referenceInDB)
  ulEl.innerHTML=""
});

inputBtn.addEventListener("click", function () {
  push(referenceInDB, inputEl.value);
  inputEl.value = "";
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a href=${leads[i]} target="_blank">
                    ${leads[i]}
                </a> 
              </li>  

    `;
  }

  ulEl.innerHTML = listItems;
}
