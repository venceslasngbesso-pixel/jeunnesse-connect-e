# 📱 Guide d'Installation - Jeunesse Connectée

## Comment utiliser cette application sur votre téléphone

### Option 1 : Déploiement en ligne (RECOMMANDÉ)

L'application doit être hébergée sur Internet pour fonctionner comme une vraie PWA installable.

#### A. Déploiement gratuit avec Vercel (le plus simple)

1. **Créez un compte sur Vercel**
   - Allez sur https://vercel.com
   - Inscrivez-vous avec votre compte GitHub, GitLab ou email

2. **Uploadez votre projet**
   - Créez un nouveau dépôt GitHub avec tous les fichiers de ce projet
   - Sur Vercel, cliquez sur "Add New Project"
   - Importez votre dépôt GitHub
   - Vercel détectera automatiquement qu'il s'agit d'un projet React
   - Cliquez sur "Deploy"

3. **Obtenez votre URL**
   - Après le déploiement (2-3 minutes), vous recevrez une URL comme :
   - `https://jeunesse-connectee.vercel.app`

#### B. Autres options de déploiement gratuit

- **Netlify** : https://netlify.com
- **GitHub Pages** : https://pages.github.com
- **Render** : https://render.com

### Option 2 : Test local sur réseau WiFi

Si vous voulez tester sans déployer :

1. **Sur votre ordinateur**, ouvrez un terminal et lancez :
   ```bash
   npm install
   npm run dev -- --host
   ```

2. **Notez l'adresse IP** affichée (ex: `http://192.168.1.10:5173`)

3. **Sur votre téléphone** :
   - Connectez-vous au même réseau WiFi que votre ordinateur
   - Ouvrez le navigateur (Chrome ou Safari)
   - Tapez l'adresse IP affichée
   - L'application s'ouvrira

⚠️ **LIMITATION** : Cette méthode ne permet pas l'installation PWA complète

---

## 📲 Installation de l'application sur votre téléphone

Une fois l'application déployée en ligne :

### Sur Android (Chrome)

1. Ouvrez l'application dans **Google Chrome**
2. Appuyez sur le menu (⋮) en haut à droite
3. Sélectionnez **"Ajouter à l'écran d'accueil"** ou **"Installer l'application"**
4. Confirmez l'installation
5. L'icône apparaîtra sur votre écran d'accueil

**Alternative** : Une bannière d'installation peut apparaître automatiquement en bas de l'écran.

### Sur iPhone/iPad (Safari)

1. Ouvrez l'application dans **Safari**
2. Appuyez sur le bouton de partage (□↑) en bas de l'écran
3. Faites défiler et sélectionnez **"Sur l'écran d'accueil"**
4. Modifiez le nom si nécessaire
5. Appuyez sur **"Ajouter"**
6. L'icône apparaîtra sur votre écran d'accueil

---

## ✅ Vérification du fonctionnement

Après installation, vérifiez que :

- ✓ L'application s'ouvre en plein écran (sans barre d'adresse du navigateur)
- ✓ Les données sont sauvegardées entre les sessions
- ✓ L'application fonctionne même sans connexion Internet
- ✓ Les couleurs de l'église sont bien affichées (bleu ciel, blanc, jaune)

---

## 🔧 Configuration recommandée

### Données de démonstration

Au premier lancement, l'application créé automatiquement 3 membres de démonstration :
- Jean Kabongo (Président)
- Marie Nsimba (Secrétaire)  
- Paul Mukendi (Membre)

Vous pouvez :
- Les supprimer ou modifier
- Ajouter vos vrais membres
- Commencer à enregistrer les cotisations et présences

### Sauvegarde des données

**IMPORTANT** : Les données sont stockées localement sur chaque appareil.

Pour partager les données entre plusieurs appareils :
1. Utilisez la fonction "Synchroniser" dans les Paramètres
2. Ou exportez/importez les données manuellement

---

## 🆘 Résolution des problèmes

### L'application ne s'installe pas

- Vérifiez que vous utilisez **Chrome** (Android) ou **Safari** (iOS)
- Assurez-vous que l'application est servie en **HTTPS** (automatique avec Vercel, Netlify, etc.)
- Videz le cache du navigateur et réessayez

### Les données ne se sauvegardent pas

- Vérifiez que vous n'êtes pas en mode navigation privée
- Assurez-vous que le stockage local n'est pas désactivé dans les paramètres du navigateur

### L'application est lente

- L'application fonctionne entièrement hors ligne après le premier chargement
- Si elle reste lente, videz le cache et rechargez

---

## 📞 Support

Pour toute question ou problème :
- Email : jeunesse@acpephiladelphie.org
- Téléphone : +243 XXX XXX XXX

---

## 🎨 Personnalisation

Vous pouvez personnaliser :
- Le nom de l'église dans **Paramètres**
- Les informations de contact
- Le logo (à venir dans une prochaine version)

---

## 🔒 Sécurité et Confidentialité

- Toutes les données sont stockées **localement** sur votre appareil
- Aucune donnée n'est envoyée sur Internet
- L'application respecte la vie privée des membres
- Utilisez un code de verrouillage sur votre téléphone pour protéger l'accès

---

**Version** : 1.0.0  
**Dernière mise à jour** : Novembre 2025
