import { useCallback } from 'react';

export const useAddress = () => {

  const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  const token = "214505ef7eae67dbd4d3bf1c02645732f3980688";

  const AddressSuggestions = useCallback(async (queryString, type, locations) => {
    const query = {
      "query": queryString,
      "from_bound": { "value": type },
      "to_bound": { "value": type },
      "locations": locations,
      "restrict_value": true
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
      },
      body: JSON.stringify({query: query})
    }

    const response = await fetch(url, options);
    const json = await response.json();
    console.log('dadata response',json);
    return json;
  }, [])

  return { AddressSuggestions }
}