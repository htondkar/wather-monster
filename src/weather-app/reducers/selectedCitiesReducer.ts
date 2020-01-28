import { City, WeatherReport, WeatherReportsState } from 'appContext';
import { Action } from 'weather-app/types';

// ────────────────────────────────────────────────────────────────────────────────

type WeatherReportUpdatePayload = { [city: string]: WeatherReport }

// ────────────────────────────────────────────────────────────────────────────────

type CityAddedAction = Action<'CITY_ADDED', City>
type CityRemovedAction = Action<'CITY_REMOVED', City>
type CityWeatherReportUpdateAction = Action<
	'CITY_WEATHER_REPORT_UPDATE',
	WeatherReportUpdatePayload
>

export type AllActions = CityAddedAction | CityRemovedAction | CityWeatherReportUpdateAction

// ────────────────────────────────────────────────────────────────────────────────

export function createCityAddedAction(city: City): CityAddedAction {
	return {
		type: 'CITY_ADDED',
		payload: city,
		error: false
	}
}

export function createCityRemovedAction(city: City): CityRemovedAction {
	return {
		type: 'CITY_REMOVED',
		payload: city,
		error: false
	}
}

export function createCityWeatherReportAction(
	report: WeatherReportUpdatePayload
): CityWeatherReportUpdateAction {
	return {
		type: 'CITY_WEATHER_REPORT_UPDATE',
		payload: report,
		error: false
	}
}

// ────────────────────────────────────────────────────────────────────────────────

const defaultState: WeatherReportsState = {}

export function weatherReportsReducer(
	state: WeatherReportsState = defaultState,
	action: AllActions
): WeatherReportsState {
	switch (action.type) {
		case 'CITY_ADDED':
			return { ...state, [action.payload.toLowerCase()]: null }

		case 'CITY_REMOVED':
			return Object.fromEntries(
				Object.entries(state).filter(([key]) => key !== action.payload.toLowerCase())
			)

		case 'CITY_WEATHER_REPORT_UPDATE':
			return { ...state, ...action.payload }

		default:
			return state
	}
}
