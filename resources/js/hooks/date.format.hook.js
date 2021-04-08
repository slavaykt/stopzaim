import { useCallback } from 'react';

export const useDateFormat = () => {
  
  const localeDate = useCallback((value) => {
    let d = new Date();
    d.setTime(Date.parse(value));
    return d.toLocaleDateString();
  }, [])

  return { localeDate }
}