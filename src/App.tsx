import './styles.css';

import React from 'react';
import { Provider } from 'react-redux';

import { createReduxStore } from './appContext';
import { ConnectedWeatherApp } from './weather-app/WeatherApp';

const store = createReduxStore()

export default function App() {
  return (
    <Provider store={store}>
      <ConnectedWeatherApp />
    </Provider>
  )
}
