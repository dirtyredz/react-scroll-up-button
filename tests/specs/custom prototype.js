import React from 'react';
import {
  render,
  cleanup,
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import detectPassiveEvents from 'detect-passive-events'
import ScrollUpButton from '../../src/react-scroll-up-button'

jest.mock('detect-passive-events')

afterEach(() => {
  cleanup()
})

describe('custom proptype validators', () => {
  console.error = (err) => { throw new Error(err); };
  console.warn = (warning) => { throw new Error(warning); }

  test('LessThanShowAtPosition thows when StopPosition is not a number.', () => {
    expect(() => {
      render(<ScrollUpButton StopPosition="I am not a number" />)
    }).toThrow()
  })

  test('LessThanShowAtPosition throws when StopPosition is greater than ShowAtPosition.', () => {
    expect(() => {
      render(<ScrollUpButton StopPosition={100} ShowAtPosition={90} />)
    }).toThrow()
  });
});
