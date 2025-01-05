import React, { useState } from 'react';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await fetch(`http://localhost:8000/api/v1/user/search?q=${query}`);
      const data = await response.json();
      setResults(data.users || []);
    } catch (err) {
      console.error('Error fetching search results:', err);
    }
  };

  return (
    <div className="ml-[16%] p-4"> {/* Add margin-left to leave space for sidebar */}
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or email..."
        className="border p-2 rounded-md w-full mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
      <ul className="mt-4">
        {results.map((user) => (
          <li key={user._id} className="py-1">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
