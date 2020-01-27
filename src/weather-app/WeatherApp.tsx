import { AppState, WeatherReport } from 'App';
import React from 'react';
import { connect } from 'react-redux';
import { createCityAddedSideEffect } from 'weather-app/createCityAddedSideEffect';

import { WeatherAppView } from './components/WeatherAppView';
import { AllActions, createCityRemovedAction } from './reducers/selectedCitiesReducer';
import { DispatchWithThunk } from './types';

export type Report = [string, WeatherReport | null]

interface OwnProps {}

interface StateProps {
  reports: [string, WeatherReport | null][]
  cities: string[]
  selectedCities: string[]
}

interface dispatchProps {
  addCity(cityName: string): void
  removeCity(cityName: string): void
}

type Props = OwnProps & StateProps & dispatchProps

export const WeatherApp: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <WeatherAppView
      cities={props.cities}
      addCity={props.addCity}
      removeCity={props.removeCity}
      weatherReports={props.reports}
      selectedCities={props.selectedCities}
    ></WeatherAppView>
  )
}

export const ConnectedWeatherApp = connect<StateProps, dispatchProps, OwnProps, AppState>(
  ({ weatherReports, cities }) => ({
    reports: Object.entries(weatherReports),
    cities: cities,
    selectedCities: Object.keys(weatherReports),
  }),
  (dispatch: DispatchWithThunk<AllActions>) => ({
    addCity: (cityName: string) => dispatch(createCityAddedSideEffect(cityName)),
    removeCity: (cityName: string) => dispatch(createCityRemovedAction(cityName)),
  })
)(WeatherApp)
