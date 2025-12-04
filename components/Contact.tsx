import React, { useState } from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, FlameIcon } from './Icons';
import { contactController } from '../backend/contact';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('sending');
    await contactController.sendMessage(formData);
    setStatus('sent');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <footer id="contact" className="bg-dark-900 border-t border-gray-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-full">
                <FlameIcon className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-wider text-white">
                FIRE <span className="fire-gradient">RISE</span>
              </span>
            </a>
            <p className="text-gray-500 mb-6 max-w-sm">
              Un ministère passionné pour voir le Royaume de Dieu s'établir sur terre. Nous sommes une famille unie par le feu du Saint-Esprit.
            </p>
            
            {/* Quick Contact Form */}
            <form onSubmit={handleSubmit} className="mt-8 max-w-sm">
                <h4 className="text-white font-bold mb-4 text-sm uppercase">Envoyez-nous un message</h4>
                <div className="space-y-3">
                   <input 
                     type="text" 
                     placeholder="Votre Nom" 
                     className="w-full bg-dark-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                   />
                   <input 
                     type="email" 
                     placeholder="Votre Email" 
                     className="w-full bg-dark-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                   />
                   <textarea 
                     placeholder="Message" 
                     rows={2}
                     className="w-full bg-dark-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                     value={formData.message}
                     onChange={(e) => setFormData({...formData, message: e.target.value})}
                   ></textarea>
                   <button 
                     type="submit" 
                     disabled={status !== 'idle'}
                     className={`text-sm px-4 py-2 rounded font-bold transition-colors ${status === 'sent' ? 'bg-green-600 text-white' : 'bg-orange-600 text-white hover:bg-orange-700'}`}
                   >
                     {status === 'sending' ? 'Envoi...' : status === 'sent' ? 'Envoyé !' : 'Envoyer'}
                   </button>
                </div>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-4">
              {['Accueil', 'À Propos', 'Événements', 'Rejoindre'].map((item) => (
                <li key={item}>
                  <a href={`#${item === 'Accueil' ? 'hero' : item === 'À Propos' ? 'about' : item === 'Événements' ? 'events' : 'join'}`} className="text-gray-500 hover:text-orange-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Nous Contacter</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <span className="text-gray-500">123 Avenue de la Foi,<br/>75000 Paris, France</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-500">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-500">contact@firerise.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Fire Rise Ministry. Tous droits réservés.
          </p>
          <div className="flex gap-6">
             <a href="#" className="text-gray-600 hover:text-orange-500 text-sm font-semibold">Facebook</a>
             <a href="#" className="text-gray-600 hover:text-orange-500 text-sm font-semibold">Instagram</a>
             <a href="#" className="text-gray-600 hover:text-orange-500 text-sm font-semibold">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;