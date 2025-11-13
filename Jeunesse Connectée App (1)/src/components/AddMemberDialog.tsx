import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Member } from '../types';
import { saveMember } from '../lib/storage';
import { toast } from 'sonner@2.0.3';
import { Switch } from './ui/switch';

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member?: Member;
}

export function AddMemberDialog({ open, onOpenChange, member }: AddMemberDialogProps) {
  const [formData, setFormData] = useState<Partial<Member>>(
    member || {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      churchRole: '',
      externalRole: '',
      neighborhood: '',
      phone: '',
      status: 'Actif',
      isLeader: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newMember: Member = {
      id: member?.id || Date.now().toString(),
      firstName: formData.firstName!,
      lastName: formData.lastName!,
      dateOfBirth: formData.dateOfBirth || '',
      churchRole: formData.churchRole || '',
      externalRole: formData.externalRole || '',
      neighborhood: formData.neighborhood || '',
      phone: formData.phone || '',
      status: formData.status as 'Actif' | 'Inactif' || 'Actif',
      isLeader: formData.isLeader || false,
      createdAt: member?.createdAt || new Date().toISOString(),
    };

    saveMember(newMember);
    toast.success(member ? 'Membre mis à jour' : 'Membre ajouté avec succès');
    onOpenChange(false);
    
    // Reset form
    if (!member) {
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        churchRole: '',
        externalRole: '',
        neighborhood: '',
        phone: '',
        status: 'Actif',
        isLeader: false,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{member ? 'Modifier le membre' : 'Ajouter un membre'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="dateOfBirth">Date de naissance</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="churchRole">Fonction dans l'église</Label>
            <Input
              id="churchRole"
              value={formData.churchRole}
              onChange={(e) => setFormData({ ...formData, churchRole: e.target.value })}
              placeholder="Ex: Membre, Président, Secrétaire..."
            />
          </div>

          <div>
            <Label htmlFor="externalRole">Fonction hors église</Label>
            <Input
              id="externalRole"
              value={formData.externalRole}
              onChange={(e) => setFormData({ ...formData, externalRole: e.target.value })}
              placeholder="Ex: Étudiant, Employé..."
            />
          </div>

          <div>
            <Label htmlFor="neighborhood">Quartier</Label>
            <Input
              id="neighborhood"
              value={formData.neighborhood}
              onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="status">Statut</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as 'Actif' | 'Inactif' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="Inactif">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isLeader">Responsable (cotisation 1000 FCFA)</Label>
            <Switch
              id="isLeader"
              checked={formData.isLeader}
              onCheckedChange={(checked) => setFormData({ ...formData, isLeader: checked })}
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-[#87CEEB] hover:bg-[#6BB8DA]">
              {member ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
