import { useState } from 'react';
import { DollarSign, TrendingUp, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { getContributions, getMembers } from '../lib/storage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function Treasury() {
  const contributions = getContributions();
  const members = getMembers();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  // Get all unique years
  const years = Array.from(
    new Set(contributions.map(c => c.month.split('-')[0]))
  ).sort((a, b) => b.localeCompare(a));

  if (years.length === 0) {
    years.push(new Date().getFullYear().toString());
  }

  // Filter by year
  const yearContributions = contributions.filter(c => c.month.startsWith(selectedYear));
  
  // Calculate totals
  const totalPaid = yearContributions
    .filter(c => c.status === 'Payé')
    .reduce((sum, c) => sum + c.amount, 0);

  const totalExpected = members.reduce((sum, m) => {
    const amount = m.isLeader ? 1000 : 500;
    return sum + (amount * 12);
  }, 0);

  // Group by member
  const memberContributions = members.map(member => {
    const memberContribs = yearContributions.filter(c => c.memberId === member.id);
    const paid = memberContribs
      .filter(c => c.status === 'Payé')
      .reduce((sum, c) => sum + c.amount, 0);
    const expected = (member.isLeader ? 1000 : 500) * 12;
    
    return {
      member,
      paid,
      expected,
      percentage: expected > 0 ? Math.round((paid / expected) * 100) : 0,
    };
  }).sort((a, b) => b.paid - a.paid);

  // Chart data by month
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, '0');
    const monthKey = `${selectedYear}-${month}`;
    const monthContribs = contributions.filter(
      c => c.month === monthKey && c.status === 'Payé'
    );
    const total = monthContribs.reduce((sum, c) => sum + c.amount, 0);
    
    return {
      month: new Date(2000, i).toLocaleDateString('fr-FR', { month: 'short' }),
      montant: total,
    };
  });

  return (
    <div className="space-y-6 p-4 pb-20">
      <div>
        <h1 className="text-[#FFD700] mb-2">Trésorerie</h1>
        <p className="text-gray-600">Gestion des cotisations</p>
      </div>

      {/* Year selector */}
      <div className="flex items-center gap-3">
        <label className="text-gray-700">Année :</label>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-l-[#FFD700]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Collecté</p>
              <p className="text-[#FFD700]">{totalPaid} FCFA</p>
            </div>
            <DollarSign className="h-8 w-8 text-[#FFD700]" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-[#87CEEB]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Attendu</p>
              <p className="text-[#87CEEB]">{totalExpected} FCFA</p>
            </div>
            <TrendingUp className="h-8 w-8 text-[#87CEEB]" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Taux</p>
              <p className="text-green-500">
                {totalExpected > 0 ? Math.round((totalPaid / totalExpected) * 100) : 0}%
              </p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-6">
        <h2 className="mb-4">Cotisations par mois</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="montant" fill="#FFD700" name="Montant (FCFA)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Member Contributions */}
      <Card className="p-6">
        <h2 className="mb-4">Cotisations par membre</h2>
        <div className="space-y-3">
          {memberContributions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucune cotisation enregistrée</p>
          ) : (
            memberContributions.map(({ member, paid, expected, percentage }) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-gray-800">
                    {member.firstName} {member.lastName}
                    {member.isLeader && (
                      <Badge className="ml-2 bg-[#FFD700] text-gray-800">Responsable</Badge>
                    )}
                  </p>
                  <p className="text-gray-600">
                    {paid} FCFA / {expected} FCFA
                  </p>
                </div>
                <div className="text-right">
                  <Badge 
                    className={
                      percentage >= 80 ? 'bg-green-500' : 
                      percentage >= 50 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }
                  >
                    {percentage}%
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Recent contributions */}
      <Card className="p-6">
        <h2 className="mb-4">Dernières cotisations</h2>
        <div className="space-y-2">
          {yearContributions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucune cotisation cette année</p>
          ) : (
            yearContributions
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 10)
              .map(contribution => {
                const member = members.find(m => m.id === contribution.memberId);
                if (!member) return null;
                
                return (
                  <div key={contribution.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-gray-800">{member.firstName} {member.lastName}</p>
                      <p className="text-gray-600">
                        {new Date(contribution.month + '-01').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#FFD700]">{contribution.amount} FCFA</p>
                      <Badge className={contribution.status === 'Payé' ? 'bg-green-500' : 'bg-red-500'}>
                        {contribution.status}
                      </Badge>
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
