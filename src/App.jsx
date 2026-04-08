import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempFilter, setTempFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Business Trial Key and Config
  const API_KEY = "528c7c4579444744a29c60cba360b9dc";
  const CITY = "New York,NY"; 

  // REQ: Fetch API data with useEffect and async/await
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Using forecast/daily provides 16 items for the list view
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=${CITY}&key=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`API error ${response.status}: Check if key is verified.`);
        }

        const json = await response.json();
        
        // REQ: Display at least 10 unique items
        if (json && json.data) {
          setWeatherData(json.data);
          setFilteredData(json.data);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  // REQ: Search and filter logic
  useEffect(() => {
    let results = weatherData;

    // Search Bar logic (Attribute 1: Description)
    if (searchQuery) {
      results = results.filter((day) =>
        day.weather?.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Additional Filter logic (Attribute 2: Temperature)
    if (tempFilter !== "All") {
      results = tempFilter === "Warm" 
        ? results.filter(day => day.temp > 15) 
        : results.filter(day => day.temp <= 15);
    }

    setFilteredData(results);
  }, [searchQuery, tempFilter, weatherData]);

  // REQ: At least three summary statistics
  const total = filteredData.length;
  const avgTemp = total > 0 
    ? (filteredData.reduce((acc, d) => acc + d.temp, 0) / total).toFixed(1) 
    : 0;
  const maxRain = total > 0 
    ? Math.max(...filteredData.map(d => d.precip || 0)).toFixed(1) 
    : 0;

  if (loading) return <div className="loading">Initializing Dashboard...</div>;
  if (error) return (
    <div className="error-screen">
      <h1>API Error: {error}</h1>
      <p>Ensure your WeatherBit Business Trial key is active and email verified.</p>
    </div>
  );

  return (
    <div className="dashboard">
      <header className="dash-header">
        <h1>📊 Weather Analytics: {CITY}</h1>
        <div className="stats-row">
          <div className="stat-card"><h3>{total}</h3><p>Forecast Days</p></div>
          <div className="stat-card"><h3>{avgTemp}°C</h3><p>Average Temp</p></div>
          <div className="stat-card"><h3>{maxRain}mm</h3><p>Max Rain</p></div>
        </div>
      </header>

      <div className="dash-controls">
        {/* REQ: Search bar */}
        <input 
          type="text" 
          placeholder="Search conditions (e.g. Clear)..." 
          className="search-bar"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        {/* REQ: Category Filter */}
        <select className="filter-select" onChange={(e) => setTempFilter(e.target.value)}>
          <option value="All">All Temperatures</option>
          <option value="Warm">Warm (&gt;15°C)</option>
          <option value="Cool">Cool (≤15°C)</option>
        </select>
      </div>

      <div className="data-list">
        {/* REQ: Use .map() to dynamically render rows */}
        {filteredData.map((day, index) => (
          <div key={index} className="data-row">
            <div className="info">
              <span className="date">{day.valid_date}</span>
              <span className="desc">{day.weather?.description}</span>
            </div>
            {/* REQ: At least two features per row (Temp & Wind) */}
            <div className="metrics">
              <span className="main-temp">{day.temp}°C</span>
              <span className="wind-spd">Wind: {day.wind_spd} m/s</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;