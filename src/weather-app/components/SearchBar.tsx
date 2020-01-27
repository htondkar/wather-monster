import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { Input } from '@material-ui/core';

import { findSimilarString } from './utils';

interface Props {
  onSearch(value: string): void
  suggestions?: string[]
  selectedOptions?: string[]
}

export const SearchBar: React.FunctionComponent<Props> = function(props) {
  const { selectedOptions = [], suggestions = [] } = props
  const [city, setCity] = useState('')
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)

  function handleCitySelect(city: string) {
    props.onSearch(city)
    setCity('')
    setIsSuggestionsOpen(false)
  }

  const similarCities = useMemo(() => findSimilarString(suggestions, city), [
    suggestions,
    city,
  ])

  const showSuggestions = isSuggestionsOpen && !!city

  return (
    <SearchBarWrapper>
      <Input
        value={city}
        onChange={e => setCity(e.target.value)}
        onFocus={() => setIsSuggestionsOpen(true)}
        placeholder="Search in Germany"
      ></Input>

      {showSuggestions && (
        <Suggestions>
          {similarCities.map((city, index) => (
            <CityRow
              key={`${index}-${city}`}
              selected={selectedOptions.includes(city.toLocaleUpperCase())}
              onClick={() => handleCitySelect(city)}
            >
              {city}
            </CityRow>
          ))}
        </Suggestions>
      )}
    </SearchBarWrapper>
  )
}

const SearchBarWrapper = styled.form`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 5fr 1fr;
  justify-items: stretch;
  align-items: stretch;
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
