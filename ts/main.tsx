











function Tb(){
    const col = ['aa','bb'];
    const ths = col.map((x:any)=>{
        return <th>{x}</th>
    });

    const trs = data.map((x:any)=>{
        const tpl = (<tr>
            <td>{x.id}</td>
            <td>{x.tech}</td>
        </tr>)

        return tpl;
    });

    const tpl = (
        <table>
            {trs}
        </table>
    );

    return tpl;
}

function App(){
    const tpl = (
    <>
    <Tb/>
    </>);

    return tpl;
}

window.onload = ()=>{
    ReactDOM.render(
        <App/>,
        document.querySelector('#app')
    )    
}