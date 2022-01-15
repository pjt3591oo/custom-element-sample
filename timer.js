class CurrentTime extends HTMLElement {
  locale = new Date().toLocaleString();
  constructor() {
    super(); //반드시 super() 초기화
    this.innerText = this.locale;
  }
  static get observedAttributes() {
    // 모니터링 할 속성 이름
    return ['locale'];
  }
  connectedCallback() {
    // lifecycle: 우리가 정의한 요소가 DOM에 처음 연결될 때 호출
    this.start();
  }
  disconnectedCallback() {
    // lifecycle: 우리가 정의한 요소가 DOM에서 연결을 해제할 때 호출
    this.stop();
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    // lifecycle: observedAttribute 함수에서 반환한 attribute가 변경될 때 호출
    this.innerText = newVal;
  }
  adoptedCallback(oldDoc, newDoc) {
    // lifecycle: 우리가 정의한 요소가 새로운 문서로 이동할 때 호출
  }
  start() {
    // 추가된 메소드: 타이머 시작
    this.stop();
    let self = this;
    this._timer = window.setInterval(() => {
      // this.innerText = new Date().toLocaleString();
      this.locale = new Date().toLocaleString();
      this.setAttribute('locale', this.locale);
    }, 1000);
  }
  stop() {
    // 추가된 메소드: 타이머 정지
    if (this._timer) {
      window.clearInterval(this._timer);
      this._timer = null;
    }
  }
}
// <current-time> 태그가 CurrentTime 클래스를 사용하도록 한다.
customElements.define('current-time', CurrentTime);