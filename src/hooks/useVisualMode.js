import {useState} from 'react';

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);

  function transition (pending) {
    setMode(pending);
  }
  
  return {mode, transition};
}