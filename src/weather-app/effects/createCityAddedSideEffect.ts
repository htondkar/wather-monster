import { AppState, City } from 'appContext';
import { IWeatherAPI } from 'network/interfaces';
import { Dispatch } from 'redux';
import {
    createCityAddedAction, createCityRemovedAction
} from 'weather-app/reducers/selectedCitiesReducer';
import { ThunkResult } from 'weather-app/types';

import { AllActions, createCityWeatherReportAction } from '../reducers/selectedCitiesReducer';

/**
 * @function createCityAddedSideEffect is a thunk that handles side-effects of
 * adding a city, which is fetching it's weather report and updating state accordingly
 */

export function createCityAddedSideEffect(city: City): ThunkResult<AllActions> {
  return function addCityThunk(
    dispatch: Dispatch,
    getState: () => AppState,
    api: IWeatherAPI
  ) {
    const lowerCasedCityName = city.toLowerCase()
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
