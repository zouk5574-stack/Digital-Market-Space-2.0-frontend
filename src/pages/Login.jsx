// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Récupération des fonctions de contexte (login, loading)
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Appel de la fonction de connexion du contexte
            const user = await login(email, password);
            
            // Redirection après connexion réussie
            if (user) {
                // Redirection basée sur le rôle :
                // L'utilisateur est redirigé vers son tableau de bord spécifique
                switch (user.role) {
                    case 'ADMIN':
                        navigate('/admin/dashboard');
                        break;
                    case 'VENDEUR':
                        navigate('/seller/dashboard');
                        break;
                    case 'ACHETEUR':
                    default:
                        navigate('/dashboard'); // Dashboard général ou page d'accueil
                        break;
                }
            }

        } catch (err) {
            console.error('Login error:', err);
            // Affiche le message d'erreur du service
            setError(err.message || "Erreur de connexion. Veuillez vérifier vos identifiants.");
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Connexion à la Marketplace</h2>
            
            <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="votre.email@exemple.com"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Entrez votre mot de passe"
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Connexion en cours...' : 'Se Connecter'}
                </button>
            </form>

            <p className="register-link">
                Pas encore de compte ? <a href="/register">S'inscrire</a>
            </p>
        </div>
    );
}

export default LoginPage;
