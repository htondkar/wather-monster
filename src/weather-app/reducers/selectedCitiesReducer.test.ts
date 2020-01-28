import { AppState } from 'appContext';

import { createReduxStore } from '../../appContext';
import {
    createCityAddedAction, createCityRemovedAction, createCityWeatherReportAction,
    weatherReportsReducer
} from './selectedCitiesReducer';

describe('action creators', () => {
  describe('createCityAddedAction', () => {
    it('should create the right action', () => {
      expect(createCityAddedAction('Test')).toEqual({
        type: 'CITY_ADDED',
        payload: 'Test',
        error: false,
      })
    })
  })

  describe('createCityRemovedAction', () => {
    it('should create the right action', () => {
      expect(createCityRemovedAction('Test')).toEqual({
        type: 'CITY_REMOVED',
        payload: 'Test',
        error: false,
      })
    })
  })

  describe('createCityWeatherReportAction', () => {
    it('should create the right action', () => {
      const report = { test: { min: 0, max: 10 } }
      expect(createCityWeatherReportAction(report)).toEqual({
        type: 'CITY_WEATHER_REPORT_UPDATE',
        payload: report,
        error: false,
      })
    })
  })

  describe('weatherReportsReducer', () => {
    it('should return initial state if action is not relevant', () => {
      const sampleState: AppState = {
        cities: [],
        weatherReports: {},
      }

      const store = createReduxStore(sampleState)
      store.dispatch({ type: 'NOT_RELEVANT' })

      expect(store.getState()).toEqual(sampleState)
    })

    it('should set the city in state and use null as the initial value of weather report', () => {
      const sampleState: AppState = {
        cities: [],
        weatherReports: {},
      }

      const store = createReduxStore(sampleState)
      store.dispatch(createCityAddedAction('test'))

      expect(store.getState().weatherReports).toEqual({ test: null })
    })

    it('should remove the city properly', () => {
      const sampleState: AppState = {
        cities: [],
        weatherReports: { test: null },
      }

      const store = createReduxStore(sampleState)
      store.dispatch(createCityRemovedAction('test'))

      expect(store.getState().weatherReports).toEqual({})
    })

    it('should update the weather report properly', () => {
      const sampleState: AppState = {
        cities: [],
        weatherReports: { test: null },
      }

      const store = createReduxStore(sampleState)
      expect(store.getState().weatherReports).toEqual({ test: null })

      store.dispatch(createCityWeatherReportAction({ test: { min: 0, max: 10 } }))
      expect(store.getState().weatherReports).toEqual({ test: { min: 0, max: 10 } })
    })
  })
})
