import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = await login(identifier, password);
            
            if (user) {
                switch (user.role) {
                    case 'ADMIN':
                    case 'SUPER_ADMIN':
                        navigate('/admin/dashboard');
                        break;
                    case 'VENDEUR':
                        navigate('/seller/dashboard');
                        break;
                    case 'ACHETEUR':
                    default:
                        navigate('/dashboard');
                        break;
                }
            }
        } catch (err) {
            setError(err.message || "Erreur de connexion");
            setLoading(false);
        }
    };

    return (
        <div className="login-container majestic-layout">
            <div className="majestic-card" style={{ maxWidth: '400px', margin: '50px auto' }}>
                <h2>Connexion à Digital Market Space</h2>
                
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-error">{error}</div>}
                    
                    <div className="form-group">
                        <label htmlFor="identifier">Nom d'utilisateur ou Téléphone</label>
                        <input
                            type="text"
                            id="identifier"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                            placeholder="nom_utilisateur ou 770000000"
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
                            placeholder="Votre mot de passe"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Connexion en cours...' : 'Se Connecter'}
                    </button>
                </form>

                <p className="register-link">
                    Pas encore de compte ? <a href="/register">S'inscrire</a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
