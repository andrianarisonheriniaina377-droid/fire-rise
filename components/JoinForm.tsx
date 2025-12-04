import React, { useState } from 'react';
import { FlameIcon } from './Icons';
import { joinController } from '../backend/join';

const JoinForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await joinController.submitRequest(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Erreur soumission", error);
      setStatus('idle');
      alert("Une erreur est survenue.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="join" className="py-24 relative overflow-hidden bg-dark-800">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 mb-12 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Rejoins l'Armée de <br/> <span className="fire-gradient">Fire Rise</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Tu sens l'appel ? Tu veux servir Dieu avec zèle ? Remplis ce formulaire pour devenir membre, bénévole ou simplement pour en savoir plus sur notre vision.
            </p>
            <div className="flex items-center gap-4 p-4 bg-dark-900 rounded-lg border border-gray-800">
              <div className="bg-orange-900/30 p-3 rounded-full">
                <FlameIcon className="w-8 h-8 text-orange-500" />
              </div>
              <div>
                <p className="text-white font-bold">Formation de Disciples</p>
                <p className="text-sm text-gray-500">Nous formons des leaders pour le réveil.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-dark-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-dark-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-dark-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="jean@exemple.com"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Pourquoi veux-tu nous rejoindre ? / Sujet de prière</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="Partage ton cœur avec nous..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className={`w-full py-4 rounded-lg font-bold text-lg uppercase tracking-wide transition-all duration-300 ${
                  status === 'success' 
                    ? 'bg-green-600 text-white cursor-default' 
                    : 'bg-fire-bg-gradient text-white hover:opacity-90 hover:shadow-lg hover:shadow-orange-600/30'
                }`}
              >
                {status === 'submitting' ? 'Envoi en cours...' : status === 'success' ? 'Demande Envoyée !' : 'Envoyer ma demande'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JoinForm;