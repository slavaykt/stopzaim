import { useEffect, useState } from 'react';
/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(key) {
  const [keyDown, setKeyDown] = useState(false);
  useEffect(() => {
    function onKeyup(e) {
      if (e.key === key) setKeyDown(false)
    }
    function onKeydown(e) {
      if (e.key === key) setKeyDown(true)
    }
    window.addEventListener('keyup', onKeyup);
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keyup', onKeyup);
  }, []);
  return keyDown
}