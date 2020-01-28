import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { Report } from 'weather-app/WeatherApp';

import { WeatherReportView } from './WeatherReportView';

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
  it('should render the given reports', () => {
    const sampleReports: Report[] = [
      ['london', { min: 10, max: 20 }],
      ['Oslo', { min: -10, max: -9 }],
    ]

    act(() => {
      ReactDOM.render(
        <WeatherReportView onRemove={() => {}} reports={sampleReports} />,
        container
      )
    })

    expect(
      container?.querySelectorAll('[data-testid="weather-report-card"]')
    ).toHaveLength(2)
  })

  it('should call the remove callback', () => {
    const sampleReports: Report[] = [
      ['london', { min: 10, max: 20 }],
      ['Oslo', { min: -10, max: -9 }],
    ]

    const spy = jest.fn()

    act(() => {
      ReactDOM.render(
        <WeatherReportView onRemove={spy} reports={sampleReports} />,
        container
      )
    })

    const firstReport = container?.querySelector('[data-testid="weather-report-card"]')
    const removeButton = firstReport?.querySelector('button')

    expect(removeButton).toBeInTheDocument()

    act(() => {
      if (removeButton) {
        Simulate.click(removeButton)
      }
    })

    expect(spy).toBeCalledWith(sampleReports[0][0])
  })
})
