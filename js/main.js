"use strict";
function Tb() {
    const col = ['aa', 'bb'];
    const ths = col.map((x) => {
        return React.createElement("th", null, x);
    });
    const trs = data.map((x) => {
        const tpl = (React.createElement("tr", null,
            React.createElement("td", null, x.id),
            React.createElement("td", null, x.tech)));
        return tpl;
    });
    const tpl = (React.createElement("table", null, trs));
    return tpl;
}
function App() {
    const tpl = (React.createElement(React.Fragment, null,
        React.createElement(Tb, null)));
    return tpl;
}
window.onload = () => {
    ReactDOM.render(React.createElement(App, null), document.querySelector('#app'));
};
