import fetchMock from 'fetch-mock';

import { WeatherAPI } from './WeatherAPI';

beforeEach(() => {
  fetchMock.reset()
})

describe('WeatherAPI', () => {
  it('should make the correct api request', async () => {
    fetchMock.getOnce('*', {
      body: { message: 'works' },
      headers: { 'content-type': 'application/json' },
    })

    const api = new WeatherAPI('abc')

    expect(await api.getWeatherByCityName('Test')).toEqual({ message: 'works' })
  })

  it('include the right query params', async () => {
    const mockedFetch = fetchMock.getOnce('*', {
      body: { message: 'works' },
      headers: { 'content-type': 'application/json' },
    })

    const apiKey = 'abc'
    const city = 'qwe'
    const api = new WeatherAPI(apiKey)
    await api.getWeatherByCityName(city)

    expect(mockedFetch.calls()).toHaveLength(1)
    const calledUrl = mockedFetch.calls()[0][0]

    expect(calledUrl).toBeTruthy()
    expect(new URL(calledUrl).searchParams.get('appid')).toBe(apiKey)
    expect(new URL(calledUrl).searchParams.get('q')).toBe(city)
  })
})
