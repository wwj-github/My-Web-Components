const log = console.log;
const dir = console.dir;
const q = document.querySelector.bind(document);


function Ide(props:any){
    const style = {
        // border:'1px solid black',
        width:'90vw',
        height:'90vh',
        backgroundColor:'lightgray',

    }
    const tpl = (
        <textarea style={style}></textarea>
    );

    return tpl;
}


window.onload = ()=>{
    const tpl = (
        <div>
            <button onClick={run}>Run</button><br/>
            <Ide/>
        </div>        
    )
    ReactDOM.render(tpl, document.querySelector('#app')); 
}

function run(){
    let ta=q('textarea')
    let cd:any=ta?.value
    let f=new Function(cd)
    f()
}

