"use strict";
(() => {
    const e = document.createElement.bind(document);
    // const q = document.querySelector.bind(document)
    // const log = console.log;
    const tpl = e('template');
    tpl.innerHTML = `
    <div></div>
    `;
    // 时区-默认0
    // 显示格式1 默认HMS 
    // 显示格式2 默认12/24
    // 外观不包括在内 但可以更该
    class DigitClock extends HTMLElement {
        constructor() {
            var _a;
            super();
            this.default_format = 'HH:MM:SS';
            this.default_system = '12';
            this.default_zone = '';
            this.delay = 1000;
            this.deamon = 0;
            this.debug = 1;
            //----------------------------------
            // Init Start        
            //----------------------------------
            this.attachShadow({ mode: 'open' });
            if (this.shadowRoot === null) {
                throw '<shadowRoot> is null';
            }
            this.shadowRoot.appendChild(tpl.content.cloneNode(true));
            const dd = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('div');
            if (dd === null) {
                throw '<div> is null';
            }
            this.face = dd;
            //----------------------------------
            // Init End
            //----------------------------------
            this.default_zone = String(new Date().getTimezoneOffset() / 60);
            this.tik_tok();
        }
        tik_tok() {
            const tm = this.get_time();
            this.face.innerText = tm;
            // 自动校准
            const _now = Date.now();
            const wait = this.delay - _now % this.delay;
            // if(this.debug >10){
            //     return
            // }else{
            //     log(_now, this.delay, wait, tm)
            //     this.debug += 1
            // }
            // 为了取得正确的 this 必须用 ()=>{}
            this.deamon = setTimeout(() => {
                this.tik_tok();
            }, wait);
        }
        am_pm(h) {
            if (h === 0) {
                return 12;
            }
            if (h < 13) {
                return h;
            }
            return h - 12;
        }
        get_time() {
            // Zone
            const diff = parseInt(this.default_zone, 10) - parseInt(this.zone, 10);
            const ms = Date.now() + diff * 3600 * 1000;
            const dt = new Date(ms);
            // 12/24
            let _h = dt.getHours();
            if (this.system === '12') {
                _h = this.am_pm(_h);
            }
            const h = String(_h).padStart(2, '0');
            const m = String(dt.getMinutes()).padStart(2, '0');
            const s = String(dt.getSeconds()).padStart(2, '0');
            // HH:MM:SS
            const tm = [h, m, s];
            this.delay = 1000;
            if (this.format === 'HH:MM') {
                tm.pop();
                this.delay = 60 * 1000;
            }
            return tm.join(':');
        }
        //---------------
        get format() {
            return this.getAttribute('format') || this.default_system;
        }
        set format(newValue) {
            // 修改后立即重启
            this.setAttribute('format', newValue);
        }
        //---------------
        get system() {
            return this.getAttribute('system') || this.default_system;
        }
        set system(newValue) {
            // 修改后立即重启
            this.setAttribute('system', newValue);
        }
        //---------------
        get zone() {
            return this.getAttribute('zone') || this.default_zone;
        }
        set zone(newValue) {
            // 修改后立即重启
            this.setAttribute('zone', newValue);
        }
        attributeChangedCallback(name, oldValue, newValue) {
            clearTimeout(this.deamon);
            this.tik_tok();
        }
        static get observedAttributes() {
            return ['format', 'system', 'zone'];
        }
    }
    customElements.define('digit-clock', DigitClock);
})();
