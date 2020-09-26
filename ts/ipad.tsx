const log = console.log;
const dir = console.dir;
const q = document.querySelector.bind(document);


function Ide(props:any){
    const style = {
        // border:'1px solid black',
        width:'90vw',
        height:'90vh',
        backgroundColor:'lightgray',
        fontSize:`${props.fontsize}rem`,

    }
    const tpl = (
        <textarea style={style} spellCheck="false"></textarea>
    );

    return tpl;
}

function Panel(props:any){
    const style = {
        margin:'20px 0 20px 0',
        border: '1px solid gray',
    };

    const btn_style = {        
        margin:'0 20px 0 20px',
        fontSize:`${props.fontsize}rem`,
    };

    const btn_style2 = {       
        margin:'0 20px 0 20px', 
        backgroundColor:'lightgray',
        fontSize:`${props.fontsize}rem`,
    };

    const label_style = {
        border:'1px solid black',
        // minWidth:'100px',
    }
    const tpl = (
        <div style={style}>
            {/* 与 Run 分开, 防止误触 */}
            <button onClick={clear} style={btn_style}>Clear</button>
            
            <button onClick={()=>{props.callback(0.2)}} style={btn_style2}>Font+</button>            
            <button onClick={()=>{props.callback(-0.2)}} style={btn_style2}>Font-</button>            
                        
            <button onClick={run} style={btn_style}>Run</button>
            
            <label style={label_style}>Return Value:</label>
        </div>
    )

    return tpl;
}

function App(props:any){
    
    const [fontSize, setFontSize] = React.useState(1);

    const changFontSize = (x:number)=>{
        setFontSize(fontSize+x)
    }
    const tpl = (
        <div>
            <Panel callback={changFontSize} fontsize={fontSize}/>   
            <Ide fontsize={fontSize}/>
        </div>        
    )

    return tpl;
}

window.onload = ()=>{
    ReactDOM.render(<App/>, document.querySelector('#app')); 
}

function run(){
    let ta=q('textarea')
    let lab=q('label')
    if(lab === null){
        return;
    }
    if(ta === null){
        return;
    }

    let cd2:any = `return (()=>${ta.value})()`;
    let cd:any = ta.value;
    let f=new Function(cd2)
    // let f2=new Function(cd2)
    try{
        let r=f()
        // if(r===undefined){
        //     r=f2()
        // }
        lab.innerText = r
    }catch(e){        
        lab.innerText = e
    }
    
}

function clear(){
    let ta=q('textarea')
    if(ta !== null){
        ta.value = ''
    }
}