import { useState } from 'react';
import TreeViewer from './components/TreeViewer';
import Header from './components/Header'; // Import the Header component

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
