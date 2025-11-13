import { Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { getMembers, getContributions, getAttendances, getActivities } from '../lib/storage';

interface DashboardProps {
  onAddMember: () => void;
  onAddContribution: () => void;
  onAddAttendance: () => void;
}

export function Dashboard({ onAddMember, onAddContribution, onAddAttendance }: DashboardProps) {
  const members = getMembers();
  const contributions = getContributions();
  const attendances = getAttendances();
  const activities = getActivities();

  // Calculate current month contributions
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthContributions = contributions.filter(
    c => c.month === currentMonth && c.status === 'Payé'
  );
  const monthTotal = monthContributions.reduce((sum, c) => sum + c.amount, 0);

  // Calculate attendance rate
  const totalAttendances = attendances.length;
  const presentCount = attendances.filter(a => a.present).length;
  const attendanceRate = totalAttendances > 0 
    ? Math.round((presentCount / totalAttendances) * 100) 
    : 0;

  // Get upcoming activities
  const today = new Date().toISOString().slice(0, 10);
  const upcomingActivities = activities
    .filter(a => a.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <div className="space-y-6 p-4 pb-20">
      <div>
        <h1 className="text-[#87CEEB] mb-2">Tableau de Bord</h1>
        <p className="text-gray-600">Vue d'ensemble de la jeunesse</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-[#87CEEB]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Membres</p>
              <p className="text-[#87CEEB]">{members.length}</p>
            </div>
            <Users className="h-8 w-8 text-[#87CEEB]" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-[#FFD700]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Cotisations ce mois</p>
              <p className="text-[#FFD700]">{monthTotal} FCFA</p>
            </div>
            <DollarSign className="h-8 w-8 text-[#FFD700]" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Taux de présence</p>
              <p className="text-green-500">{attendanceRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Activités à venir</p>
              <p className="text-purple-500">{upcomingActivities.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="mb-4">Actions Rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button 
            onClick={onAddMember}
            className="bg-[#87CEEB] hover:bg-[#6BB8DA] text-white"
          >
            <Users className="mr-2 h-4 w-4" />
            Ajouter un membre
          </Button>
          <Button 
            onClick={onAddContribution}
            className="bg-[#FFD700] hover:bg-[#E5C200] text-gray-800"
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Enregistrer cotisation
          </Button>
          <Button 
            onClick={onAddAttendance}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Enregistrer présence
          </Button>
        </div>
      </Card>

      {/* Upcoming Activities */}
      <Card className="p-6">
        <h2 className="mb-4">Activités Prochaines</h2>
        {upcomingActivities.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Aucune activité à venir</p>
        ) : (
          <div className="space-y-3">
            {upcomingActivities.map(activity => (
              <div 
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-gray-800">{activity.title}</p>
                  <p className="text-gray-500">{new Date(activity.date).toLocaleDateString('fr-FR')}</p>
                </div>
                <Calendar className="h-5 w-5 text-[#87CEEB]" />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
