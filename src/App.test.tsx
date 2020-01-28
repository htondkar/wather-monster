import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from './App';

let container: HTMLElement | null

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  if (container) {
    document.body.removeChild(container)
  }
  container = null
})

describe('App', () => {
  it('should not crash', () => {
    act(() => {
      ReactDOM.render(<App></App>, container)
    })

    expect(container).toBeInTheDocument()
  })
})
