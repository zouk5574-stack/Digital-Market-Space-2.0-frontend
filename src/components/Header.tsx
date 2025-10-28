import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">Digital Market</span>
          </Link>

          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <span className="text-sm text-gray-700">
                  Bonjour, {user.firstName}
                </span>
                <Button variant="outline" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Connexion</Button>
                </Link>
                <Link to="/register">
                  <Button>Inscription</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
