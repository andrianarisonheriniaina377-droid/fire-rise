
import { db } from "./db";
import { MinistryStats, NewsItem, MinistryEvent, RecurringActivity, JoinRequest } from "../types";

export const homeController = {
  // Récupérer toutes les informations de l'accueil
  getHomeData: async () => {
    const stats = await homeController.getStats();
    const latestNews = await homeController.getLatestNews(3);
    const nextEvents = await homeController.getNextEvents(2);
    
    return {
      stats,
      latestNews,
      nextEvents
    };
  },

  // Récupérer les dernières actualités
  getLatestNews: async (limit: number = 3): Promise<NewsItem[]> => {
    const news = db.get<NewsItem[]>(db.keys.NEWS, db.initial.news);
    // Tri par date décroissante
    return news
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  },

  // Récupérer un extrait des événements à venir pour l'accueil
  getNextEvents: async (limit: number = 2): Promise<MinistryEvent[]> => {
     const events = db.get<MinistryEvent[]>(db.keys.EVENTS, db.initial.events);
     const today = new Date();
     // Normaliser la date d'aujourd'hui pour comparer uniquement les jours
     today.setHours(0,0,0,0);
     
     return events
       .filter(e => new Date(e.date) >= today)
       .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
       .slice(0, limit);
  },

  // Compter les statistiques réelles
  getStats: async (): Promise<MinistryStats> => {
    // 1. Calculer les événements futurs
    const events = db.get<MinistryEvent[]>(db.keys.EVENTS, db.initial.events);
    const today = new Date();
    today.setHours(0,0,0,0);
    const upcomingCount = events.filter(e => new Date(e.date) >= today).length;
    
    // 2. Calculer les activités récurrentes (stockées en DB)
    const activities = db.get<RecurringActivity[]>(db.keys.ACTIVITIES, db.initial.activities);
    const activitiesCount = activities.length;

    // 3. Calculer les membres actifs
    // Base fixe (membres historiques) + Demandes d'adhésion APPROUVÉES via le site
    const BASE_MEMBERS = 1250; 
    const requests = db.get<JoinRequest[]>(db.keys.REQUESTS, []);
    const newMembers = requests.filter(r => r.status === 'approved').length;
    const totalMembers = BASE_MEMBERS + newMembers;
    
    return {
      members: totalMembers,
      activities: activitiesCount,
      upcomingEvents: upcomingCount
    };
  }
};
