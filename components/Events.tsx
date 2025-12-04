import React, { useEffect, useState } from 'react';
import { CalendarIcon, MapPinIcon, ArrowRightIcon } from './Icons';
import { MinistryEvent } from '../types';
import { eventsController } from '../backend/events';

const Events = () => {
  const [events, setEvents] = useState<MinistryEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await eventsController.getUpcomingEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const handleRegister = async (eventId: number) => {
    // Dans une vraie app, on demanderait l'email via un modal
    const email = prompt("Entrez votre email pour vous inscrire :");
    if (email) {
      await eventsController.registerParticipant(eventId, email);
      alert("Inscription réussie !");
    }
  };

  return (
    <section id="events" className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Nos <span className="text-orange-500">Événements</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Rejoignez-nous pour nos prochaines rencontres. Là où deux ou trois sont assemblés en son nom, Il est là.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="group relative bg-dark-800 rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-900/20 flex flex-col h-full">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-600 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                
                {event.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold mb-3">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString()} • {event.time}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                    <MapPinIcon className="w-4 h-4 text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                  
                  <p className="text-gray-400 mb-8 line-clamp-3 flex-grow">
                    {event.description}
                  </p>
                  
                  <button 
                    onClick={() => handleRegister(event.id)}
                    className="mt-auto inline-flex items-center text-white font-semibold hover:text-orange-500 transition-colors cursor-pointer"
                  >
                    Je participe <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">Aucun événement à venir pour le moment.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;