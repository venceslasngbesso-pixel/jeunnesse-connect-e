export interface Member {
  id: string;
  photo?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  churchRole: string;
  externalRole: string;
  neighborhood: string;
  phone: string;
  status: 'Actif' | 'Inactif';
  isLeader: boolean; // Pour différencier responsables (1000) des membres (500)
  createdAt: string;
}

export interface Contribution {
  id: string;
  memberId: string;
  amount: number;
  date: string;
  status: 'Payé' | 'Non payé';
  month: string; // Format: YYYY-MM
}

export interface Attendance {
  id: string;
  memberId: string;
  date: string;
  type: 'Mardi – Méditation' | 'Jeudi – Exhortation' | 'Dimanche – Louange et Adoration' | 'Activités';
  present: boolean;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  description: string;
  responsible: string;
  participants: string[]; // member IDs
  status: 'À venir' | 'Passée';
}

export interface ChurchSettings {
  name: string;
  logo?: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}
