import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { fetchWeatherData } from './services/weatherService';
import { Loader2 } from 'lucide-react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update body class based on weather type
  useEffect(() => {
    // Clean up previous classes
    document.body.className = '';
    
    if (weatherData && weatherData.type) {
      document.body.classList.add(`weather-${weatherData.type}`);
    } else {
      document.body.classList.add('weather-clear'); // Default background
    }
  }, [weatherData]);

  // Initial load
  useEffect(() => {
    handleSearch('Landon');
  }, []);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="glass-panel">
        <SearchBar onSearch={handleSearch} />
        
        {loading && (
          <div className="loading-spinner">
            <Loader2 className="spin-icon" size={48} />
            <p>Fetching weather...</p>
          </div>
        )}
        
        {error && (
          <div className="error-message" style={{ marginTop: '2rem' }}>
            {error}
          </div>
        )}
        
        {!loading && !error && weatherData && (
          <div style={{ marginTop: '2rem' }}>
            <WeatherCard weather={weatherData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
