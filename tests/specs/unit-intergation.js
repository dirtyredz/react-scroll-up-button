import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import detectPassiveEvents from 'detect-passive-events';
import ScrollUpButton from '../../src/react-scroll-up-button';

jest.mock('detect-passive-events')

afterEach(() => {
  cleanup()
})
beforeEach(() => {
  window.pageYOffset = 0
  global.scrollTo = jest.fn((x, y) => {
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
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
      pass: false,
    };
  },
});

describe('React unit/intergration testing', () => {
  test('Aside to be rendered', async () => {
    const {
      container,
      getByTestId,
    } = render(<ScrollUpButton />)
    const Aside = getByTestId('react-scroll-up-button')
    expect(container).toContainElement(Aside)
  });

  test('mock detect-passive-events, branch testing', async () => {
    const {
      rerender,
    } = render(<ScrollUpButton />)
    detectPassiveEvents.hasSupport = true
    rerender(<ScrollUpButton />)
  });

  test('transition class applied on scroll', async () => {
    const {
      getByTestId,
    } = render(<ScrollUpButton />)
    const Aside = getByTestId('react-scroll-up-button')

    expect(Aside).toHaveClass('ScrollUpButton__Container')
    window.pageYOffset = 160
    window.dispatchEvent(new window.UIEvent('scroll'));

    expect(Aside).toHaveClass('ScrollUpButton__Toggled')
  });

  test('loses transition class after scrolling up', async (done) => {
    const {
      getByTestId,
    } = render(<ScrollUpButton AnimationDuration={10} />)
    const Aside = getByTestId('react-scroll-up-button')
    expect(Aside).not.toHaveClass('ScrollUpButton__Toggled')

    window.pageYOffset = 160
    window.dispatchEvent(new window.UIEvent('scroll'));

    expect(Aside).toHaveClass('ScrollUpButton__Toggled')
    fireEvent.click(Aside)
    setTimeout(() => {
      expect(Aside).not.toHaveClass('ScrollUpButton__Toggled')
      done();
    }, 1000)
  });

  test('stopPosition props stops scrolling at desired position', async (done) => {
    const {
      getByTestId,
    } = render(<ScrollUpButton AnimationDuration={10} StopPosition={30} />)
    const Aside = getByTestId('react-scroll-up-button')
    window.pageYOffset = 300
    window.dispatchEvent(new window.UIEvent('scroll'));

    expect(Aside).toHaveClass('ScrollUpButton__Toggled')
    fireEvent.click(Aside)
    setTimeout(() => {
      expect(Aside).not.toHaveClass('ScrollUpButton__Toggled')
      expect(global.scrollTo).toHaveBeenLastCalledWith(0, 30)
      done();
    }, 1000)
  });

  test('can accept props', async () => {
    render(<ScrollUpButton
      ShowAtPosition={200}
      StopPosition={100}
      style={{}}
      ToggledStyle={{}}
      ContainerClassName="NewClass"
      TransitionClassName="AnotherClass"
      EasingType="easeInOutBounce"
      AnimationDuration={1000}
    />)
  });
});
