
export interface Verse {
  reference: string;
  text: string;
  date?: string;
}

export interface MinistryEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
}

export interface RecurringActivity {
  id: number;
  title: string;
  day: string;
  time: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: 'Culte' | 'Cellule' | 'Louange' | 'Jeunesse';
  summary: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
}

export interface Leader {
  id: number;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
}

export interface JoinRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  receivedAt: string;
}

export interface MinistryStats {
  members: number;
  activities: number;
  upcomingEvents: number;
}
