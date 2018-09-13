import React from 'react';
import {
  render,
  cleanup,
  fireEvent
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import detectPassiveEvents from 'detect-passive-events';

// require('raf').polyfill();
import ScrollUpButton, { CircleArrow, VerticleButton, TinyButton } from '../src/react-scroll-up-button';
jest.mock('detect-passive-events')

afterEach(()=>{
  cleanup()
})
beforeEach(()=>{
  window.pageYOffset = 0
  global.scrollTo = jest.fn((x,y)=>{
    window.pageXOffset = x
    window.pageYOffset = y
    window.dispatchEvent(new window.UIEvent('scroll'));
  })
})
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

var currentPositionY = function () {
  var supportPageOffset = window.pageXOffset !== undefined;
  var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
  return supportPageOffset ? window.pageYOffset : isCSS1Compat ?
    document.documentElement.scrollTop : document.body.scrollTop;
};

describe('React unit/intergration testing', () => {

  test('Aside to be rendered', async () => {
    const {
      container,
      getByTestId,
    } = render(<ScrollUpButton/>)
    const Aside = getByTestId('react-scroll-up-button')
    expect(container).toContainElement(Aside)
  });

  test('mock detect-passive-events, branch testing', async () => {
    const {
      rerender,
      container,
      getByTestId,
    } = render(<ScrollUpButton/>)
    detectPassiveEvents.hasSupport = true
    rerender(<ScrollUpButton/>)
  });

  test('transition class applied on scroll', async () => {
    const {
      container,
      getByTestId,
    } = render(<ScrollUpButton/>)
    const Aside = getByTestId('react-scroll-up-button')

    expect(Aside).toHaveClass('ScrollUpButton__Container')
    window.pageYOffset = 160
    window.dispatchEvent(new window.UIEvent('scroll'));

    expect(Aside).toHaveClass('ScrollUpButton__Toggled')
  });

  test('loses transition class after scrolling up', async (done) => {
    const {
      container,
      getByTestId,
    } = render(<ScrollUpButton AnimationDuration={10}/>)
    const Aside = getByTestId('react-scroll-up-button')
    expect(Aside).not.toHaveClass('ScrollUpButton__Toggled')

    window.pageYOffset = 160
    window.dispatchEvent(new window.UIEvent('scroll'));

    expect(Aside).toHaveClass('ScrollUpButton__Toggled')
    fireEvent.click(Aside)
    setTimeout(function(){
      expect(Aside).not.toHaveClass('ScrollUpButton__Toggled')
      done();
    },1000)
  });

  test('stopPosition props stops scrolling at desired position', async (done) => {
    const {
      container,
      getByTestId,
    } = render(<ScrollUpButton AnimationDuration={10} StopPosition={30}/>)
    const Aside = getByTestId('react-scroll-up-button')
    window.pageYOffset = 300
    window.dispatchEvent(new window.UIEvent('scroll'));

    expect(Aside).toHaveClass('ScrollUpButton__Toggled')
    fireEvent.click(Aside)
    setTimeout(function(){
      expect(Aside).not.toHaveClass('ScrollUpButton__Toggled')
      expect(global.scrollTo).toHaveBeenLastCalledWith(0,30)
      done();
    },1000)
  });

  test('can accept props', async () => {
    // jest-prop-type-error will throw if props dont match proptypes
    render(<ScrollUpButton 
      ShowAtPostion={200}
      StopPosition={100}
      style={{}}
      ToggledStyle={{}}
      ContainerClassName="NewClass"
      TransitionClassName="AnotherClass"
      EasingType="easeInOutBounce"
      AnimationDuration={1000}/>)
  });

});

describe('Named exports render', () => {

  test('CircleArrow is rendered', async () => {
    const {
      container,
      getByTestId,
    } = render(<CircleArrow/>)
    const Aside = getByTestId('react-scroll-up-button')
    expect(container).toContainElement(Aside)
  });
  test('VerticleButton is rendered', async () => {
    const {
      container,
      getByTestId,
    } = render(<VerticleButton/>)
    const Aside = getByTestId('react-scroll-up-button')
    expect(container).toContainElement(Aside)
  });
  test('TinyButton is rendered', async () => {
    const {
      container,
      getByTestId,
    } = render(<TinyButton/>)
    const Aside = getByTestId('react-scroll-up-button')
    expect(container).toContainElement(Aside)
  });
});

describe('unit/intergration testing on children', () => {

  test('loses transition class after scrolling up', async (done) => {
    const {
      container,
      getByTestId,
    } = render(<CircleArrow AnimationDuration={10}/>)
    const Aside = getByTestId('react-scroll-up-button')
    expect(Aside).not.toHaveClass('ScrollUpButton__Toggled')

    window.pageYOffset = 160
    window.dispatchEvent(new window.UIEvent('scroll'));

    expect(Aside).toHaveClass('ScrollUpButton__Toggled')
    fireEvent.click(Aside)
    setTimeout(function(){
      expect(Aside).not.toHaveClass('ScrollUpButton__Toggled')
      done();
    },1000)
  });

});