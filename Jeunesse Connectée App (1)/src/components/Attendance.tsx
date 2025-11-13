import { useState } from 'react';
import { Calendar, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { getAttendances, getMembers } from '../lib/storage';

const WORSHIP_TYPES = [
  'Tous',
  'Mardi – Méditation',
  'Jeudi – Exhortation',
  'Dimanche – Louange et Adoration',
  'Activités',
] as const;

export function Attendance() {
  const attendances = getAttendances();
  const members = getMembers();
  const [filterType, setFilterType] = useState<string>('Tous');
  const [filterMonth, setFilterMonth] = useState<string>('Tous');

  // Get unique months
  const months = Array.from(
    new Set(attendances.map(a => a.date.slice(0, 7)))
  ).sort((a, b) => b.localeCompare(a));

  // Filter attendances
  const filteredAttendances = attendances.filter(a => {
    if (filterType !== 'Tous' && a.type !== filterType) return false;
    if (filterMonth !== 'Tous' && !a.date.startsWith(filterMonth)) return false;
    return true;
  });

  // Calculate stats
  const totalAttendances = filteredAttendances.length;
  const presentCount = filteredAttendances.filter(a => a.present).length;
  const attendanceRate = totalAttendances > 0 
    ? Math.round((presentCount / totalAttendances) * 100) 
    : 0;

  // Group by date and type
  const groupedAttendances = filteredAttendances.reduce((acc, attendance) => {
    const key = `${attendance.date}-${attendance.type}`;
    if (!acc[key]) {
      acc[key] = {
        date: attendance.date,
        type: attendance.type,
        attendances: [],
      };
    }
    acc[key].attendances.push(attendance);
    return acc;
  }, {} as Record<string, { date: string; type: string; attendances: typeof attendances }>);

  const sessions = Object.values(groupedAttendances).sort((a, b) => 
    b.date.localeCompare(a.date)
  );

  // Member stats
  const memberStats = members.map(member => {
    const memberAttendances = filteredAttendances.filter(a => a.memberId === member.id);
    const present = memberAttendances.filter(a => a.present).length;
    const total = memberAttendances.length;
    const rate = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return {
      member,
      present,
      total,
      rate,
    };
  }).sort((a, b) => b.rate - a.rate);

  return (
    <div className="space-y-6 p-4 pb-20">
      <div>
        <h1 className="text-green-500 mb-2">Présences</h1>
        <p className="text-gray-600">Suivi des présences aux cultes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Taux global</p>
              <p className="text-green-500">{attendanceRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-[#87CEEB]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total présences</p>
              <p className="text-[#87CEEB]">{presentCount}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-[#87CEEB]" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Sessions</p>
              <p className="text-purple-500">{sessions.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Type de culte</label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {WORSHIP_TYPES.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Mois</label>
            <Select value={filterMonth} onValueChange={setFilterMonth}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tous">Tous les mois</SelectItem>
                {months.map(month => (
                  <SelectItem key={month} value={month}>
                    {new Date(month + '-01').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Member Statistics */}
      <Card className="p-6">
        <h2 className="mb-4">Statistiques par membre</h2>
        <div className="space-y-3">
          {memberStats.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucune présence enregistrée</p>
          ) : (
            memberStats.map(({ member, present, total, rate }) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-gray-800">{member.firstName} {member.lastName}</p>
                  <p className="text-gray-600">{present} / {total} présences</p>
                </div>
                <Badge 
                  className={
                    rate >= 80 ? 'bg-green-500' : 
                    rate >= 50 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }
                >
                  {rate}%
                </Badge>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Attendance History */}
      <Card className="p-6">
        <h2 className="mb-4">Historique des présences</h2>
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucune session enregistrée</p>
          ) : (
            sessions.map((session, index) => {
              const presentMembers = session.attendances.filter(a => a.present);
              const totalMembers = session.attendances.length;
              const sessionRate = totalMembers > 0 
                ? Math.round((presentMembers.length / totalMembers) * 100) 
                : 0;

              return (
                <div key={`${session.date}-${session.type}-${index}`} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-gray-800">{session.type}</p>
                      <p className="text-gray-600">
                        {new Date(session.date).toLocaleDateString('fr-FR', { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <Badge className={sessionRate >= 80 ? 'bg-green-500' : 'bg-yellow-500'}>
                      {sessionRate}%
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{presentMembers.length} / {totalMembers} présents</span>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {session.attendances.map(attendance => {
                      const member = members.find(m => m.id === attendance.memberId);
                      if (!member || !attendance.present) return null;
                      
                      return (
                        <Badge 
                          key={`${attendance.memberId}-${index}`} 
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {member.firstName} {member.lastName}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
}
