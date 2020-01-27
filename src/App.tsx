import './styles.css';

import React from 'react';
import { Provider } from 'react-redux';
import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk, { ThunkAction } from 'redux-thunk';

import { API_KEY } from './constants/api';
import capitalCities from './constants/capitalCities.json';
import { WeatherAPI } from './network/WeatherAPI';
import { City, weatherReportsReducer } from './weather-app/reducers/selectedCitiesReducer';
import { ConnectedWeatherApp } from './weather-app/WeatherApp';

export interface WeatherReport {
  min: number
  max: number
}

export type WeatherReportsState = Record<City, WeatherReport | null>

export interface AppState {
  cities: City[]
  weatherReports: WeatherReportsState
}

const initialState: AppState = {
  cities: capitalCities,
  weatherReports: {},
}

export type ThunkActionType<A extends Action> = ThunkAction<void, AppState, WeatherAPI, A>

const api = new WeatherAPI(API_KEY)

const rootReducer = combineReducers({
  cities: (state = [], action) => state,
  weatherReports: weatherReportsReducer,
})

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk.withExtraArgument(api), logger)
)

export default function App() {
  return (
    <Provider store={store}>
      <ConnectedWeatherApp></ConnectedWeatherApp>
    </Provider>
  )
}
