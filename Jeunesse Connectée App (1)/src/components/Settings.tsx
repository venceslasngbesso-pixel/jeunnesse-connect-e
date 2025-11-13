import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Phone, Mail, MapPin, Save, RefreshCw } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { getSettings, saveSettings } from '../lib/storage';
import { ChurchSettings } from '../types';
import { toast } from 'sonner@2.0.3';

export function Settings() {
  const [settings, setSettings] = useState<ChurchSettings>(getSettings());
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSave = () => {
    saveSettings(settings);
    toast.success('Paramètres sauvegardés');
  };

  const handleSync = () => {
    setIsSyncing(true);
    // Simulate sync
    setTimeout(() => {
      setIsSyncing(false);
      toast.success('Données synchronisées');
    }, 2000);
  };

  return (
    <div className="space-y-6 p-4 pb-20">
      <div>
        <h1 className="text-[#87CEEB] mb-2">Paramètres</h1>
        <p className="text-gray-600">Configuration de l'application</p>
      </div>

      {/* Church Info */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <SettingsIcon className="h-6 w-6 text-[#87CEEB]" />
          <h2>Informations de l'église</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="churchName">Nom complet</Label>
            <Input
              id="churchName"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <Input
                id="phone"
                type="tel"
                value={settings.contact.phone}
                onChange={(e) => setSettings({
                  ...settings,
                  contact: { ...settings.contact, phone: e.target.value }
                })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <Input
                id="email"
                type="email"
                value={settings.contact.email}
                onChange={(e) => setSettings({
                  ...settings,
                  contact: { ...settings.contact, email: e.target.value }
                })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Adresse</Label>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <Input
                id="address"
                value={settings.contact.address}
                onChange={(e) => setSettings({
                  ...settings,
                  contact: { ...settings.contact, address: e.target.value }
                })}
              />
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="w-full bg-[#87CEEB] hover:bg-[#6BB8DA]"
          >
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder les modifications
          </Button>
        </div>
      </Card>

      {/* Sync */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <RefreshCw className="h-6 w-6 text-[#87CEEB]" />
          <h2>Synchronisation</h2>
        </div>

        <p className="text-gray-600 mb-4">
          Synchronisez vos données pour les sauvegarder et les partager entre plusieurs appareils.
        </p>

        <Button
          onClick={handleSync}
          disabled={isSyncing}
          className="w-full bg-green-500 hover:bg-green-600"
        >
          {isSyncing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Synchronisation en cours...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Synchroniser maintenant
            </>
          )}
        </Button>
      </Card>

      {/* Contact Info Display */}
      <Card className="p-6 bg-gradient-to-r from-[#87CEEB] to-[#6BB8DA] text-white">
        <h2 className="text-white mb-4">Bureau Jeunesse</h2>
        <div className="space-y-3">
          <p className="text-white">{settings.name}</p>
          
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{settings.contact.phone}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{settings.contact.email}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{settings.contact.address}</span>
          </div>
        </div>
      </Card>

      {/* App Info */}
      <Card className="p-6">
        <h2 className="mb-4">À propos</h2>
        <div className="space-y-2 text-gray-600">
          <p>Version: 1.0.0</p>
          <p>Application de gestion pour la jeunesse</p>
          <p className="text-[#87CEEB]">Jeunesse Connectée</p>
        </div>
      </Card>
    </div>
  );
}
