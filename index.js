const state = [
  {last_name: "Ashburne1", first_name: "Deane1", address: "4 Green Place", state: false},
  {last_name: "Ashburne2", first_name: "Deane2", address: "4 Green Place", state: false},
  {last_name: "Ashburne3", first_name: "Deane3", address: "4 Green Place", state: false},
  {last_name: "Ashburne4", first_name: "Deane4", address: "4 Green Place", state: false},
  {last_name: "Ashburne5", first_name: "Deane5", address: "4 Green Place", state: false},
  {last_name: "Ashburne6", first_name: "Deane6", address: "4 Green Place", state: false},
]

const table = document.getElementById('table-view-row');
const tableBody = document.querySelector("tbody");

for(let obj of state) {
  const clone = document.importNode(table.content, true);
  const columns = clone.querySelectorAll("td");
  columns[0].innerHTML = makeInput("onChangeHandler", obj, ['last_name', 'first_name', 'address']);
  columns[1].textContent = obj.last_name;
  columns[2].textContent = obj.first_name;
  columns[3].textContent = obj.address;
  tableBody.appendChild(clone);
}

function onChangeHandler(e, lastName, firstName, address) {
  console.log(e);
  console.log(lastName);
  console.log(firstName);
  console.log(address);
}

function makeInput(handler, obj, params) {
  return `<input 
    type="radio" 
    name="person" 
    onchange="${handler}(this, ${params.map(param => `'${obj[param]}'`).join(',')});" 
  ></input>`
}