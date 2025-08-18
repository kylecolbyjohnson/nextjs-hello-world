import { useState, useEffect } from 'react';

export default function Home() {
  const [number, setNumber] = useState('');
  const [stats, setStats] = useState({
    count: 0,
    min: null,
    max: null,
    mean: null,
  });

  const fetchStats = async () => {
    const res = await fetch('/api/numbers');
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const num = parseFloat(number);
    if (isNaN(num)) return;

    await fetch('/api/numbers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: num }),
    });

    setNumber('');
    fetchStats();
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Number Stats</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter a number"
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            marginLeft: '0.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>

      <h2>Statistics</h2>
      <ul>
        <li><strong>Count:</strong> {stats.count}</li>
        <li><strong>Min:</strong> {stats.min ?? 'N/A'}</li>
        <li><strong>Max:</strong> {stats.max ?? 'N/A'}</li>
        <li><strong>Sum:</strong> {stats.sum ?? 'N/A'}</li>
        <li><strong>Mean:</strong> {stats.mean !== null ? stats.mean.toFixed(2) : 'N/A'}</li>
      </ul>
    </div>
  );
}