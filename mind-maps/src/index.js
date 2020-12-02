import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from './Components/Button';
import MMNote from './Components/MMNote';

class MindMapArea extends React.Component{
    render(){
        return (<div id="area" style={{position:"relative", left:"15px", width:"1400px", height:"900px", borderWidth: "2px", borderStyle: "solid"}}>
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

    function handleSubmit () {
        
    }

    function handleConnection(){
        // handles making the lines (links) between notes.
    }

    return (<div>
        <MindMapArea elems={notes}/>
        <br />
        <div style={{display:"flex", flexDirection:"row", height:"50px", alignItems:"center"}}>
            <Button color="blue" finalcolor="rgb(40, 40, 255)" text="Add Node" handleClick={handleclick}/>
            <Button color="green" finalcolor="rgb(0, 165, 0)" text="Save" handleClick={handleSubmit} />
            <Button color="rgb(100, 0, 255)" finalcolor="rgb(120, 50, 255)" text="Add connection" height="40px" handleClick={handleConnection} />
        </div>
    </div>);
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={apiResponse:""};
    }

    callAPI() {
        fetch("http://localhost:8000/test-api")
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res}));
    }

    componentWillMount() {
        this.callAPI();
    }

    render(){
        return (
            <div>
                <MindMap />
                <p>{this.state.apiResponse}</p>
            </div>
        );
    }
}

document.querySelector('html').style.scrollBehavior = "smooth";
document.getElementById('root').style.position = "absolute";
ReactDOM.render(<App />, document.getElementById('root'));
