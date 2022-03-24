import {useState} from 'react';

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);

  function transition (pending) {
    setMode(pending);
  }

  function back () {
  }

  return {mode, transition, back};
}