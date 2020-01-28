import React from 'react'
import styled from 'styled-components'
import { Report } from 'weather-app/WeatherApp'

import { Typography } from '@material-ui/core'

import { SearchBar } from './SearchBar'
import { WeatherReportView } from './WeatherReportView'

interface Props {
	addCity(city: string): void
	removeCity(city: string): void
	weatherReports: Report[]
	cities: string[]
	selectedCities: string[]
}

export const WeatherAppView: React.FunctionComponent<Props> = function(props) {
	return (
		<Wrapper>
			<Typography variant="h2">Weather Monster</Typography>
			<SearchBar
				onSearch={props.addCity}
				suggestions={props.cities}
				selectedOptions={props.selectedCities}
			></SearchBar>
			<WeatherReportView
				reports={props.weatherReports}
				onRemove={props.removeCity}
			></WeatherReportView>
		</Wrapper>
	)
}

const Wrapper = styled.section`
	height: 100vh;
	padding: 50px;
	overflow: auto;
	position: relative;
	display: grid;
	grid-gap: 20px;
	grid-template-columns: 1fr;
	grid-template-rows: auto auto 1fr;
	justify-content: center;
	justify-items: center;
	align-items: start;
	min-width: 350px;
`
