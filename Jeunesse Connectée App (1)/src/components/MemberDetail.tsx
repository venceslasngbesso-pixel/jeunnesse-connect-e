import { ArrowLeft, Edit, Phone, MapPin, Briefcase, Church, Calendar, DollarSign, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Member } from '../types';
import { getContributions, getAttendances } from '../lib/storage';

interface MemberDetailProps {
  member: Member;
  onBack: () => void;
  onEdit: (member: Member) => void;
}

export function MemberDetail({ member, onBack, onEdit }: MemberDetailProps) {
  const contributions = getContributions().filter(c => c.memberId === member.id);
  const attendances = getAttendances().filter(a => a.memberId === member.id);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Calculate stats
  const currentYear = new Date().getFullYear().toString();
  const yearContributions = contributions.filter(c => c.month.startsWith(currentYear));
  const paidContributions = yearContributions.filter(c => c.status === 'Payé');
  const totalPaid = paidContributions.reduce((sum, c) => sum + c.amount, 0);
  
  const totalAttendances = attendances.length;
  const presentCount = attendances.filter(a => a.present).length;
  const attendanceRate = totalAttendances > 0 
    ? Math.round((presentCount / totalAttendances) * 100) 
    : 0;

  const expectedAmount = member.isLeader ? 1000 : 500;
  const contributionsUpToDate = paidContributions.length >= new Date().getMonth() + 1;

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#87CEEB] to-[#6BB8DA] text-white p-4">
        <button onClick={onBack} className="mb-4 flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          Retour
        </button>
        
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-4 border-white">
            <AvatarFallback className="bg-white text-[#87CEEB]">
              {getInitials(member.firstName, member.lastName)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-white">{member.firstName} {member.lastName}</h1>
            <p>{member.churchRole || 'Membre'}</p>
            <Badge 
              variant={member.status === 'Actif' ? 'default' : 'secondary'}
              className={member.status === 'Actif' ? 'bg-green-500 mt-2' : 'mt-2'}
            >
              {member.status}
            </Badge>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="bg-white text-[#87CEEB]"
            onClick={() => onEdit(member)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* CV Card */}
      <div className="p-4">
        <Card className="p-4 bg-gradient-to-r from-[#FFD700] to-[#E5C200] text-gray-800">
          <p className="mb-3">CV Personnel</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center mb-1">
                <DollarSign className="h-5 w-5" />
              </div>
              <p>{contributionsUpToDate ? 'À jour' : 'En retard'}</p>
              <p className="text-gray-700">Cotisations</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-1">
                <CheckCircle className="h-5 w-5" />
              </div>
              <p>{attendanceRate}%</p>
              <p className="text-gray-700">Présence</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-1">
                <Calendar className="h-5 w-5" />
              </div>
              <p>{totalAttendances}</p>
              <p className="text-gray-700">Total</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="px-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="contributions">Cotisations</TabsTrigger>
          <TabsTrigger value="attendance">Présences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card className="p-4">
            <div className="space-y-4">
              {member.dateOfBirth && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[#87CEEB]" />
                  <div>
                    <p className="text-gray-600">Date de naissance</p>
                    <p>{new Date(member.dateOfBirth).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              )}
              
              {member.churchRole && (
                <div className="flex items-center gap-3">
                  <Church className="h-5 w-5 text-[#87CEEB]" />
                  <div>
                    <p className="text-gray-600">Fonction dans l'église</p>
                    <p>{member.churchRole}</p>
                  </div>
                </div>
              )}
              
              {member.externalRole && (
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-[#87CEEB]" />
                  <div>
                    <p className="text-gray-600">Fonction hors église</p>
                    <p>{member.externalRole}</p>
                  </div>
                </div>
              )}
              
              {member.neighborhood && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#87CEEB]" />
                  <div>
                    <p className="text-gray-600">Quartier</p>
                    <p>{member.neighborhood}</p>
                  </div>
                </div>
              )}
              
              {member.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#87CEEB]" />
                  <div>
                    <p className="text-gray-600">Téléphone</p>
                    <p>{member.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-[#FFD700]" />
                <div>
                  <p className="text-gray-600">Cotisation mensuelle</p>
                  <p>{expectedAmount} FCFA {member.isLeader && '(Responsable)'}</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="contributions" className="space-y-4 mt-4">
          <Card className="p-4">
            <div className="mb-4">
              <p className="text-gray-600">Total payé ({currentYear})</p>
              <p className="text-[#FFD700]">{totalPaid} FCFA</p>
            </div>
          </Card>

          {contributions.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">Aucune cotisation enregistrée</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {contributions
                .sort((a, b) => b.month.localeCompare(a.month))
                .map(contribution => (
                  <Card key={contribution.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>{new Date(contribution.month + '-01').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                        <p className="text-gray-600">{contribution.amount} FCFA</p>
                      </div>
                      <Badge 
                        className={contribution.status === 'Payé' ? 'bg-green-500' : 'bg-red-500'}
                      >
                        {contribution.status}
                      </Badge>
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4 mt-4">
          <Card className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Taux de présence</p>
                <p className="text-green-500">{attendanceRate}%</p>
              </div>
              <div>
                <p className="text-gray-600">Total présences</p>
                <p className="text-[#87CEEB]">{presentCount} / {totalAttendances}</p>
              </div>
            </div>
          </Card>

          {attendances.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">Aucune présence enregistrée</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {attendances
                .sort((a, b) => b.date.localeCompare(a.date))
                .slice(0, 20)
                .map((attendance, index) => (
                  <Card key={`${attendance.id}-${index}`} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>{new Date(attendance.date).toLocaleDateString('fr-FR')}</p>
                        <p className="text-gray-600">{attendance.type}</p>
                      </div>
                      <Badge 
                        className={attendance.present ? 'bg-green-500' : 'bg-red-500'}
                      >
                        {attendance.present ? 'Présent' : 'Absent'}
                      </Badge>
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
