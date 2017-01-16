import React from 'react';
import ReactDOM from 'react-dom';
import ScrollUpButton from '../src/react-scroll-up-button';

const rootEl = document.getElementById('ReactRoot');
ReactDOM.render(
  <div>
    <h1>TEST</h1>
    <ScrollUpButton StopPosition={0}/>
  </div>
  ,rootEl
);
