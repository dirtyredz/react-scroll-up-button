import React from 'react';
import ReactDOM from 'react-dom'; // eslint-disable-line
import * as ScrollUpButtons from '../src/react-scroll-up-button';

class Toggle extends React.Component {
  constructor() {
    super();
    this.state = {
      currentBtn: 'default',
    };
  }

  handleClick(btn) {
    this.setState({ currentBtn: btn });
  }

  render() {
    const { currentBtn } = this.state
    return (
      <div>
        {Object.keys(ScrollUpButtons).map(btn => (
          <div key={`${btn}_button`}>
            <button
              type="button"
              style={{ position: 'fixed' }}
              disabled={currentBtn === btn}
              onClick={this.handleClick.bind(this, btn)}
            >
              {currentBtn === btn ? `Unmount ${btn}` : `Mount ${btn}`}
            </button>
            <br />
            <br />
          </div>
        ))}
        {Object.keys(ScrollUpButtons).map((btn) => {
          const CurBtn = ScrollUpButtons[btn]
          if (currentBtn === btn) {
            return <CurBtn key={btn} />
          }
          return null
        })}
      </div>
    );
  }
}

const rootEl = document.getElementById('ReactRoot');
ReactDOM.render(
  <div>
    <h1>REACT-SCROLL-UP-BUTTON</h1>
    <Toggle />
  </div>,
  rootEl
);
