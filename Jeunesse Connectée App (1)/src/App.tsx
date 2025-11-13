import { useState, useEffect } from 'react';
import { Home, Users, DollarSign, Calendar, Briefcase, Settings as SettingsIcon } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Members } from './components/Members';
import { MemberDetail } from './components/MemberDetail';
import { Treasury } from './components/Treasury';
import { Attendance } from './components/Attendance';
import { Activities } from './components/Activities';
import { Settings } from './components/Settings';
import { AddMemberDialog } from './components/AddMemberDialog';
import { AddContributionDialog } from './components/AddContributionDialog';
import { AddAttendanceDialog } from './components/AddAttendanceDialog';
import { AddActivityDialog } from './components/AddActivityDialog';
import { Toaster } from './components/ui/sonner';
import { Member, Activity } from './types';
import { initializeDemoData } from './lib/storage';
import { registerServiceWorker, setupPWAInstall } from './lib/pwa';

type View = 'dashboard' | 'members' | 'treasury' | 'attendance' | 'activities' | 'settings';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  
  // Dialog states
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddContribution, setShowAddContribution] = useState(false);
  const [showAddAttendance, setShowAddAttendance] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | undefined>();
  const [editingActivity, setEditingActivity] = useState<Activity | undefined>();

  // Initialize demo data and PWA on first load
  useEffect(() => {
    initializeDemoData();
    registerServiceWorker();
    setupPWAInstall();
  }, []);

  // Handle member actions
  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
  };

  const handleBackFromMember = () => {
    setSelectedMember(null);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setShowAddMember(true);
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setShowAddActivity(true);
  };

  // Close dialogs and reset editing states
  const closeAddMemberDialog = (open: boolean) => {
    setShowAddMember(open);
    if (!open) setEditingMember(undefined);
  };

  const closeAddActivityDialog = (open: boolean) => {
    setShowAddActivity(open);
    if (!open) setEditingActivity(undefined);
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard' as View, icon: Home, label: 'Accueil', color: '#87CEEB' },
    { id: 'members' as View, icon: Users, label: 'Membres', color: '#87CEEB' },
    { id: 'treasury' as View, icon: DollarSign, label: 'Trésorerie', color: '#FFD700' },
    { id: 'attendance' as View, icon: Calendar, label: 'Présences', color: '#10b981' },
    { id: 'activities' as View, icon: Briefcase, label: 'Activités', color: '#a855f7' },
    { id: 'settings' as View, icon: SettingsIcon, label: 'Paramètres', color: '#6b7280' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#87CEEB] to-[#6BB8DA] text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white">Jeunesse Connectée</h1>
          <p className="text-white opacity-90">Jeune pour Christ ACPE PHILADELPHIE</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {selectedMember ? (
          <MemberDetail 
            member={selectedMember} 
            onBack={handleBackFromMember}
            onEdit={handleEditMember}
          />
        ) : (
          <>
            {activeView === 'dashboard' && (
              <Dashboard 
                onAddMember={() => setShowAddMember(true)}
                onAddContribution={() => setShowAddContribution(true)}
                onAddAttendance={() => setShowAddAttendance(true)}
              />
            )}
            {activeView === 'members' && (
              <Members 
                onMemberClick={handleMemberClick}
                onAddMember={() => setShowAddMember(true)}
              />
            )}
            {activeView === 'treasury' && <Treasury />}
            {activeView === 'attendance' && <Attendance />}
            {activeView === 'activities' && (
              <Activities 
                onAddActivity={() => setShowAddActivity(true)}
                onEditActivity={handleEditActivity}
              />
            )}
            {activeView === 'settings' && <Settings />}
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      {!selectedMember && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-2">
            <div className="grid grid-cols-6 gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                      isActive ? 'text-current' : 'text-gray-500'
                    }`}
                    style={{ color: isActive ? item.color : undefined }}
                  >
                    <Icon className="h-5 w-5 mb-1" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      {/* Dialogs */}
      <AddMemberDialog 
        open={showAddMember} 
        onOpenChange={closeAddMemberDialog}
        member={editingMember}
      />
      <AddContributionDialog 
        open={showAddContribution} 
        onOpenChange={setShowAddContribution}
      />
      <AddAttendanceDialog 
        open={showAddAttendance} 
        onOpenChange={setShowAddAttendance}
      />
      <AddActivityDialog 
        open={showAddActivity} 
        onOpenChange={closeAddActivityDialog}
        activity={editingActivity}
      />

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </div>
  );
}
