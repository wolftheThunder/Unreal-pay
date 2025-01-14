import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query) return alert('Please enter a search query');

    setLoading(true);
    try {
      const response = await axios.get(`/api/search?q=${query}`);
      if (response.data.success) {
        setResults(response.data.titles);
      } else {
        alert('No results found.');
        setResults([]);
      }
    } catch (error) {
      alert('Error occurred while searching.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-xl bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8">Google Search Results</h1>

      <input
        type="text"
        placeholder="Enter your search query"
        className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-600"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={search}
        className="w-full p-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all mt-4"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {loading && (
        <div className="text-center mt-4">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full"></div>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {results.length > 0 ? (
          results.map((title, index) => (
            <div key={index} className="p-4 bg-white border rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">{index + 1}. {title}</h3>
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No results to display.</p>
        )}
      </div>
    </div>
  );
}

export default App;
