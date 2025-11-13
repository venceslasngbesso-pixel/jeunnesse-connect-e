# 📁 Structure du Projet - Jeunesse Connectée

Ce document explique à quoi sert chaque fichier et dossier de l'application.

---

## 📂 Vue d'ensemble

```
jeunesse-connectee/
├── 📄 Fichiers de documentation (à lire)
├── 📱 Fichiers de l'application (ne pas modifier)
├── 🎨 Fichiers de style
└── ⚙️ Fichiers de configuration
```

---

## 📖 Documentation (LISEZ CES FICHIERS)

| Fichier | Description | Priorité |
|---------|-------------|----------|
| `COMMENCER-ICI.md` | Point de départ - Lisez en premier | ⭐⭐⭐ |
| `GUIDE-RAPIDE.md` | Guide simplifié en 3 étapes | ⭐⭐⭐ |
| `DEPLOIEMENT-COMPLET.md` | Guide détaillé pas à pas | ⭐⭐⭐ |
| `CREER-ICONES.md` | Comment créer les icônes | ⭐⭐ |
| `INSTALLATION.md` | Instructions complètes | ⭐⭐ |
| `FAQ.md` | Questions fréquentes | ⭐ |
| `README.md` | Documentation technique | ⭐ |
| `STRUCTURE-PROJET.md` | Ce fichier - Explique la structure | ⭐ |
| `Attributions.md` | Crédits et licences | - |

---

## 📱 Fichiers de l'Application

### 🎯 Fichiers principaux (NE PAS SUPPRIMER)

| Fichier | Description |
|---------|-------------|
| `App.tsx` | Fichier principal de l'application |
| `index.html` | Page HTML principale (point d'entrée) |

### 📂 Dossier `/components/`

Contient tous les composants React de l'application.

#### Composants principaux :
```
components/
├── Dashboard.tsx         → Tableau de bord (écran d'accueil)
├── Members.tsx           → Liste des membres
├── MemberDetail.tsx      → Fiche détaillée d'un membre
├── Treasury.tsx          → Gestion de la trésorerie
├── Attendance.tsx        → Suivi des présences
├── Activities.tsx        → Gestion des activités
├── Settings.tsx          → Paramètres de l'application
├── AddMemberDialog.tsx        → Formulaire d'ajout de membre
├── AddContributionDialog.tsx  → Formulaire de cotisation
├── AddAttendanceDialog.tsx    → Formulaire de présence
└── AddActivityDialog.tsx      → Formulaire d'activité
```

#### Composants UI (ShadCN) :
```
components/ui/
├── button.tsx           → Boutons
├── card.tsx             → Cartes
├── dialog.tsx           → Fenêtres modales
├── input.tsx            → Champs de saisie
├── select.tsx           → Listes déroulantes
├── tabs.tsx             → Onglets
├── badge.tsx            → Badges
├── avatar.tsx           → Photos de profil
├── checkbox.tsx         → Cases à cocher
├── switch.tsx           → Interrupteurs
├── chart.tsx            → Graphiques
├── sonner.tsx           → Notifications toast
└── ... (autres composants UI)
```

⚠️ **Ne modifiez PAS ces fichiers sauf si vous êtes développeur**

---

## 📂 Dossier `/lib/`

Contient la logique métier de l'application.

```
lib/
├── storage.ts    → Gestion du stockage local (LocalStorage)
│                  • Sauvegarde des membres
│                  • Sauvegarde des cotisations
│                  • Sauvegarde des présences
│                  • Sauvegarde des activités
│
└── pwa.ts        → Configuration PWA
                   • Enregistrement du Service Worker
                   • Gestion de l'installation
```

---

## 📂 Dossier `/types/`

Définit les types de données utilisées.

```
types/
└── index.ts      → Types TypeScript
                   • Member (Membre)
                   • Contribution (Cotisation)
                   • Attendance (Présence)
                   • Activity (Activité)
                   • ChurchSettings (Paramètres)
```

---

## 📂 Dossier `/styles/`

Contient les styles CSS de l'application.

```
styles/
└── globals.css   → Styles globaux
                   • Couleurs de l'église
                   • Typographie
                   • Thème Tailwind
```

---

## 📂 Dossier `/public/` (IMPORTANT POUR PWA)

Fichiers statiques accessibles publiquement.

```
public/
├── manifest.json     → Manifeste PWA (définit l'application)
│                      • Nom de l'application
│                      • Icônes
│                      • Couleurs
│                      • Configuration d'installation
│
├── sw.js            → Service Worker (permet le mode hors ligne)
│                      • Mise en cache
│                      • Fonctionnement offline
│
├── icon.svg         → Icône SVG de base
├── icon-192.png     → Icône 192x192 (À CRÉER)
└── icon-512.png     → Icône 512x512 (À CRÉER)
```

⚠️ **VOUS DEVEZ CRÉER** :
- `icon-192.png` (icône 192x192 pixels)
- `icon-512.png` (icône 512x512 pixels)

Voir [CREER-ICONES.md](./CREER-ICONES.md) pour savoir comment.

---

## ⚙️ Fichiers de Configuration

| Fichier | Description | Nécessaire ? |
|---------|-------------|--------------|
| `vercel.json` | Configuration Vercel | ✅ Si vous utilisez Vercel |
| `netlify.toml` | Configuration Netlify | ✅ Si vous utilisez Netlify |
| `package.json` | Dépendances npm | ✅ Oui |
| `tsconfig.json` | Configuration TypeScript | ✅ Oui |
| `vite.config.ts` | Configuration Vite | ✅ Oui |

---

## 📝 Fichiers générés (ignorés)

Ces fichiers sont générés automatiquement :

```
node_modules/    → Dépendances installées (très gros dossier)
dist/            → Application compilée pour production
.vercel/         → Configuration Vercel
.netlify/        → Configuration Netlify
```

⚠️ **Ne les uploadez PAS sur GitHub ou Vercel** (ils sont automatiquement générés)

---

## 🎯 Fichiers que VOUS devez créer

Avant de déployer, créez ces fichiers :

### 1. Icônes (OBLIGATOIRE)
```
/public/icon-192.png   → Icône 192x192 pixels
/public/icon-512.png   → Icône 512x512 pixels
```

Voir [CREER-ICONES.md](./CREER-ICONES.md)

### 2. Package.json (si absent)
```json
{
  "name": "jeunesse-connectee",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 🚫 Ne supprimez JAMAIS ces fichiers

| Fichier/Dossier | Raison |
|-----------------|--------|
| `App.tsx` | Composant principal - L'app ne fonctionnera pas |
| `index.html` | Point d'entrée - L'app ne se chargera pas |
| `/components/` | Tous les composants - L'app sera cassée |
| `/lib/storage.ts` | Stockage des données - Vous perdrez tout |
| `/public/manifest.json` | Manifeste PWA - L'app ne sera pas installable |
| `/public/sw.js` | Service Worker - Pas de mode hors ligne |

---

## ✏️ Fichiers que vous POUVEZ modifier

### Recommandé pour personnalisation :

1. **`/public/manifest.json`**
   - Changez le nom de l'application
   - Modifiez les couleurs

2. **`/lib/storage.ts`** (section initialization)
   - Modifiez les données de démonstration

3. **`/components/Settings.tsx`**
   - Personnalisez les paramètres par défaut

### ⚠️ Modifiez UNIQUEMENT si vous êtes développeur :
- Tous les autres fichiers `.tsx`
- Fichiers dans `/lib/`
- Fichiers dans `/styles/`

---

## 📊 Taille des fichiers

| Type | Taille approximative |
|------|---------------------|
| Documentation (`.md`) | ~200 KB |
| Code source (`.tsx`, `.ts`) | ~500 KB |
| Composants UI | ~1 MB |
| Application compilée | ~5-10 MB |
| Avec node_modules | ~200-300 MB |

---

## 🔄 Workflow de développement

### Pour déployer l'application :

1. **Vérifiez que TOUS ces fichiers existent** :
   ```
   ✓ App.tsx
   ✓ index.html
   ✓ /components/ (tous les fichiers)
   ✓ /lib/ (storage.ts, pwa.ts)
   ✓ /public/manifest.json
   ✓ /public/sw.js
   ✓ /public/icon-192.png (À CRÉER)
   ✓ /public/icon-512.png (À CRÉER)
   ✓ /styles/globals.css
   ✓ /types/index.ts
   ```

2. **Créez les icônes** ([CREER-ICONES.md](./CREER-ICONES.md))

3. **Déployez** ([DEPLOIEMENT-COMPLET.md](./DEPLOIEMENT-COMPLET.md))

---

## 📦 Que télécharger/uploader ?

### Sur GitHub :
Uploadez TOUT sauf :
- `node_modules/`
- `dist/`
- `.env`

### Sur Vercel/Netlify :
Si vous utilisez GitHub, ils récupèrent automatiquement.

Si vous uploadez manuellement, incluez :
- Tous les dossiers (`components/`, `lib/`, etc.)
- Tous les fichiers de config
- Les icônes dans `/public/`

---

## 🎯 Résumé rapide

**Fichiers à lire** :
1. COMMENCER-ICI.md
2. GUIDE-RAPIDE.md
3. DEPLOIEMENT-COMPLET.md

**Fichiers à créer** :
1. icon-192.png
2. icon-512.png

**Fichiers à ne PAS toucher** :
- Tout sauf si vous êtes développeur
- Surtout pas `/components/` et `/lib/`

**Dossiers importants** :
- `/components/` → Code de l'application
- `/public/` → Fichiers statiques + icônes
- `/lib/` → Logique métier

---

## ❓ Questions ?

**"Quel fichier fait quoi ?"**  
→ Consultez ce fichier (STRUCTURE-PROJET.md)

**"Puis-je supprimer node_modules ?"**  
→ Oui, il sera régénéré avec `npm install`

**"Dois-je uploader tous les fichiers ?"**  
→ Oui, sauf `node_modules/` et `dist/`

**"Je veux modifier les couleurs"**  
→ Modifiez `/styles/globals.css` (pour développeurs)

---

**Pour toute question** : Consultez [FAQ.md](./FAQ.md)

---

*Documentation de Jeunesse Connectée - ACPE PHILADELPHIE*
