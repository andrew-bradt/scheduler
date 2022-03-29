import {useState} from 'react';

export default function useVisualMode (initial) {
  const [history, setHistory] = useState([initial]);
  
  const indexFromEnd = history.length - 1;

  function transition (newMode, shouldReplace) {
    if (shouldReplace) {
      setHistory(prev => {
        const prevCopy = [...prev];
        prevCopy.pop();
        const newState = [...prevCopy, newMode];
        return newState;
      });
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  }

  function back () {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, indexFromEnd));
    }
  }

  return {mode:history[history.length - 1], transition, back};
}