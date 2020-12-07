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

    function handleSearch() {
        var result = prompt("Enter Title:");

        var title = {
            'TITLE':result
        };

        var query = Object.keys(title).map(key => key + '=' + title[key]).join('&');
        var req_url = 'http://localhost:8000/mapi/search/?' + query;

        fetch(req_url)
            .then(async res=> {
                const data = await res.json();
                
                if (data.length > 0) {
                    var res_string = 'YOUR SEARCH RETURNED : \n'
                    for (let i=0; i < data.length; i++) {
                        for (let j=0; j < data[i].ITEMS.length; j++) {
                            res_string += '\t' + data[i].ITEMS[j] + '\n';
                        }
                    }
                    alert(res_string);
                }

                else {
                    alert("No matches found.");
                }
            })
            .then(console.log("[INFO] Successfully Loaded Data."));
    }

    return (<div>
        <MindMapArea elems={notes}/>
        <br />
        <div style={{display:"flex", flexDirection:"row", height:"50px", alignItems:"center"}}>
            <Button color="blue" finalcolor="rgb(40, 40, 255)" text="Add Node" handleClick={handleclick}/>
            <Button color="rgb(100, 0, 255)" finalcolor="rgb(120, 50, 255)" text="Search Titles" handleClick={handleSearch} />
        </div>
    </div>);
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <MindMap />
            </div>
        );
    }
}

document.querySelector('html').style.scrollBehavior = "smooth";
document.getElementById('root').style.position = "absolute";
ReactDOM.render(<App />, document.getElementById('root'));
