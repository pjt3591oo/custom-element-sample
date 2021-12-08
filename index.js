const state = [
  {last_name: "Ashburne1", first_name: "Deane1", address: "1 Green Place", state: false},
  {last_name: "Ashburne2", first_name: "Deane2", address: "2 Green Place", state: false},
  {last_name: "Ashburne3", first_name: "Deane3", address: "3 Green Place", state: false},
]

class TableBody extends HTMLElement {
  select = -1;
  state = [];

  rowTemplate = document.getElementById('table-view-row');

  constructor () {
    super();
    this.state = state;
    this.render();
  } 

  render() {
    for(let i = 0; i < this.state.length; i++) {
      const rowTemplate = document.importNode(this.rowTemplate.content, true);
      const row = rowTemplate.querySelector("tr");
      const columns = row.querySelectorAll("td");

      columns[0].appendChild(
        this.makeInput(i)
      );

      columns[1].textContent = this.state[i].last_name;
      columns[2].textContent = this.state[i].first_name;
      columns[3].textContent = this.state[i].address;

      this.querySelector('tbody').appendChild(row)
    }
  }

  makeInput(idx) {
    const input = document.createElement('input')
    input.setAttribute("type", "radio");
    input.setAttribute("name", "person");
    input.addEventListener('change', this.onChangeHandler.bind(this, idx))
    return input;
  }

  onChangeHandler(changedIdx, e) {
    this.setAttribute('select', changedIdx);
    
  }

  attributeChangedCallback(name, oldIdx, newIdx) {
    if (oldIdx === null) return;
    console.log(name, oldIdx, newIdx);
    if (this.select > -1) this.state[this.select].state = false
    this.select = parseInt(newIdx);
    if (this.select > -1) this.state[this.select].state = true;
    dialogShow(this.state[this.select]);
  }

  static get observedAttributes() {
    return ['select'];
  }
}

function dialogShow(obj) {
  const dialog = document.getElementById('dialog');
  dialog.setAttribute('open', true);
  dialog.innerHTML = `
    <h1>${obj.last_name}</h1>
    <h1>${obj.first_name}</h1>
    <h1>${obj.address}</h1>
    <button onclick="document.getElementById('dialog').close()">X</button>
  `
}

customElements.define('check-table', TableBody);
