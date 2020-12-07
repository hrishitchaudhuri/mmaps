import React from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import Button from './Button';

function getIntPx(s){
    let pInd = s.indexOf('p');
    return parseInt(s.slice(0, pInd));
}

class MMNote extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
            style: {
                position: "absolute",
                borderStyle: "solid",
                borderColor: "black",
                borderWidth: "2px",
                borderRadius: "5px",
                width: "280px",
                height: "150px",
                left: props.x + "px",
                top: props.y + "px",
                transform: "translateY(0)",
            },
            items: [],
            messages: [],
            title: '',
            diffX: 0,
            diffY: 0,
            dragging: false,
            leeway: 1
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideText = this.hideText.bind(this);
        this.showText = this.showText.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClear = this.handleClear.bind(this);

        var noteid = {
            'NOTE_ID':this.props.id
        };

        var query = Object.keys(noteid).map(key => key + '=' + noteid[key]).join('&');
        var req_url = 'http://localhost:8000/mapi/?' + query;

        fetch(req_url)
            .then(async res=> {
                const data = await res.json();

                console.log(data);
                
                var count = 0;
                if (data && data.TITLE && data.ITEMS) {
                    this.setState({
                        items: data.ITEMS.map(element => <li key={count++}>{"" + element}</li>),
                        messages: data.ITEMS,
                        title: data.TITLE
                    })
                    console.log("[INFO] Set State Successful.");
                }
            })
            .then(console.log("[INFO] Successfully Loaded Data."));
    }

    handleDrag = (e, ui) => {
        const {x, y} = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });
    };

    handleSave = function(e) {
        e.preventDefault();
        const NOTE_ID = this.props.id;
        const ITEMS = this.state.messages;
        const TITLE = this.state.title;

        const NOTE = {
            NOTE_ID, 
            ITEMS, 
            TITLE
        };

        console.log(NOTE);
        axios
            .post('http://localhost:8000/mapi', NOTE)
            .then((res)=>console.log('[INFO] Notes posted to DB successfully.' + res.text()))
            .catch(err => {
                console.log("[ERR] " + err);
            });
    }
    
    handleClear = function(e) {
        e.preventDefault();
        const NOTE_ID = this.props.id;

        const NOTE_del = {
            NOTE_ID
        };

        this.title_ref.value = '';

        this.setState(prevState => {
            return {
                items: [],
                messages: [],
                title: '',
                style: {
                    ...prevState.style,
                    height: "150px"
                }, 
                leeway: 1
            }
        });

        axios
            .post('http://localhost:8000/mapi/delete', NOTE_del)
            .then((res)=>console.log('[INFO] Note cleared successfully.' + res.text()))
            .catch(err => {
                console.log('[ERR] ' + err);
            });
    }

    handleSubmit = function(e){
        e.preventDefault();
        const msg = this.inp_ref.value;
        const note_title = this.title_ref.value;

        this.setState(prevState => {
            if(msg !== "")
            {
                return {
                    items: [...prevState.items, <li key={prevState.items.length}>{"" + msg}</li>],
                    messages: [...prevState.messages, msg],
                    title: note_title
                }
            }
            else{
                return prevState;
            }
        });
        this.inp_ref.value = "";
    }

    hideText(){
        this.secref.style.visibility = "hidden";
    }

    showText(){
        this.secref.style.visibility = "visible";
    }

    componentDidUpdate(){
        if(this.state.items.length >= this.state.leeway){
            this.setState(prevState=>{
                return {
                    style:{
                        ...prevState.style,
                        height: (getIntPx(prevState.style.height) + 20) + "px"
                    },
                    leeway: prevState.leeway + 1
                }
            });
        }
    }

    render(){
        return (<Draggable handle=".handle" bounds="parent">
        <div style={this.state.style} ref={r => {this.div_ref = r;}} >
            <div id={this.props.id} className="handle"
                style={{width: "100%", height:"20px", backgroundColor:"rgb(280, 280, 60)", position:"absolute", textAlign:"center"}} 
                onMouseEnter={this.hideText}
                onMouseLeave={this.showText}
            >
                <section ref={a=>{this.secref = a;}} >Click here to drag</section>
            </div>
            <br />
            <form style={{position:"absolute", top:"22px"}} onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Title" defaultValue={this.state.title} style={{width:"100%"}} ref={r => {this.title_ref = r;}}></input>
                <input type="text" ref={r => {this.inp_ref = r;}}></input>
                <button type="submit" className="submit-button">Add point</button>
            </form>
            <br/>
            <ul style={{position:"relative",width:"100%", top:"35px"}}>
                {this.state.items} <br/>
            </ul>
            <br/><br/>
            <Button style={{position:"relative", width:"100%", top:"100%"}} color="green" finalcolor="rgb(0, 165, 0)" text="Save" handleClick={this.handleSave} />
            <Button style={{position:"relative", width:"100%", top:"100%"}} color="green" finalcolor="rgb(0, 165, 0)" text="Clear" handleClick={this.handleClear} />
        </div>
        </Draggable>);
    }
}

export default MMNote;