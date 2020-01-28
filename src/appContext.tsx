import { Action, applyMiddleware, combineReducers, createStore, Reducer } from 'redux';
import logger from 'redux-logger';
import thunk, { ThunkAction } from 'redux-thunk';

import { API_KEY } from './constants/api';
import capitalCities from './constants/capitalCities.json';
import { IWeatherAPI } from './network/interfaces';
import { WeatherAPI } from './network/WeatherAPI';
import { weatherReportsReducer } from './weather-app/reducers/selectedCitiesReducer';

// ────────────────────────────────────────────────────────────────────────────────

const defaultRootReducer = combineReducers({
  cities: (state = [], action) => state,
  weatherReports: weatherReportsReducer,
})

const defaultApi = new WeatherAPI(API_KEY)

export function createReduxStore(
  initialState: AppState = defaultInitialState,
  rootReducer: Reducer<any> = defaultRootReducer,
  api: IWeatherAPI = defaultApi
) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk.withExtraArgument(api), logger)
  )
}

// ────────────────────────────────────────────────────────────────────────────────

export interface WeatherReport {
  min: number
  max: number
}

export type City = string

export type WeatherReportsState = Record<City, WeatherReport | null>

export interface AppState {
  cities: City[]
  weatherReports: WeatherReportsState
}

const defaultInitialState: AppState = {
  cities: capitalCities,
  weatherReports: {},
}

export type ThunkActionType<A extends Action> = ThunkAction<void, AppState, WeatherAPI, A>

// ────────────────────────────────────────────────────────────────────────────────
