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
        fontSize: `${props.fontsize}rem`,
    };
    const tpl = (React.createElement("textarea", { style: style, spellCheck: "false" }));
    return tpl;
}
function Panel(props) {
    const style = {
        margin: '20px 0 20px 0',
        border: '1px solid gray',
    };
    const btn_style = {
        margin: '0 20px 0 20px',
        fontSize: `${props.fontsize}rem`,
    };
    const btn_style2 = {
        margin: '0 20px 0 20px',
        backgroundColor: 'lightgray',
        fontSize: `${props.fontsize}rem`,
    };
    const label_style = {
        border: '1px solid black',
    };
    const tpl = (React.createElement("div", { style: style },
        React.createElement("button", { onClick: clear, style: btn_style }, "Clear"),
        React.createElement("button", { onClick: () => { props.callback(0.2); }, style: btn_style2 }, "Font+"),
        React.createElement("button", { onClick: () => { props.callback(-0.2); }, style: btn_style2 }, "Font-"),
        React.createElement("button", { onClick: run, style: btn_style }, "Run"),
        React.createElement("label", { style: label_style }, "Return Value:")));
    return tpl;
}
function App(props) {
    const [fontSize, setFontSize] = React.useState(1);
    const changFontSize = (x) => {
        setFontSize(fontSize + x);
    };
    const tpl = (React.createElement("div", null,
        React.createElement(Panel, { callback: changFontSize, fontsize: fontSize }),
        React.createElement(Ide, { fontsize: fontSize })));
    return tpl;
}
window.onload = () => {
    ReactDOM.render(React.createElement(App, null), document.querySelector('#app'));
};
function run() {
    let ta = q('textarea');
    let lab = q('label');
    if (lab === null) {
        return;
    }
    if (ta === null) {
        return;
    }
    let cd2 = `return (()=>${ta.value})()`;
    let cd = ta.value;
    let f = new Function(cd2);
    // let f2=new Function(cd2)
    try {
        let r = f();
        // if(r===undefined){
        //     r=f2()
        // }
        lab.innerText = r;
    }
    catch (e) {
        lab.innerText = e;
    }
}
function clear() {
    let ta = q('textarea');
    if (ta !== null) {
        ta.value = '';
    }
}
