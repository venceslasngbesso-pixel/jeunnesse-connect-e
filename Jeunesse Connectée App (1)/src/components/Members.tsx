import { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { getMembers } from '../lib/storage';
import { Member } from '../types';

interface MembersProps {
  onMemberClick: (member: Member) => void;
  onAddMember: () => void;
}

export function Members({ onMemberClick, onAddMember }: MembersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const members = getMembers();

  const filteredMembers = members.filter(member =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.churchRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-4 p-4 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#87CEEB]">Membres</h1>
          <p className="text-gray-600">{members.length} membre{members.length > 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={onAddMember}
          className="flex items-center gap-2 px-4 py-2 bg-[#87CEEB] text-white rounded-lg hover:bg-[#6BB8DA]"
        >
          <UserPlus className="h-4 w-4" />
          Ajouter
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Rechercher un membre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Members List */}
      <div className="space-y-3">
        {filteredMembers.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">Aucun membre trouvé</p>
          </Card>
        ) : (
          filteredMembers.map(member => (
            <Card
              key={member.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onMemberClick(member)}
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 bg-[#87CEEB]">
                  <AvatarFallback className="bg-[#87CEEB] text-white">
                    {getInitials(member.firstName, member.lastName)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-gray-900">{member.firstName} {member.lastName}</p>
                    {member.isLeader && (
                      <Badge className="bg-[#FFD700] text-gray-800">Responsable</Badge>
                    )}
                  </div>
                  <p className="text-gray-600">{member.churchRole || 'Membre'}</p>
                  {member.neighborhood && (
                    <p className="text-gray-500">{member.neighborhood}</p>
                  )}
                </div>

                <Badge 
                  variant={member.status === 'Actif' ? 'default' : 'secondary'}
                  className={member.status === 'Actif' ? 'bg-green-500' : ''}
                >
                  {member.status}
                </Badge>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
