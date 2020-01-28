import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';

import { SearchBar } from './SearchBar';

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

const suggestionsDivSelector = '[data-testid="suggestions"]'

describe('SearchBar', () => {
  it('should render input field', () => {
    act(() => {
      ReactDOM.render(<SearchBar onSearch={() => {}}></SearchBar>, container)
    })

    expect(container?.querySelector('input')).toBeInTheDocument()
  })

  it('should not show suggestions initially but show it after user interaction', () => {
    const suggestionsDivSelector = '[data-testid="suggestions"]'

    act(() => {
      ReactDOM.render(
        <SearchBar onSearch={() => {}} suggestions={['a', 'b', 'c']}></SearchBar>,
        container
      )
    })

    expect(container?.querySelector(suggestionsDivSelector)).not.toBeInTheDocument()

    act(() => {
      container?.querySelector('input')?.focus()
    })

    expect(container?.querySelector(suggestionsDivSelector)).toBeInTheDocument()
  })

  it('should show correct suggestions', () => {
    act(() => {
      ReactDOM.render(
        <SearchBar onSearch={() => {}} suggestions={['a', 'b', 'c']}></SearchBar>,
        container
      )
    })

    act(() => {
      container?.querySelector('input')?.focus()
    })

    expect(container?.querySelector(suggestionsDivSelector)).toBeInTheDocument()
    expect(container?.querySelectorAll(suggestionsDivSelector + ' > *')).toHaveLength(3)

    act(() => {
      const input = container?.querySelector('input')
      if (input) {
        input.value = 'a'
        Simulate.change(input)
      }
    })

    expect(container?.querySelectorAll(suggestionsDivSelector + ' > *')).toHaveLength(1)
  })

  it('should call the callback when user selects the suggestion', () => {
    const spy = jest.fn()

    act(() => {
      ReactDOM.render(
        <SearchBar onSearch={spy} suggestions={['a', 'b', 'c']}></SearchBar>,
        container
      )
    })

    act(() => {
      const input = container?.querySelector('input')
      if (input) {
        input.focus()
        input.value = 'a'
        Simulate.change(input)
      }
    })

    const firstSuggestion = container?.querySelector(suggestionsDivSelector + ' > *')

    expect(firstSuggestion).toBeInTheDocument()

    act(() => {
      if (firstSuggestion) {
        Simulate.click(firstSuggestion)
      }
    })

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith('a')
  })
})
