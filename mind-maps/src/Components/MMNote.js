import React from 'react';

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
                width: "280px",
                height: "150px",
                left: props.x + "px",
                top: props.y + "px",
                transform: "translateY(0)"
            },
            items: [],
            diffX: 0,
            diffY: 0,
            dragging: false,
            leeway:0,
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.hideText = this.hideText.bind(this);
        this.showText = this.showText.bind(this);
    }

    handleMouseDown(e){
        // console.log(e.target.parentElement.parentElement); //this is the area element
        const rect = e.target.parentElement.getBoundingClientRect();
        /* console.log(e.offsetX, e.offsetY, rect.left, rect.top);
        console.log(e.pageX, e.pageY, rect.left, rect.top);
        console.log(e.clientX, e.clientY, rect.left, rect.top); // choose client X/Y
        console.log(e.screenX, e.screenY, rect.left, rect.top); */

        /* setTimeout(()=>{
            this.setState(prevState=>{
                return {
                    style:{
                        ...prevState.style,
                        transform: "translateY(0px)"
                    }
                }
            });
        }, 2000); */

        this.setState({
            diffX: e.clientX - rect.left,
            diffY: e.clientY - rect.top,
            dragging: true
        });
    }

    handleMouseUp(e){
        this.setState({
            dragging: false
        })
    }

    handleMouseMove(e){
        if(this.state.dragging)
        {
            let left = e.clientX - this.state.diffX;
            // let top = e.clientY - this.state.diffY;
            let translate_top = parseInt(e.target.parentElement.getBoundingClientRect().top) 
            - parseInt(e.target.parentElement.parentElement.getBoundingClientRect().top) 
            + parseInt(e.clientY - e.target.parentElement.getBoundingClientRect().top) - 10;

            // console.log(e.clientX - this.state.diffX, e.clientY - this.state.diffY);
            /* this.setState({
                diffX: e.clientX,
                diffY: e.clientY,
            }); */
           
            this.setState(prevState => {
                return {
                    style:{
                        ...prevState.style,
                        left:left+"px",
                        transform: `translateY(${(translate_top > 0)? translate_top : 0}px)`
                    }
                }
            });
        }
    }
    
    handleSubmit = function(e){
        e.preventDefault();
        const msg = this.inp_ref.value;
        this.setState(prevState => {
            return {
                items: [...prevState.items, <li key={prevState.items.length}>{msg}</li>]
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
        return (<div style={this.state.style} ref={r => {this.div_ref = r;}} >
            <div id={this.props.id} 
                style={{width: "260px", height:"20px", backgroundColor:"grey", position:"absolute", left:"10px", textAlign:"center"}} 
                onMouseDown={this.handleMouseDown} 
                onMouseMove={this.handleMouseMove} 
                onMouseUp={this.handleMouseUp}
                onMouseEnter={this.hideText}
                onMouseLeave={this.showText}
            >
                <section ref={a=>{this.secref = a;}} >Click here to drag</section>
            </div>
            <br />
            <form style={{position:"absolute", top:"22px"}} onSubmit={this.handleSubmit}>
                <input type="text" ref={r => {this.inp_ref = r;}}></input>
                <button type="submit">Submit</button>
            </form>
            <ul style={{position:"relative",width:"100px", top:"35px"}}>
                {this.state.items}
            </ul>
        </div>);
    }
}

export default MMNote;

