class Counter extends HTMLElement {
  count = 0
  incrementBtn = document.createElement('button');
  decrementBtn = document.createElement('button');
  text = document.createElement('p');

  constructor() {
    super();
    console.log(this) 
  }

  increment () {
    this.setAttribute('count', ++this.count);
  }
  
  decrement () {
    this.setAttribute('count', --this.count);
  }

  // 옵저빙 할 attribute 목록
  static get observedAttributes() {
    return ['count'];
  }

  // observedAttributes에서 반환한 attribute가 변경되면 호출되는 함수
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
    if (name === 'count') this.text.innerText = `count: ${newValue}`;
  }
  connectedCallback() {
    console.log('connectedCallback');
    this.count = this.getAttribute('count') || 0;
    this.incrementBtn.innerText = `increment`;
    this.decrementBtn.innerText = `decrement`;
    this.text.innerText = `count: ${this.count}`;
    
    this.incrementBtn.addEventListener('click', this.increment.bind(this));
    this.decrementBtn.addEventListener('click', this.decrement.bind(this));

    this.appendChild(this.incrementBtn);
    this.appendChild(this.decrementBtn);
    this.appendChild(this.text);
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');
    this.incrementBtn.removeEventListener('click', this.increment.bind(this));
    this.decrementBtn.removeEventListener('click', this.decrement.bind(this));
  }

  adoptedCallback() {
    console.log('adoptedCallback');
  }
}
customElements.define('my-counter', Counter);