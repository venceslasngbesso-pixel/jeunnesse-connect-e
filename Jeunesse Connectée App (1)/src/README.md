# 🙏 Jeunesse Connectée - ACPE PHILADELPHIE

Application PWA de gestion pour la jeunesse de l'église **Jeune pour Christ ACPE PHILADELPHIE**.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📱 Fonctionnalités

### 🏠 Tableau de bord
- Vue d'ensemble des statistiques
- Total des membres actifs
- Cotisations du mois
- Taux de présence moyen
- Activités à venir

### 👥 Gestion des membres
- Liste complète avec recherche
- Fiches détaillées (profil, cotisations, présences)
- CV personnel de chaque membre
- Différenciation membres/responsables

### 💰 Trésorerie
- Suivi des cotisations (500 FCFA membres / 1000 FCFA responsables)
- Graphiques mensuels
- Statistiques par membre
- Historique complet

### ✅ Présences
- Enregistrement par type de culte :
  - Mardi – Méditation
  - Jeudi – Exhortation
  - Dimanche – Louange et Adoration
  - Activités
- Statistiques globales et par membre
- Historique avec filtres

### 📅 Activités
- Gestion des activités passées et à venir
- Ajout de participants
- Détails et descriptions

### ⚙️ Paramètres
- Configuration de l'église
- Synchronisation des données
- Informations de contact

## 🚀 Installation rapide

### Pour développeurs

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Compiler pour production
npm run build
```

### Pour utilisateurs finaux

📖 **Consultez le guide complet** : [INSTALLATION.md](./INSTALLATION.md)

**En résumé :**
1. Déployez sur Vercel, Netlify ou GitHub Pages
2. Ouvrez l'URL sur votre téléphone
3. Installez comme application (bouton "Ajouter à l'écran d'accueil")
4. Utilisez hors ligne !

## 🎨 Technologies utilisées

- **React** - Interface utilisateur
- **TypeScript** - Typage statique
- **Tailwind CSS** - Stylisation
- **Recharts** - Graphiques
- **Lucide Icons** - Icônes
- **LocalStorage** - Stockage hors ligne
- **Service Worker** - Fonctionnement PWA

## 🌈 Couleurs de l'église

- **Bleu ciel** : `#87CEEB` - Couleur principale
- **Blanc** : `#FFFFFF` - Fond
- **Jaune/Or** : `#FFD700` - Accents (cotisations, responsables)

## 💾 Stockage des données

Toutes les données sont stockées **localement** sur l'appareil via LocalStorage :
- ✅ Fonctionne 100% hors ligne
- ✅ Pas besoin de connexion Internet
- ✅ Données privées et sécurisées
- ⚠️ Sauvegardez régulièrement vos données

## 📱 Compatibilité

- ✅ Android (Chrome, Firefox, Edge)
- ✅ iOS (Safari)
- ✅ Desktop (tous navigateurs modernes)
- ✅ Mode hors ligne complet
- ✅ Installable comme application

## 🔐 Sécurité

- Aucune donnée envoyée sur Internet
- Stockage 100% local
- Pas de compte utilisateur requis
- Respecte la confidentialité des membres

## 📄 Structure du projet

```
jeunesse-connectee/
├── components/          # Composants React
│   ├── Dashboard.tsx   # Tableau de bord
│   ├── Members.tsx     # Liste des membres
│   ├── Treasury.tsx    # Trésorerie
│   ├── Attendance.tsx  # Présences
│   ├── Activities.tsx  # Activités
│   └── Settings.tsx    # Paramètres
├── lib/                # Utilitaires
│   ├── storage.ts      # Gestion LocalStorage
│   └── pwa.ts          # Configuration PWA
├── types/              # Types TypeScript
├── public/             # Fichiers statiques
│   ├── manifest.json   # Manifest PWA
│   └── sw.js          # Service Worker
└── styles/            # Styles CSS
```

## 🤝 Contribution

Ce projet est développé pour **ACPE PHILADELPHIE**.

Pour toute suggestion ou amélioration :
- Contactez le bureau jeunesse
- Email : jeunesse@acpephiladelphie.org

## 📞 Contact

**Bureau Jeunesse ACPE PHILADELPHIE**
- 📧 Email : jeunesse@acpephiladelphie.org
- 📱 Téléphone : +243 XXX XXX XXX
- 📍 Adresse : Kinshasa, RDC

## 📝 Licence

MIT License - Libre d'utilisation pour les églises et organisations à but non lucratif.

---

**Développé avec ❤️ pour la jeunesse de Christ**

*Jeune pour Christ ACPE PHILADELPHIE*
