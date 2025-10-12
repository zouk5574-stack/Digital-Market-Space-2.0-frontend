import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Bell, User, Search, Menu, X } from 'lucide-react';

const InnovativeHeader = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`innovative-header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="header-container">
        {/* Logo avec animation */}
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h1>Digital Market Space</h1>
          <div className="logo-glow"></div>
        </motion.div>

        {/* Barre de recherche intelligente */}
        <motion.div 
          className="search-container"
          layout
        >
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher produits, services, missions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.div
                className="search-suggestions"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Suggestions dynamiques */}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation utilisateur */}
        <nav className="user-nav">
          <motion.button 
            className="nav-icon"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell />
            <span className="notification-badge">3</span>
          </motion.button>

          <motion.button 
            className="nav-icon"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart />
          </motion.button>

          <motion.div 
            className="user-menu"
            whileHover={{ scale: 1.05 }}
          >
            <User />
            <span>{user?.username}</span>
            
            {/* Menu déroulant utilisateur */}
            <div className="user-dropdown">
              <button>Mon Profil</button>
              <button>Mes Achats</button>
              <button>Mes Ventes</button>
              <button onClick={logout}>Déconnexion</button>
            </div>
          </motion.div>

          {/* Menu mobile */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
          >
            {/* Contenu du menu mobile */}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default InnovativeHeader;
