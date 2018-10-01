import React from 'react';
import {
  render,
  cleanup,
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import detectPassiveEvents from 'detect-passive-events';
import { CircleArrow, VerticleButton, TinyButton } from '../../src/react-scroll-up-button';

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

describe('Named exports render', () => {
  test('CircleArrow is rendered', async () => {
    const {
      container,
      getByTestId,
    } = render(<CircleArrow />)
    const Aside = getByTestId('react-scroll-up-button')
    expect(container).toContainElement(Aside)
  });
  test('VerticleButton is rendered', async () => {
    const {
      container,
      getByTestId,
    } = render(<VerticleButton />)
    const Aside = getByTestId('react-scroll-up-button')
    expect(container).toContainElement(Aside)
  });
  test('TinyButton is rendered', async () => {
    const {
      container,
      getByTestId,
    } = render(<TinyButton />)
    const Aside = getByTestId('react-scroll-up-button')
    expect(container).toContainElement(Aside)
  });
});
