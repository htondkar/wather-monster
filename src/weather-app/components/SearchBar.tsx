import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ClickOutside } from 'weather-app/components/ClickOutside';

import { Input } from '@material-ui/core';

import { findSimilarString } from './utils';

interface Props {
	onSearch(value: string): void
	suggestions?: string[]
	selectedOptions?: string[]
}

export const SearchBar: React.FunctionComponent<Props> = function(props) {
	const { selectedOptions = [], suggestions = [], onSearch } = props
	const [city, setCity] = useState('')
	const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)

	const handleCitySelect = useCallback(
		function handleCitySelect(city: string) {
			onSearch(city)
			setCity('')
			setIsSuggestionsOpen(false)
		},
		[onSearch]
	)

	const similarCities = useMemo(() => findSimilarString(suggestions, city), [suggestions, city])

	return (
		<ClickOutside onClick={() => setIsSuggestionsOpen(false)}>
			<SearchBarWrapper>
				<Input
					value={city}
					onChange={e => setCity(e.target.value)}
					onFocus={() => setIsSuggestionsOpen(true)}
					placeholder="Search in Germany"
					fullWidth={true}
				></Input>

				{isSuggestionsOpen && (
					<Suggestions data-testid="suggestions">
						{similarCities.map((city, index) => (
							<CityRow
								key={`${index}-${city}`}
								selected={selectedOptions.includes(city.toLowerCase())}
								onClick={() => handleCitySelect(city)}
							>
								{city}
							</CityRow>
						))}
					</Suggestions>
				)}
			</SearchBarWrapper>
		</ClickOutside>
	)
}

const SearchBarWrapper = styled.form`
	position: relative;
	overflow: visible;
`
const Suggestions = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 100%;
	max-height: 300px;
	overflow: auto;
	box-shadow: 0 0 3px 0 grey;
	background: white;
	z-index: 1;
`
const CityRow = styled.div<{ selected: boolean }>`
	padding: 10px;
	background: ${({ selected }) => (selected ? 'grey' : 'transparent')};
	cursor: pointer;
	:hover {
		background: lightgrey;
	}
`
