import { useCallback, useEffect, useState } from 'react';

export const useAddress = (queryString, type, locations) => {

  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  const token = "214505ef7eae67dbd4d3bf1c02645732f3980688";

  useEffect(() => {
    if (queryString) {
      getAddressSuggestions(queryString, type, locations)
    }
  }, [queryString, type, locations])

  const getAddressSuggestions = useCallback(async (queryString, type, locations) => {
    setLoading(true);
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
      body: JSON.stringify(query)
    }

    const response = await fetch(url, options);
    const json = await response.json();
    setAddressSuggestions(json.suggestions.map(el => (
      {
        viewName: el.value,
        searchName: el.data[type],
        data: el.data
      }
    )));
    setLoading(false);
  }, [])

  return { addressSuggestions, loading }
}