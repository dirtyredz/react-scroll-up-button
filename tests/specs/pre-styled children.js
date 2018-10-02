import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import detectPassiveEvents from 'detect-passive-events';
import { CircleArrow } from '../../src/react-scroll-up-button';

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

describe('unit/intergration testing on children', () => {
  test('loses transition class after scrolling up', async (done) => {
    const {
      getByTestId,
    } = render(<CircleArrow AnimationDuration={10} />)
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
});
