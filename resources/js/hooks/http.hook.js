import { useState, useCallback } from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const request = useCallback(async (url, method, requestData, returnJson) => {
    setLoading(true);
    const body = new FormData();
    Object.keys(requestData).map(key => {
      body.append(key, requestData[key]);
    });
    try {
      let response;
      if (method === 'GET') {
        response = await fetch(url);
      } else {
        response = await fetch(url, { method, body });
      }
      const data = returnJson ? await response.json() : await response.text();
      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так')
      }
      setLoading(false);
      return data
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e
    }
  }, [])
  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}