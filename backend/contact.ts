import { db } from "./db";
import { ContactMessage } from "../types";

export const contactController = {
  // Enregistrer un message
  sendMessage: async (data: Omit<ContactMessage, "id" | "read" | "receivedAt">): Promise<boolean> => {
    const messages = db.get<ContactMessage[]>(db.keys.MESSAGES, []);
    const newMessage: ContactMessage = {
      ...data,
      id: crypto.randomUUID(),
      read: false,
      receivedAt: new Date().toISOString()
    };
    messages.push(newMessage);
    db.set(db.keys.MESSAGES, messages);
    
    // Notifier l'équipe
    console.log(`[NOTIF] Nouveau message reçu de ${data.name}`);
    return true;
  },

  // Voir les messages (Admin)
  getAllMessages: async (): Promise<ContactMessage[]> => {
    return db.get<ContactMessage[]>(db.keys.MESSAGES, []);
  },

  // Répondre (Simulé)
  replyToMessage: async (id: string, replyContent: string): Promise<void> => {
    console.log(`[EMAIL] Réponse envoyée pour le message ${id}: ${replyContent}`);
  },

  // Supprimer
  deleteMessage: async (id: string): Promise<void> => {
    let messages = db.get<ContactMessage[]>(db.keys.MESSAGES, []);
    messages = messages.filter(m => m.id !== id);
    db.set(db.keys.MESSAGES, messages);
  }
};