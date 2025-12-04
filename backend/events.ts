import { db } from "./db";
import { MinistryEvent } from "../types";

export const eventsController = {
  // Récupérer tous les événements
  getAllEvents: async (): Promise<MinistryEvent[]> => {
    return db.get<MinistryEvent[]>(db.keys.EVENTS, db.initial.events);
  },

  // Récupérer uniquement les événements à venir
  getUpcomingEvents: async (): Promise<MinistryEvent[]> => {
    const events = await eventsController.getAllEvents();
    const today = new Date();
    return events.filter(e => new Date(e.date) >= today)
                 .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },

  // Détails d'un événement
  getEventById: async (id: number): Promise<MinistryEvent | undefined> => {
    const events = await eventsController.getAllEvents();
    return events.find(e => e.id === id);
  },

  // Ajouter un événement (Admin)
  addEvent: async (event: Omit<MinistryEvent, "id">): Promise<MinistryEvent> => {
    const events = await eventsController.getAllEvents();
    const newEvent = { ...event, id: Date.now() }; // Simple ID gen
    events.push(newEvent);
    db.set(db.keys.EVENTS, events);
    return newEvent;
  },

  // Modifier un événement (Admin)
  updateEvent: async (id: number, updates: Partial<MinistryEvent>): Promise<void> => {
    let events = await eventsController.getAllEvents();
    events = events.map(e => e.id === id ? { ...e, ...updates } : e);
    db.set(db.keys.EVENTS, events);
  },

  // Supprimer un événement (Admin)
  deleteEvent: async (id: number): Promise<void> => {
    let events = await eventsController.getAllEvents();
    events = events.filter(e => e.id !== id);
    db.set(db.keys.EVENTS, events);
  },

  // Inscription d'un participant (Simulé)
  registerParticipant: async (eventId: number, participantEmail: string): Promise<boolean> => {
    // Dans une vraie BDD, on aurait une table de liaison events_participants
    console.log(`Inscription de ${participantEmail} à l'événement ${eventId}`);
    return true;
  }
};