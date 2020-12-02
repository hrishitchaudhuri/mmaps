import React from 'react';
import Draggable from 'react-draggable';

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
            diffX: 0,
            diffY: 0,
            dragging: false,
            leeway:0,
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideText = this.hideText.bind(this);
        this.showText = this.showText.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
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
    
    handleSubmit = function(e){
        e.preventDefault();
        const msg = this.inp_ref.value;
        this.setState(prevState => {
            if(msg != "")
            {
                return {
                    items: [...prevState.items, <li key={prevState.items.length}>{"" + msg}</li>]
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
        if(this.state.items.length >= 5+this.state.leeway){
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
                style={{width: "100%", height:"20px", backgroundColor:"grey", position:"absolute", textAlign:"center"}} 
                onMouseEnter={this.hideText}
                onMouseLeave={this.showText}
            >
                <section ref={a=>{this.secref = a;}} >Click here to drag</section>
            </div>
            <br />
            <form style={{position:"absolute", top:"22px"}} onSubmit={this.handleSubmit}>
                <input type="text" ref={r => {this.inp_ref = r;}}></input>
                <button type="submit" className="submit-button">Add point</button>
            </form>
            <ul style={{position:"relative",width:"100px", top:"35px"}}>
                {this.state.items}
            </ul>
        </div>
        </Draggable>);
    }
}

export default MMNote;

