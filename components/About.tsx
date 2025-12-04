import React, { useEffect, useState } from 'react';
import { FlameIcon } from './Icons';
import { aboutController } from '../backend/about';
import { Leader } from '../types';

const About = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [identity, setIdentity] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const leadersData = await aboutController.getLeaders();
      const identityData = await aboutController.getIdentity();
      setLeaders(leadersData);
      setIdentity(identityData);
    };
    fetchData();
  }, []);

  return (
    <section id="about" className="py-24 bg-dark-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Identité */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center mb-24">
          <div className="mb-12 lg:mb-0 relative">
            <div className="absolute -inset-4 bg-fire-bg-gradient rounded-xl opacity-20 blur-2xl"></div>
            <div className="relative rounded-2xl overflow-hidden border border-gray-800">
               <img 
                 src="https://picsum.photos/800/600?random=1" 
                 alt="Culte Fire Rise" 
                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
               />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Qui sommes-nous ?
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              <strong className="text-orange-500">Fire Rise</strong> n'est pas simplement une église, c'est un ministère prophétique et apostolique né dans le feu de la prière.
            </p>
            {identity && (
              <>
                <div className="mb-6 p-4 bg-dark-800 rounded-lg border-l-4 border-orange-500">
                  <h3 className="text-white font-bold mb-2">Notre Vision</h3>
                  <p className="text-gray-400 text-sm italic">"{identity.vision}"</p>
                </div>
                 <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  <span className="text-gray-300 font-semibold">Notre Histoire :</span> {identity.history}
                </p>
              </>
            )}

            <ul className="space-y-4">
              {[
                "Adoration prophétique intense",
                "Enseignement biblique sans compromis",
                "Ministère de guérison et délivrance",
                "Communauté fraternelle et unie"
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <span className="p-1 rounded-full bg-orange-900/50 mr-3">
                    <FlameIcon className="w-4 h-4 text-orange-500" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Leaders */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-heading font-bold text-white mb-2">Nos Dirigeants</h3>
            <p className="text-gray-500">Ceux qui portent la vision</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader) => (
              <div key={leader.id} className="bg-dark-800 p-6 rounded-xl border border-gray-800 text-center hover:border-orange-500/30 transition-colors">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-orange-500 p-1">
                  <img src={leader.photoUrl} alt={leader.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <h4 className="text-xl font-bold text-white mb-1">{leader.name}</h4>
                <p className="text-orange-500 text-sm font-medium mb-3">{leader.role}</p>
                <p className="text-gray-400 text-sm">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;