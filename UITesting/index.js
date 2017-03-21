import React from 'react';
import ReactDOM from 'react-dom';
import ScrollUpButton from '../src/react-scroll-up-button';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    if(this.state.isToggleOn){
      return (
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'Mount react-scroll-up-button' : 'Unmount react-scroll-up-button'}
        </button>
      );
    }else{
      return (
        <div>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'Mount react-scroll-up-button' : 'Unmount react-scroll-up-button'}
        </button>
        <ScrollUpButton StopPosition={0}/>
      </div>
      );

    }
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
