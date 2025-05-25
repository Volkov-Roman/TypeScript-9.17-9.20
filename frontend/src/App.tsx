import { useEffect, useState } from 'react';
import type { DiaryEntry } from './types';
import { getAllDiaries } from './services/diaryService';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map(entry => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
