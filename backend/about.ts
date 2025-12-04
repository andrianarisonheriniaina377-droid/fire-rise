import { db } from "./db";
import { Leader } from "../types";

export const aboutController = {
  // Récupérer les infos générales
  getIdentity: async () => {
    return {
      vision: "Voir un réveil spirituel embraser les nations par la puissance du Saint-Esprit.",
      mission: "Équiper, Former et Envoyer des disciples de feu.",
      history: "Fondé en 2015 suite à une visitation divine, Fire Rise a commencé dans un salon et touche aujourd'hui des milliers de vies.",
      adminIdentity: "Apôtre Jean-Marc"
    };
  },

  // Récupérer la liste des responsables
  getLeaders: async (): Promise<Leader[]> => {
    return db.get<Leader[]>(db.keys.LEADERS, db.initial.leaders);
  }
};