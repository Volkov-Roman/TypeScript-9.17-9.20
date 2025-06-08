import { useEffect, useState } from 'react';
import type { DiaryEntry, Weather, Visibility } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';
import axios from 'axios';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    try {
      const created = await createDiary(newEntry);
      setDiaries(diaries.concat(created));
      setDate('');
      setWeather('sunny');
      setVisibility('great');
      setComment('');
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || 'Unknown Axios error');
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          weather:
          {(['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as Weather[]).map(w => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          visibility:
          {(['great', 'good', 'ok', 'poor'] as Visibility[]).map(v => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

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
