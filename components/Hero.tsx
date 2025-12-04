import React, { useEffect, useState } from 'react';
import { ArrowRightIcon, FlameIcon } from './Icons';
import { homeController } from '../backend/home';
import { MinistryStats } from '../types';

const Hero = () => {
  const [stats, setStats] = useState<MinistryStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await homeController.getStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Atmosphère de culte" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/90 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block animate-bounce mb-4">
            <span className="py-1 px-3 rounded-full bg-orange-900/30 border border-orange-500/50 text-orange-400 text-sm font-semibold tracking-wider">
                MINISTÈRE DU SAINT-ESPRIT
            </span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-extrabold text-white mb-6 tracking-tight">
          LE FEU DU <br/>
          <span className="fire-gradient">RÉVEIL</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 mb-10 font-light">
          Bienvenue à Fire Rise. Un mouvement dédié à l'activation de la puissance de Dieu dans votre vie par le feu du Saint-Esprit.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a 
            href="#join"
            className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white transition-all duration-200 bg-fire-600 font-heading rounded-full hover:bg-fire-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-dark-900"
          >
            Rejoindre le Mouvement
            <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
          </a>
          <a 
            href="#events"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-gray-200 transition-all duration-200 bg-dark-800 border border-gray-700 font-heading rounded-full hover:bg-dark-700 hover:text-white hover:border-gray-500"
          >
            Voir les événements
          </a>
        </div>

        {/* Stats Bar */}
        {stats && (
           <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto border-t border-gray-800 pt-8">
             <div className="text-center">
               <div className="text-3xl font-bold text-white flex items-center justify-center gap-1">
                 {stats.members}+
               </div>
               <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Membres Actifs</div>
             </div>
             <div className="text-center border-l border-gray-800">
               <div className="text-3xl font-bold text-white">{stats.activities}</div>
               <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Activités/Semaine</div>
             </div>
             <div className="text-center border-l border-gray-800">
               <div className="text-3xl font-bold text-white">{stats.upcomingEvents}</div>
               <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Événements à venir</div>
             </div>
           </div>
        )}
      </div>
      
      {/* Decorative Fire Particles (Simulated with CSS) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-600/10 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;