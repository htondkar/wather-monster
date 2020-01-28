import React from 'react'
import styled from 'styled-components'
import { Report } from 'weather-app/WeatherApp'

import { Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

interface Props {
	reports: Report[]
	onRemove(city: string): void
}

export const WeatherReportView: React.FunctionComponent<Props> = function(props) {
	return (
		<Wrapper>
			{props.reports.map(([cityName, weather]) => (
				<Card key={cityName}>
					<CardHeader
						action={
							<IconButton aria-label="remove" onClick={() => props.onRemove(cityName)}>
								<CloseIcon />
							</IconButton>
						}
						title={cityName.toUpperCase()}
						subheader={new Date().toLocaleDateString()}
					/>
					<StyledCardContent>
						<Typography variant="body2" component="p">
							Min: {weather?.min || '-'}
						</Typography>
						<Typography variant="body2" component="p">
							Max: {weather?.max || '-'}
						</Typography>
					</StyledCardContent>
				</Card>
			))}
		</Wrapper>
	)
}

const StyledCardContent = styled(CardContent)`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 1fr;
	justify-content: center;
	justify-items: center;
`

const Wrapper = styled.div`
	display: grid;
	grid-gap: 30px;
	grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: 1fr;

	@media (max-width: 1000px) {
		grid-template-columns: 1fr;
	}
`
