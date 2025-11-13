import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Contribution } from '../types';
import { saveContribution, getMembers } from '../lib/storage';
import { toast } from 'sonner@2.0.3';

interface AddContributionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedMemberId?: string;
}

export function AddContributionDialog({ open, onOpenChange, preselectedMemberId }: AddContributionDialogProps) {
  const members = getMembers();
  const currentMonth = new Date().toISOString().slice(0, 7);
  
  const [formData, setFormData] = useState({
    memberId: preselectedMemberId || '',
    month: currentMonth,
    status: 'Payé' as 'Payé' | 'Non payé',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.memberId) {
      toast.error('Veuillez sélectionner un membre');
      return;
    }

    const member = members.find(m => m.id === formData.memberId);
    if (!member) {
      toast.error('Membre introuvable');
      return;
    }

    const amount = member.isLeader ? 1000 : 500;

    const contribution: Contribution = {
      id: Date.now().toString(),
      memberId: formData.memberId,
      amount,
      date: new Date().toISOString(),
      status: formData.status,
      month: formData.month,
    };

    saveContribution(contribution);
    toast.success('Cotisation enregistrée avec succès');
    onOpenChange(false);
    
    // Reset form
    setFormData({
      memberId: preselectedMemberId || '',
      month: currentMonth,
      status: 'Payé',
    });
  };

  const selectedMember = members.find(m => m.id === formData.memberId);
  const expectedAmount = selectedMember?.isLeader ? 1000 : 500;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Enregistrer une cotisation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="member">Membre *</Label>
            <Select
              value={formData.memberId}
              onValueChange={(value) => setFormData({ ...formData, memberId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un membre" />
              </SelectTrigger>
              <SelectContent>
                {members.map(member => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.firstName} {member.lastName} {member.isLeader && '(Responsable)'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="month">Mois *</Label>
            <Select
              value={formData.month}
              onValueChange={(value) => setFormData({ ...formData, month: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => {
                  const date = new Date();
                  date.setMonth(i);
                  const monthValue = `${date.getFullYear()}-${String(i + 1).padStart(2, '0')}`;
                  const monthLabel = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
                  return (
                    <SelectItem key={monthValue} value={monthValue}>
                      {monthLabel}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {selectedMember && (
            <div className="p-3 bg-[#FFD700] bg-opacity-20 rounded-lg">
              <p className="text-gray-700">Montant</p>
              <p className="text-[#FFD700]">{expectedAmount} FCFA</p>
            </div>
          )}

          <div>
            <Label htmlFor="status">Statut *</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as 'Payé' | 'Non payé' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Payé">Payé</SelectItem>
                <SelectItem value="Non payé">Non payé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-[#FFD700] hover:bg-[#E5C200] text-gray-800">
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
