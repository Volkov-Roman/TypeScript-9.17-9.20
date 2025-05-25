import { useEffect, useState } from 'react';
import type { DiaryEntry, Weather, Visibility } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [comment, setComment] = useState('');

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
    } catch (error) {
      console.error('Failed to create diary:', error);
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          weather:
          <select value={weather} onChange={(e) => setWeather(e.target.value as Weather)}>
            <option value="sunny">sunny</option>
            <option value="rainy">rainy</option>
            <option value="cloudy">cloudy</option>
            <option value="stormy">stormy</option>
            <option value="windy">windy</option>
          </select>
        </div>
        <div>
          visibility:
          <select value={visibility} onChange={(e) => setVisibility(e.target.value as Visibility)}>
            <option value="great">great</option>
            <option value="good">good</option>
            <option value="ok">ok</option>
            <option value="poor">poor</option>
          </select>
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
