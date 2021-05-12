import { useCallback } from 'react';

export const useDateFormat = () => {
  
  const localeDate = useCallback((value) => {
    let d = new Date();
    d.setTime(Date.parse(value));
    return d.toLocaleDateString();
  }, [])

  const localeDateFullMonth = useCallback((value) => {
    let d = new Date();
    d.setTime(Date.parse(value));
    return d.toLocaleDateString('ru-RU',{day:"numeric",month:"long",year:"numeric"});
  }, [])

  return { localeDate, localeDateFullMonth }
}