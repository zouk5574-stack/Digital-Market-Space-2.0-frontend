import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.button
      className="theme-toggle holographic-button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      aria-label={`Passer en mode ${theme === 'light' ? 'sombre' : 'clair'}`}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      <span className="sr-only">
        {theme === 'light' ? 'Mode sombre' : 'Mode clair'}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
