import {useState} from 'react';

export default function useVisualMode (initial) {
  const [history, setHistory] = useState([initial]);
  
  function transition (newMode, shouldReplace) {
    const historyCopy = [...history];
    if (shouldReplace) {
      historyCopy.pop()
    }
    setHistory([...historyCopy, newMode]);
  }

  function back () {
    if (history.length > 1) {
      const historyCopy = [...history];
      historyCopy.pop();
      setHistory(historyCopy);
    }
  }

  return {mode:history[history.length - 1], transition, back};
}