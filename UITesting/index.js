import React from 'react';
import ReactDOM from 'react-dom';
import ScrollUpButton from '../src/react-scroll-up-button';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: false};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'Mount react-scroll-up-button' : 'Unmount react-scroll-up-button'}
        </button>
        {this.state.isToggleOn ? null :
          <ScrollUpButton StopPosition={0} ContainerClassName="ScrollUpButton__Container" TransitionClassName="ScrollUpButton__Toggled">
            <svg viewBox="0 0 28 28" version="1.1"  xmlns="http://www.w3.org/2000/svg" x="0" y="0" xmlSpace="preserve">
              <path d="M26.297 20.797l-2.594 2.578c-0.391 0.391-1.016 0.391-1.406 0l-8.297-8.297-8.297 8.297c-0.391 0.391-1.016 0.391-1.406 0l-2.594-2.578c-0.391-0.391-0.391-1.031 0-1.422l11.594-11.578c0.391-0.391 1.016-0.391 1.406 0l11.594 11.578c0.391 0.391 0.391 1.031 0 1.422z"></path>
            </svg>
          </ScrollUpButton>
        }
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
