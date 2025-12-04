import { db } from "./db";
import { JoinRequest } from "../types";

export const joinController = {
  // Enregistrer une demande
  submitRequest: async (data: Omit<JoinRequest, "id" | "status" | "submittedAt">): Promise<boolean> => {
    const requests = db.get<JoinRequest[]>(db.keys.REQUESTS, []);
    const newRequest: JoinRequest = {
      ...data,
      id: crypto.randomUUID(),
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    requests.push(newRequest);
    db.set(db.keys.REQUESTS, requests);
    
    // Simulation envoi email
    joinController.sendEmailNotification(newRequest);
    return true;
  },

  // Récupérer toutes les demandes (Admin)
  getAllRequests: async (): Promise<JoinRequest[]> => {
    return db.get<JoinRequest[]>(db.keys.REQUESTS, []);
  },

  // Accepter une demande (Admin)
  approveRequest: async (id: string): Promise<void> => {
    joinController.updateStatus(id, 'approved');
  },

  // Refuser une demande (Admin)
  rejectRequest: async (id: string): Promise<void> => {
    joinController.updateStatus(id, 'rejected');
  },

  updateStatus: (id: string, status: 'approved' | 'rejected') => {
    let requests = db.get<JoinRequest[]>(db.keys.REQUESTS, []);
    requests = requests.map(r => r.id === id ? { ...r, status } : r);
    db.set(db.keys.REQUESTS, requests);
  },

  // Simulation envoi email
  sendEmailNotification: (request: JoinRequest) => {
    console.log(`[EMAIL SERVER] Email de bienvenue envoyé à ${request.email}`);
    console.log(`[EMAIL SERVER] Notification Admin: Nouvelle demande de ${request.name}`);
  }
};