import { AppState } from 'appContext';
import { Store } from 'redux';
import { createCityAddedSideEffect } from 'weather-app/effects/createCityAddedSideEffect';

import { createReduxStore } from '../../appContext';
import { IWeatherAPI, WeatherReportResponse } from '../../network/interfaces';

let store: Store<AppState>

beforeEach(() => {})

describe('CreateCityAddedSideEffect', () => {
  it('should work as expected in happy scenarios', () => {
    const fakeApi: IWeatherAPI = {
      getWeatherByCityName(city: string) {
        const fakeResponse = {
          main: {
            temp_min: 0,
            temp_max: 10,
          },
        } as WeatherReportResponse
        return Promise.resolve(fakeResponse)
      },
    }

    store = createReduxStore(undefined, undefined, fakeApi)

    store.dispatch(createCityAddedSideEffect('hell'))

    // wait for promises to resolve
    setTimeout(() => {
      const newState = store.getState().weatherReports['hell']
      expect(newState).toEqual({ min: 0, max: 10 })
    }, 0)
  })

  it('should handle errors', () => {
    const fakeApi: IWeatherAPI = {
      getWeatherByCityName(city: string) {
        return Promise.reject({})
      },
    }

    store = createReduxStore(undefined, undefined, fakeApi)

    // current implementation uses alert which is something you never use in real app. but
    // for now we just fake it to make jest happy.
    window.alert = () => {}

    store.dispatch(createCityAddedSideEffect('hell'))

    // wait for promises to resolve
    setTimeout(() => {
      const newState = store.getState().weatherReports['hell']
      expect(newState).toBe(undefined)
    }, 0)
  })
})
