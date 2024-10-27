import { useState, useEffect } from 'react';
import TreeViewer from './components/TreeViewer';
import Header from './components/Header';

function App() {
  // Initialize dark mode from localStorage, fallback to system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Update localStorage when dark mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);

    // Optionally update document class for global styling
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`w-full min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <TreeViewer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
