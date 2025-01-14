import React, { useState, useEffect } from 'react';
import { Settings, Moon, Sun, Search } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab | null>(null);

  useEffect(() => {
    // Get current tab information
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        setActiveTab(tabs[0]);
      }
    });
  }, []);

  return (
    <div className={`w-[350px] min-h-[400px] p-4 ${darkMode ? 'dark bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Chrome Extension
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
            } hover:opacity-80 transition-opacity`}
          >
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            className={`p-2 rounded-full ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
            } hover:opacity-80 transition-opacity`}
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <div className="flex items-center gap-2">
          <Search size={18} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
          <input
            type="text"
            placeholder="Search..."
            className={`w-full bg-transparent border-none outline-none ${
              darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
            }`}
          />
        </div>
      </div>

      <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <h2 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Current Tab
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {activeTab?.title || 'Loading...'}
        </p>
        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {activeTab?.url || 'Loading...'}
        </p>
      </div>

      <div className="mt-4">
        <button
          className={`w-full py-2 px-4 rounded-lg ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } transition-colors`}
        >
          Take Action
        </button>
      </div>
    </div>
  );
}

export default App;