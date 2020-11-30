import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from './Components/Button';
import MMNote from './Components/MMNote';

class MindMapArea extends React.Component{
    render(){
        return (<div id="area" style={{width:"1500px", height:"900px", borderWidth: "2px", borderStyle: "solid"}}>
            {this.props.elems}
        </div>);
    }
}

function MindMap(){

    const [ notes, setNotes ] = useState([]);
    const [ currkey, setKey ] = useState(0);

    function handleclick(){
        setNotes(prevNotes => [...prevNotes, <MMNote id={currkey} key={currkey} x={2} y={2} />]);
        setKey(prevKey => prevKey + 1);
    }

    

    return (<div>
        <MindMapArea elems={notes}/>
        <br />
        <Button color="green" text="Add Node" handleClick={handleclick}/>
    </div>);
}

function App(){
    return (<MindMap />);
}

document.querySelector('html').style.scrollBehavior = "smooth";
document.getElementById('root').style.position = "absolute";
ReactDOM.render(<App />, document.getElementById('root'));