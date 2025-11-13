import { useState } from 'react';
import { Calendar, Plus, User, Users, Edit, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { getActivities, getMembers, deleteActivity } from '../lib/storage';
import { Activity } from '../types';
import { toast } from 'sonner@2.0.3';

interface ActivitiesProps {
  onAddActivity: () => void;
  onEditActivity: (activity: Activity) => void;
}

export function Activities({ onAddActivity, onEditActivity }: ActivitiesProps) {
  const activities = getActivities();
  const members = getMembers();
  const [activeTab, setActiveTab] = useState('upcoming');

  const today = new Date().toISOString().slice(0, 10);
  
  const upcomingActivities = activities
    .filter(a => a.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
  
  const pastActivities = activities
    .filter(a => a.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
      deleteActivity(id);
      toast.success('Activité supprimée');
    }
  };

  const renderActivity = (activity: Activity) => {
    const participantNames = activity.participants
      .map(id => {
        const member = members.find(m => m.id === id);
        return member ? `${member.firstName} ${member.lastName}` : null;
      })
      .filter(Boolean);

    return (
      <Card key={activity.id} className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-gray-900">{activity.title}</h3>
              <Badge className={activity.status === 'À venir' ? 'bg-green-500' : 'bg-gray-500'}>
                {activity.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(activity.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            {activity.responsible && (
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <User className="h-4 w-4" />
                <span>Responsable: {activity.responsible}</span>
              </div>
            )}

            {activity.description && (
              <p className="text-gray-600 mb-2">{activity.description}</p>
            )}

            {participantNames.length > 0 && (
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-4 w-4" />
                <span>{participantNames.length} participant(s)</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEditActivity(activity)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDelete(activity.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-4 p-4 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-purple-500">Activités</h1>
          <p className="text-gray-600">{activities.length} activité{activities.length > 1 ? 's' : ''}</p>
        </div>
        <Button
          onClick={onAddActivity}
          className="bg-purple-500 hover:bg-purple-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">
            À venir ({upcomingActivities.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Passées ({pastActivities.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-3 mt-4">
          {upcomingActivities.length === 0 ? (
            <Card className="p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucune activité à venir</p>
              <Button
                onClick={onAddActivity}
                className="mt-4 bg-purple-500 hover:bg-purple-600"
              >
                Créer une activité
              </Button>
            </Card>
          ) : (
            upcomingActivities.map(renderActivity)
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-3 mt-4">
          {pastActivities.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">Aucune activité passée</p>
            </Card>
          ) : (
            pastActivities.map(renderActivity)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
