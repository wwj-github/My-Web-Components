"use strict";
const log = console.log;
const dir = console.dir;
const q = document.querySelector.bind(document);
function Ide(props) {
    const style = {
        // border:'1px solid black',
        width: '90vw',
        height: '90vh',
        backgroundColor: 'lightgray',
    };
    const tpl = (React.createElement("textarea", { style: style }));
    return tpl;
}
window.onload = () => {
    const tpl = (React.createElement("div", null,
        React.createElement("button", { onClick: run }, "Run"),
        React.createElement("br", null),
        React.createElement(Ide, null)));
    ReactDOM.render(tpl, document.querySelector('#app'));
};
function run() {
    let ta = q('textarea');
    let cd = ta === null || ta === void 0 ? void 0 : ta.value;
    let f = new Function(cd);
    f();
}
