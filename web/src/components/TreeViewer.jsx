/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Link as LinkIcon,
  Folder,
  FileText,
  Loader2,
} from 'lucide-react';

import jdata from '../catalog/catalog.json';

const TreeNode = ({ data, isDarkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren =
    (data.children && data.children.length > 0) ||
    (data.blog_entries && data.blog_entries.length > 0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`ml-4 ${
        isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-black'
      }`}
    >
      <div
        onClick={toggleExpand}
        className={`flex items-center select-none cursor-pointer gap-2 py-1 hover:bg-gray-100 rounded px-2 ${
          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
        }`}
      >
        {hasChildren ? (
          <button
            className={`p-1 hover:bg-gray-200 rounded ${
              isDarkMode ? 'hover:bg-gray-700' : ''
            }`}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        ) : (
          <span className="w-6" />
        )}
        {data.type === 'folder' ? (
          <Folder
            className={`w-4 h-4 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-500'
            }`}
          />
        ) : (
          <FileText
            className={`w-4 h-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          />
        )}
        <span className="font-medium">{data.title || data.name}</span>
        {data.subtitle && (
          <>
            <span
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {data.subtitle}
            </span>
          </>
        )}
      </div>

      {isExpanded && (
        <div className="ml-2">
          {data.children &&
            data.children.map((child, index) => (
              <TreeNode key={index} data={child} isDarkMode={isDarkMode} />
            ))}

          {data.blog_entries &&
            data.blog_entries.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 py-1 cursor-default hover:bg-gray-100 rounded px-2 ml-6 ${
                  isDarkMode ? 'hover:bg-gray-700' : ''
                }`}
              >
                <LinkIcon
                  className={`w-4 h-4 ${
                    isDarkMode ? 'text-green-400' : 'text-green-500'
                  }`}
                />
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline "
                >
                  {entry.title}
                </a>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const TreeViewer = ({ isDarkMode }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    setData(jdata);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading catalog...</span>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center h-screen text-red-500">
  //       <p>Error loading catalog: {error}</p>
  //     </div>
  //   );
  // }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No catalog data available</p>
      </div>
    );
  }

  return (
    <div
      className={`max-w-4xl mx-auto p-6 ${
        isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-black'
      }`}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">
        Codeforces Catalog
      </h1>

      <div
        className={`border rounded-lg p-4 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
        } shadow`}
      >
        {data.children.map((child, index) => (
          <TreeNode key={index} data={child} isDarkMode={isDarkMode} />
        ))}
      </div>
    </div>
  );
};

export default TreeViewer;