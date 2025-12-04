import React, { useEffect, useState } from 'react';
import { eventsController } from '../backend/events';
import { joinController } from '../backend/join';
import { contactController } from '../backend/contact';
import { MinistryEvent, JoinRequest, ContactMessage } from '../types';
import { CalendarIcon, MailIcon, XIcon, FlameIcon } from './Icons';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'requests' | 'messages'>('events');
  
  // Data State
  const [events, setEvents] = useState<MinistryEvent[]>([]);
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  // Form State for new Event
  const [newEvent, setNewEvent] = useState<Partial<MinistryEvent>>({
    title: '', date: '', time: '', location: '', description: ''
  });

  const refreshData = async () => {
    setEvents(await eventsController.getAllEvents());
    setRequests(await joinController.getAllRequests());
    setMessages(await contactController.getAllMessages());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Handlers
  const handleDeleteEvent = async (id: number) => {
    if (confirm('Supprimer cet événement ?')) {
      await eventsController.deleteEvent(id);
      refreshData();
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date) {
      await eventsController.addEvent(newEvent as MinistryEvent);
      setNewEvent({ title: '', date: '', time: '', location: '', description: '' });
      refreshData();
      alert('Événement ajouté !');
    }
  };

  const handleRequestStatus = async (id: string, status: 'approved' | 'rejected') => {
    if (status === 'approved') await joinController.approveRequest(id);
    else await joinController.rejectRequest(id);
    refreshData();
  };

  const handleDeleteMessage = async (id: string) => {
    await contactController.deleteMessage(id);
    refreshData();
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center gap-4">
          <div className="p-3 bg-red-600 rounded-lg">
            <FlameIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-heading">Administration Fire Rise</h1>
            <p className="text-gray-400">Gérez le ministère depuis cet espace.</p>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-800 mb-8">
          {[
            { id: 'events', label: 'Événements', count: events.length },
            { id: 'requests', label: 'Adhésions', count: requests.filter(r => r.status === 'pending').length },
            { id: 'messages', label: 'Messages', count: messages.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 px-4 text-sm font-medium transition-colors relative ${
                activeTab === tab.id ? 'text-orange-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 bg-dark-700 text-white text-xs py-0.5 px-2 rounded-full">
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-dark-800 rounded-xl border border-gray-800 p-6 min-h-[500px]">
          
          {/* EVENTS TAB */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold mb-4">Liste des événements</h3>
                {events.map(evt => (
                  <div key={evt.id} className="flex items-start justify-between bg-dark-900 p-4 rounded-lg border border-gray-700">
                    <div>
                      <h4 className="font-bold text-lg">{evt.title}</h4>
                      <div className="flex gap-4 text-sm text-gray-400 mt-1">
                        <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3"/> {new Date(evt.date).toLocaleDateString()}</span>
                        <span>{evt.time}</span>
                        <span>{evt.location}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteEvent(evt.id)}
                      className="text-red-500 hover:bg-red-900/20 p-2 rounded transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
              <div className="bg-dark-900 p-6 rounded-xl border border-gray-700 h-fit">
                <h3 className="text-xl font-bold mb-4 text-orange-500">Ajouter un événement</h3>
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <input 
                    className="w-full bg-dark-800 border border-gray-600 rounded p-2 text-white" 
                    placeholder="Titre" 
                    value={newEvent.title}
                    onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                    required
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="date"
                      className="w-full bg-dark-800 border border-gray-600 rounded p-2 text-white" 
                      value={newEvent.date}
                      onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                      required
                    />
                    <input 
                      className="w-full bg-dark-800 border border-gray-600 rounded p-2 text-white" 
                      placeholder="Heure (ex: 10:00)" 
                      value={newEvent.time}
                      onChange={e => setNewEvent({...newEvent, time: e.target.value})}
                      required
                    />
                  </div>
                  <input 
                    className="w-full bg-dark-800 border border-gray-600 rounded p-2 text-white" 
                    placeholder="Lieu" 
                    value={newEvent.location}
                    onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                  />
                  <textarea 
                    className="w-full bg-dark-800 border border-gray-600 rounded p-2 text-white" 
                    placeholder="Description" 
                    rows={3}
                    value={newEvent.description}
                    onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                  />
                  <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded transition-colors">
                    Publier
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* REQUESTS TAB */}
          {activeTab === 'requests' && (
            <div>
              <h3 className="text-xl font-bold mb-6">Demandes d'adhésion ({requests.length})</h3>
              <div className="space-y-4">
                {requests.length === 0 && <p className="text-gray-500">Aucune demande.</p>}
                {requests.map(req => (
                  <div key={req.id} className="bg-dark-900 p-6 rounded-lg border border-gray-700 flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-lg">{req.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded uppercase font-bold ${
                          req.status === 'approved' ? 'bg-green-900 text-green-200' :
                          req.status === 'rejected' ? 'bg-red-900 text-red-200' :
                          'bg-yellow-900 text-yellow-200'
                        }`}>
                          {req.status === 'pending' ? 'En attente' : req.status === 'approved' ? 'Validé' : 'Refusé'}
                        </span>
                        <span className="text-gray-500 text-sm">{new Date(req.submittedAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-1"><span className="text-gray-500">Email:</span> {req.email} | <span className="text-gray-500">Tel:</span> {req.phone}</p>
                      <p className="text-gray-400 italic mt-2 p-2 bg-dark-800 rounded">"{req.message}"</p>
                    </div>
                    {req.status === 'pending' && (
                      <div className="flex items-start gap-2">
                        <button 
                          onClick={() => handleRequestStatus(req.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium text-sm transition-colors"
                        >
                          Accepter
                        </button>
                        <button 
                          onClick={() => handleRequestStatus(req.id, 'rejected')}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium text-sm transition-colors"
                        >
                          Refuser
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === 'messages' && (
            <div>
              <h3 className="text-xl font-bold mb-6">Messages reçus ({messages.length})</h3>
              <div className="grid gap-4">
                {messages.length === 0 && <p className="text-gray-500">Aucun message.</p>}
                {messages.map(msg => (
                  <div key={msg.id} className="bg-dark-900 p-4 rounded-lg border border-gray-700 relative group">
                    <button 
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-orange-900/30 p-2 rounded-full">
                        <MailIcon className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{msg.name}</h4>
                        <p className="text-gray-500 text-xs">{msg.email}</p>
                      </div>
                      <span className="ml-auto text-gray-600 text-xs">{new Date(msg.receivedAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-300 mt-3 pl-11">{msg.message}</p>
                    <div className="mt-4 pl-11">
                      <button 
                        onClick={() => alert(`Réponse simulée envoyée à ${msg.email}`)}
                        className="text-orange-500 text-sm font-semibold hover:underline"
                      >
                        Répondre
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;