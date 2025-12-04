import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import NewsSection from './components/NewsSection';
import VerseOfTheDay from './components/VerseOfTheDay';
import Events from './components/Events';
import JoinForm from './components/JoinForm';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import { FlameIcon, XIcon } from './components/Icons';

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // État pour le chargement initial (Splash Screen)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement pour l'intro
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAdminToggle = () => {
    if (isAdminMode) {
      // Déconnexion
      setIsAdminMode(false);
    } else {
      // Afficher la modale de connexion
      setShowAuthModal(true);
      setError('');
      setPassword('');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // VÉRIFICATION DU MOT DE PASSE (Simple pour la démo)
    // Dans une app réelle, cela se ferait côté serveur
    if (password === 'admin123') {
      setIsAdminMode(true);
      setShowAuthModal(false);
    } else {
      setError('Mot de passe incorrect');
    }
  };

  // Écran de chargement (Intro)
  if (loading) {
    return (
      <div className="fixed inset-0 bg-dark-900 flex flex-col items-center justify-center z-50">
        <div className="mb-6 animate-fire-pulse">
          <div className="p-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-[0_0_50px_rgba(249,115,22,0.5)]">
            <FlameIcon className="w-16 h-16 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-heading font-bold text-white tracking-widest animate-pulse">
          FIRE <span className="fire-gradient">RISE</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm uppercase tracking-wide">Ministère du Saint-Esprit</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white selection:bg-orange-500 selection:text-white animate-fade-in">
      
      {isAdminMode ? (
        <AdminDashboard />
      ) : (
        <>
          <Navbar />
          <main>
            <Hero />
            <NewsSection />
            <About />
            <VerseOfTheDay />
            <Events />
            <JoinForm />
          </main>
          <Contact />
        </>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={handleAdminToggle}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-2xl border transition-all duration-300 group ${
          isAdminMode 
            ? "bg-red-600 hover:bg-red-700 border-red-500 text-white" 
            : "bg-dark-800 hover:bg-orange-600 border-gray-700 text-gray-400 hover:text-white"
        }`}
        title={isAdminMode ? "Se déconnecter" : "Accès Admin (Sécurisé)"}
      >
        {isAdminMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        )}
      </button>

      {/* Modal de connexion */}
      {showAuthModal && !isAdminMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-dark-900 border border-gray-700 p-8 rounded-2xl shadow-2xl max-w-sm w-full relative animate-zoom-in">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <XIcon className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-orange-900/30 rounded-full mb-4 border border-orange-500/30">
                <FlameIcon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Espace Leader</h3>
              <p className="text-gray-400 text-sm mt-1">Veuillez vous identifier</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  autoFocus
                  className="w-full bg-dark-800 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-gray-600"
                />
              </div>
              
              {error && (
                <div className="mb-4 text-red-500 text-sm text-center bg-red-900/20 py-2 rounded border border-red-900/50">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-orange-900/20"
              >
                Accéder
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;