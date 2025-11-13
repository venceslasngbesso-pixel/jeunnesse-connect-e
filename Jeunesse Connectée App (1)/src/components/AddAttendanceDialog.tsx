import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Attendance } from '../types';
import { saveBulkAttendances, getMembers } from '../lib/storage';
import { toast } from 'sonner@2.0.3';

interface AddAttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WORSHIP_TYPES = [
  'Mardi – Méditation',
  'Jeudi – Exhortation',
  'Dimanche – Louange et Adoration',
  'Activités',
] as const;

export function AddAttendanceDialog({ open, onOpenChange }: AddAttendanceDialogProps) {
  const members = getMembers();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    type: 'Dimanche – Louange et Adoration' as typeof WORSHIP_TYPES[number],
  });
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedMembers.size === 0) {
      toast.error('Veuillez sélectionner au moins un membre présent');
      return;
    }

    const attendances: Attendance[] = members.map(member => ({
      id: `${Date.now()}-${member.id}`,
      memberId: member.id,
      date: formData.date,
      type: formData.type,
      present: selectedMembers.has(member.id),
    }));

    saveBulkAttendances(attendances);
    toast.success(`Présences enregistrées pour ${selectedMembers.size} membre(s)`);
    onOpenChange(false);
    
    // Reset form
    setSelectedMembers(new Set());
    setFormData({
      date: new Date().toISOString().slice(0, 10),
      type: 'Dimanche – Louange et Adoration',
    });
  };

  const toggleMember = (memberId: string) => {
    const newSelected = new Set(selectedMembers);
    if (newSelected.has(memberId)) {
      newSelected.delete(memberId);
    } else {
      newSelected.add(memberId);
    }
    setSelectedMembers(newSelected);
  };

  const selectAll = () => {
    setSelectedMembers(new Set(members.map(m => m.id)));
  };

  const deselectAll = () => {
    setSelectedMembers(new Set());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enregistrer les présences</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Type de culte *</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as typeof WORSHIP_TYPES[number] })}
            >
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
            <div className="flex items-center justify-between mb-3">
              <Label>Membres présents</Label>
              <div className="flex gap-2">
                <Button type="button" size="sm" variant="outline" onClick={selectAll}>
                  Tous
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={deselectAll}>
                  Aucun
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto border rounded-lg p-3">
              {members.map(member => (
                <div key={member.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`member-${member.id}`}
                    checked={selectedMembers.has(member.id)}
                    onCheckedChange={() => toggleMember(member.id)}
                  />
                  <label
                    htmlFor={`member-${member.id}`}
                    className="flex-1 cursor-pointer"
                  >
                    {member.firstName} {member.lastName}
                  </label>
                </div>
              ))}
            </div>
            
            <p className="text-gray-600 mt-2">
              {selectedMembers.size} membre(s) sélectionné(s)
            </p>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600">
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
