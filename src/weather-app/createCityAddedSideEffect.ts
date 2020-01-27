import { AppState } from 'App';
import { IWeatherAPI } from 'network/interfaces';
import { Dispatch } from 'redux';
import {
    createCityAddedAction, createCityRemovedAction
} from 'weather-app/reducers/selectedCitiesReducer';
import { ThunkResult } from 'weather-app/types';

import { AllActions, City, createCityWeatherReportAction } from './reducers/selectedCitiesReducer';

export function createCityAddedSideEffect(city: City): ThunkResult<AllActions> {
  return function addCityThunk(
    dispatch: Dispatch,
    getState: () => AppState,
    api: IWeatherAPI
  ) {
    const lowerCasedCityName = city.toLocaleLowerCase()
    dispatch(createCityAddedAction(lowerCasedCityName))
    api
      .getWeatherByCityName(lowerCasedCityName)
      .then(({ main: { temp_max: max, temp_min: min } }) =>
        dispatch(createCityWeatherReportAction({ [lowerCasedCityName]: { min, max } }))
      )
      .catch(error => {
        alert('Failed to get the report')
        dispatch(createCityRemovedAction(city))
      })
  }
}
