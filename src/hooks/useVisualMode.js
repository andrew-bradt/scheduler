import {useState} from 'react';

export default function useVisualMode (initial) {
  const [history, setHistory] = useState([initial]);
  
  const indexFromEnd = history.length - 1;

  function transition (newMode, shouldReplace) {
    if (shouldReplace) {
      return setHistory(prev => prev.slice(0, indexFromEnd).push(newMode));
    }
    setHistory(prev => [...prev, newMode]);
  }

  function back () {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, indexFromEnd));
    }
  }

  return {mode:history[history.length - 1], transition, back};
}