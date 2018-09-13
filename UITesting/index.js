import React from 'react';
import ReactDOM from 'react-dom';
import * as ScrollUpButtons from '../src/react-scroll-up-button';

class Toggle extends React.Component {
  constructor() {
    super();
    this.state = {
      currentBtn: 'default'
    };
  }

  handleClick(btn) {
    this.setState({currentBtn: btn});
  }

  render() {
    return (
      <div>
        {Object.keys(ScrollUpButtons).map((btn,index)=>{
          return (
            <div key={btn+'_button'}>
              <button style={{position: 'fixed'}} disabled={this.state.currentBtn === btn} onClick={this.handleClick.bind(this,btn)}>
                {this.state.currentBtn === btn ? 'Unmount '+btn : 'Mount '+btn}
              </button>
              <br/>
              <br/>
            </div>
          )
        })}
        {Object.keys(ScrollUpButtons).map((btn,index)=>{
          const CurBtn = ScrollUpButtons[btn]
          if(this.state.currentBtn === btn)
            return <CurBtn key={btn}/>
        })}
      </div>
    );
  }
}

const rootEl = document.getElementById('ReactRoot');
ReactDOM.render(
  <div>
    <h1>REACT-SCROLL-UP-BUTTON</h1>
    <Toggle/>
  </div>
  ,rootEl
);
