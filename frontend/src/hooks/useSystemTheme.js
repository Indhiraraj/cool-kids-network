import { useState, useEffect } from 'react';

const useSystemTheme = () => {
  // Initialize the theme state based on local storage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Function to update theme based on system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setIsDarkMode(mediaQuery.matches);
    };

    // Sync theme with local storage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Apply or remove the `dark` class from document element
    document.documentElement.classList.toggle('dark', isDarkMode);

    // Add event listener for changes in system preference
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup event listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [isDarkMode]);

  // Function to manually toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(prevIsDarkMode => {
      const newTheme = !prevIsDarkMode;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newTheme);
      return newTheme;
    });
  };

  return { isDarkMode, toggleTheme };
};

export default useSystemTheme;