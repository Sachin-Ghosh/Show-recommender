
import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allShowNames, setAllShowNames] = useState([]);

  // Fetch all show names from the API
  const fetchAllShowNames = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/shows');
      const data = await response.json();
      const showNames = data.map((show) => show.name);
      setAllShowNames(showNames);
      setSuggestions(showNames);
    } catch (error) {
      console.error('Error fetching show names', error);
    }
  };

  // Fetch show names on component mount
  useEffect(() => {
    fetchAllShowNames();
  }, []);

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    return allShowNames.filter(
      (show) => show.toLowerCase().includes(inputValueLowerCase)
    );
  };

  // Autosuggest will call this function every time you need to update suggestions.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Handle input change
  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  // Trigger search on suggestion selection
  const onSuggestionSelected = (event, { suggestion }) => {
    router.push(`/show/${suggestion}`);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: 'Search for shows...',
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => <div>{suggestion}</div>}
      inputProps={inputProps}
    />
  );
};

export default SearchBar;
