
/**
 * Simulation d'une base de données utilisant LocalStorage.
 * Initialise les données si elles n'existent pas.
 */

import { MinistryEvent, Leader, NewsItem, RecurringActivity } from "../types";

// Note: J'ai changé les clés (v2) pour forcer la mise à jour des données sur votre navigateur
// afin que vous voyiez les nouveaux événements futurs et non les anciens de 2023.
const DB_KEYS = {
  EVENTS: 'fire_rise_events_v2',
  NEWS: 'fire_rise_news_v2',
  LEADERS: 'fire_rise_leaders_v2',
  REQUESTS: 'fire_rise_requests_v2',
  MESSAGES: 'fire_rise_messages_v2',
  ACTIVITIES: 'fire_rise_activities_v2'
};

// Génération de dates dynamiques pour que les événements soient toujours dans le futur
const today = new Date();
const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7);
const twoWeeks = new Date(today); twoWeeks.setDate(today.getDate() + 14);
const nextMonth = new Date(today); nextMonth.setMonth(today.getMonth() + 1);

// Données initiales (Seed)
const INITIAL_EVENTS: MinistryEvent[] = [
  {
    id: 1,
    title: "Nuit de Feu - Veillée de Prière",
    date: nextWeek.toISOString().split('T')[0], // Dans 7 jours
    time: "21:00 - 05:00",
    location: "Salle Principale Fire Rise, Paris",
    description: "Une nuit entière dédiée à l'intercession et à la recherche de la face de Dieu. Venez vous attendre à un miracle.",
    imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2673&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Culte de Dimanche - L'Onction",
    date: twoWeeks.toISOString().split('T')[0], // Dans 14 jours
    time: "10:00",
    location: "Salle Principale Fire Rise, Paris",
    description: "Notre célébration hebdomadaire. Louange, adoration, et parole puissante.",
    imageUrl: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Conférence: Porteurs de Flamme",
    date: nextMonth.toISOString().split('T')[0], // Dans 1 mois
    time: "14:00 - 18:00",
    location: "Centre de Conférences, Lyon",
    description: "Un temps spécial de formation pour les leaders et ceux qui veulent servir dans le ministère.",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop"
  }
];

const INITIAL_ACTIVITIES: RecurringActivity[] = [
    { id: 1, title: "Culte Dominical", day: "Dimanche", time: "10:00" },
    { id: 2, title: "École des Disciples", day: "Dimanche", time: "09:00" },
    { id: 3, title: "Intercession Matinale", day: "Lundi", time: "06:00" },
    { id: 4, title: "Cellule de Maison", day: "Mardi", time: "19:30" },
    { id: 5, title: "Étude Biblique", day: "Mercredi", time: "19:00" },
    { id: 6, title: "Jeûne et Prière", day: "Vendredi", time: "18:00" },
    { id: 7, title: "Réunion Jeunesse", day: "Samedi", time: "16:00" },
    { id: 8, title: "Évangélisation de rue", day: "Samedi", time: "14:00" }
];

const INITIAL_LEADERS: Leader[] = [
  {
    id: 1,
    name: "Apôtre Jean-Marc",
    role: "Visionnaire & Fondateur (Admin)",
    bio: "Serviteur de Dieu passionné par le réveil et la manifestation de la puissance du Saint-Esprit.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Prophétesse Sarah",
    role: "Responsable Intercession",
    bio: "Une voix prophétique pour notre génération, dirigeant les armées de prière.",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Pasteur David",
    role: "Responsable Jeunesse",
    bio: "Dédié à lever une génération de jeunes radicaux pour Jésus.",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop"
  }
];

const INITIAL_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Moments forts de la Louange",
    date: new Date(today.getTime() - 86400000 * 2).toISOString(), // Il y a 2 jours
    category: "Louange",
    summary: "Revivez l'atmosphère glorieuse de notre dernier culte. Le Saint-Esprit a touché de nombreux cœurs pendant l'adoration.",
    mediaUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2670&auto=format&fit=crop",
    mediaType: "video" 
  },
  {
    id: 2,
    title: "Cellule de Maison : Partage Fraternel",
    date: new Date(today.getTime() - 86400000 * 5).toISOString(), // Il y a 5 jours
    category: "Cellule",
    summary: "Photos de notre rencontre de quartier. Un temps précieux d'étude biblique et de communion fraternelle.",
    mediaUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2670&auto=format&fit=crop",
    mediaType: "image"
  },
  {
    id: 3,
    title: "Retour sur la Conférence",
    date: new Date(today.getTime() - 86400000 * 10).toISOString(), // Il y a 10 jours
    category: "Culte",
    summary: "Des vies transformées et des témoignages puissants suite à notre grand rassemblement.",
    mediaUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop",
    mediaType: "image"
  }
];

// Helper générique pour lire/écrire
export const db = {
  get: <T>(key: string, initialData: T): T => {
    const stored = localStorage.getItem(key);
    if (!stored) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(stored);
  },
  set: <T>(key: string, data: T): void => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  keys: DB_KEYS,
  initial: {
    events: INITIAL_EVENTS,
    leaders: INITIAL_LEADERS,
    news: INITIAL_NEWS,
    activities: INITIAL_ACTIVITIES
  }
};
