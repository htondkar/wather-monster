import { AppState, WeatherReport } from 'App'
import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { createCityAddedSideEffect } from 'weather-app/effects/createCityAddedSideEffect'

import { WeatherAppView } from './components/WeatherAppView'
import { AllActions, createCityRemovedAction } from './reducers/selectedCitiesReducer'
import { DispatchWithThunk } from './types'

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
	/**
	 * Remove reports that are null and sort them by max temp
	 */
	const sortedReports = useMemo(() => {
		return props.reports
			.filter(reportIsNotEmpty)
			.sort(([_, { max: maxA }], [__, { max: maxB }]) => maxB - maxA)
	}, [props.reports])

	return (
		<WeatherAppView
			cities={props.cities}
			addCity={props.addCity}
			removeCity={props.removeCity}
			weatherReports={sortedReports}
			selectedCities={props.selectedCities}
		></WeatherAppView>
	)
}

function reportIsNotEmpty(
	report: [string, WeatherReport | null]
): report is [string, WeatherReport] {
	return report[1] !== null
}

export const ConnectedWeatherApp = connect<StateProps, dispatchProps, OwnProps, AppState>(
	({ weatherReports, cities }) => ({
		reports: Object.entries(weatherReports),
		cities: cities,
		selectedCities: Object.keys(weatherReports).map(s => s.toLowerCase())
	}),
	(dispatch: DispatchWithThunk<AllActions>) => ({
		addCity: (cityName: string) => dispatch(createCityAddedSideEffect(cityName)),
		removeCity: (cityName: string) => dispatch(createCityRemovedAction(cityName))
	})
)(WeatherApp)
