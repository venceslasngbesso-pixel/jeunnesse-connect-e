import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Activity } from '../types';
import { saveActivity } from '../lib/storage';
import { toast } from 'sonner@2.0.3';

interface AddActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity?: Activity;
}

export function AddActivityDialog({ open, onOpenChange, activity }: AddActivityDialogProps) {
  const [formData, setFormData] = useState<Partial<Activity>>(
    activity || {
      title: '',
      date: new Date().toISOString().slice(0, 10),
      description: '',
      responsible: '',
      participants: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const status = formData.date! >= today ? 'À venir' : 'Passée';

    const newActivity: Activity = {
      id: activity?.id || Date.now().toString(),
      title: formData.title!,
      date: formData.date!,
      description: formData.description || '',
      responsible: formData.responsible || '',
      participants: formData.participants || [],
      status,
    };

    saveActivity(newActivity);
    toast.success(activity ? 'Activité mise à jour' : 'Activité ajoutée avec succès');
    onOpenChange(false);
    
    // Reset form
    if (!activity) {
      setFormData({
        title: '',
        date: new Date().toISOString().slice(0, 10),
        description: '',
        responsible: '',
        participants: [],
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{activity ? 'Modifier l\'activité' : 'Ajouter une activité'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Ex: Sortie évangélisation"
            />
          </div>

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
            <Label htmlFor="responsible">Responsable</Label>
            <Input
              id="responsible"
              value={formData.responsible}
              onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
              placeholder="Nom du responsable"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Détails de l'activité..."
              rows={4}
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-purple-500 hover:bg-purple-600">
              {activity ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
