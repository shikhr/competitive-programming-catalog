import { Moon, Sun } from 'lucide-react';

// eslint-disable-next-line react/prop-types
const Header = ({ isDarkMode, toggleTheme }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-2xl font-bold">Programming Resources</h1>
      <button
        onClick={toggleTheme}
        className={`flex items-center p-3 rounded-full  ${
          isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-black'
        }`}
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    </header>
  );
};

export default Header;
