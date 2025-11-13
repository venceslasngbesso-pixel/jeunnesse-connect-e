import { Member, Contribution, Attendance, Activity, ChurchSettings } from '../types';

// Storage keys
const STORAGE_KEYS = {
  MEMBERS: 'jc_members',
  CONTRIBUTIONS: 'jc_contributions',
  ATTENDANCES: 'jc_attendances',
  ACTIVITIES: 'jc_activities',
  SETTINGS: 'jc_settings',
};

// Generic storage functions
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

// Members
export function getMembers(): Member[] {
  return getFromStorage<Member[]>(STORAGE_KEYS.MEMBERS, []);
}

export function saveMember(member: Member): void {
  const members = getMembers();
  const index = members.findIndex(m => m.id === member.id);
  if (index >= 0) {
    members[index] = member;
  } else {
    members.push(member);
  }
  saveToStorage(STORAGE_KEYS.MEMBERS, members);
}

export function deleteMember(id: string): void {
  const members = getMembers().filter(m => m.id !== id);
  saveToStorage(STORAGE_KEYS.MEMBERS, members);
}

// Contributions
export function getContributions(): Contribution[] {
  return getFromStorage<Contribution[]>(STORAGE_KEYS.CONTRIBUTIONS, []);
}

export function saveContribution(contribution: Contribution): void {
  const contributions = getContributions();
  const index = contributions.findIndex(c => c.id === contribution.id);
  if (index >= 0) {
    contributions[index] = contribution;
  } else {
    contributions.push(contribution);
  }
  saveToStorage(STORAGE_KEYS.CONTRIBUTIONS, contributions);
}

// Attendances
export function getAttendances(): Attendance[] {
  return getFromStorage<Attendance[]>(STORAGE_KEYS.ATTENDANCES, []);
}

export function saveAttendance(attendance: Attendance): void {
  const attendances = getAttendances();
  attendances.push(attendance);
  saveToStorage(STORAGE_KEYS.ATTENDANCES, attendances);
}

export function saveBulkAttendances(attendances: Attendance[]): void {
  const existing = getAttendances();
  saveToStorage(STORAGE_KEYS.ATTENDANCES, [...existing, ...attendances]);
}

// Activities
export function getActivities(): Activity[] {
  return getFromStorage<Activity[]>(STORAGE_KEYS.ACTIVITIES, []);
}

export function saveActivity(activity: Activity): void {
  const activities = getActivities();
  const index = activities.findIndex(a => a.id === activity.id);
  if (index >= 0) {
    activities[index] = activity;
  } else {
    activities.push(activity);
  }
  saveToStorage(STORAGE_KEYS.ACTIVITIES, activities);
}

export function deleteActivity(id: string): void {
  const activities = getActivities().filter(a => a.id !== id);
  saveToStorage(STORAGE_KEYS.ACTIVITIES, activities);
}

// Settings
export function getSettings(): ChurchSettings {
  return getFromStorage<ChurchSettings>(STORAGE_KEYS.SETTINGS, {
    name: 'Jeunesse Connectée – Jeune pour Christ ACPE PHILADELPHIE',
    contact: {
      phone: '+243 XXX XXX XXX',
      email: 'jeunesse@acpephiladelphie.org',
      address: 'Kinshasa, RDC',
    },
  });
}

export function saveSettings(settings: ChurchSettings): void {
  saveToStorage(STORAGE_KEYS.SETTINGS, settings);
}

// Initialize with demo data
export function initializeDemoData(): void {
  const members = getMembers();
  if (members.length === 0) {
    const demoMembers: Member[] = [
      {
        id: '1',
        firstName: 'Jean',
        lastName: 'Kabongo',
        dateOfBirth: '2000-05-15',
        churchRole: 'Président',
        externalRole: 'Étudiant',
        neighborhood: 'Lemba',
        phone: '+243 XXX XXX 001',
        status: 'Actif',
        isLeader: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        firstName: 'Marie',
        lastName: 'Nsimba',
        dateOfBirth: '2001-08-22',
        churchRole: 'Secrétaire',
        externalRole: 'Infirmière',
        neighborhood: 'Matete',
        phone: '+243 XXX XXX 002',
        status: 'Actif',
        isLeader: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        firstName: 'Paul',
        lastName: 'Mukendi',
        dateOfBirth: '1999-12-10',
        churchRole: 'Membre',
        externalRole: 'Développeur',
        neighborhood: 'Ngaliema',
        phone: '+243 XXX XXX 003',
        status: 'Actif',
        isLeader: false,
        createdAt: new Date().toISOString(),
      },
    ];
    demoMembers.forEach(saveMember);
  }
}
