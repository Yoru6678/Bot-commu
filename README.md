# 🎉 Sora Community Bot

Bot Discord communautaire complet avec système XP, économie, jeux et interactions sociales !

## ✨ Fonctionnalités

### 📊 Système XP & Niveaux
- **Gain automatique d'XP** sur messages (avec cooldown anti-spam)
- **Gain d'XP en vocal** (toutes les 5 minutes)
- **Niveaux** avec paliers de récompenses
- **Classements** dynamiques (XP, coins, vocal, messages)
- **Profils** utilisateurs détaillés

### 💰 Système d'Économie
- **Coins virtuels** pour achats et paris
- **Daily** : récompense quotidienne avec bonus streak
- **Work** : travaille pour gagner des coins
- **Banque** : sécurise ton argent
- **Transferts** entre joueurs

### 🎲 Mini-Jeux
- **Coinflip** : pile ou face (x2)
- **Dice** : devine le numéro (x5)
- **Slots** : machine à sous (jusqu'à x10)

### 💬 Interactions Sociales
- **Hug, Kiss, Slap** et autres actions
- **Ship** : calculateur de compatibilité
- **Réputation** : système de +rep
- **AFK** : mode absence automatique
- **Mariages** (système fun)

### 🎉 Fun & Entertainment
- **Memes** aléatoires
- **8ball** : boule magique
- Et bien plus !

## 📋 Commandes Principales

### Profil & Leveling
- `+profile [@user]` - Voir un profil
- `+rank [@user]` - Carte de rang
- `+leaderboard [type]` - Classement
- `+setbio <texte>` - Définir une bio

### Économie
- `+balance [@user]` - Voir son argent
- `+daily` - Récompense quotidienne
- `+work` - Travailler
- `+deposit <montant>` - Déposer
- `+withdraw <montant>` - Retirer
- `+transfer @user <montant>` - Transférer

### Jeux
- `+coinflip <pile/face> <mise>`
- `+dice <1-6> <mise>`
- `+slots <mise>`

### Social
- `+hug @user` - Faire un câlin
- `+ship @user1 @user2` - Compatibilité
- `+rep @user` - Donner réputation
- `+afk [raison]` - Mode AFK

### Fun
- `+meme` - Meme aléatoire
- `+8ball <question>` - Boule magique

### Utilitaires
- `+help` - Aide complète
- `+ping` - Latence

## 🚀 Installation

1. Clone le projet
2. Installe les dépendances : `npm install`
3. Configure les secrets (TOKEN, OWNER_ID)
4. Lance le bot : `npm start`

## ⚙️ Configuration

Variables d'environnement requises :
- `TOKEN` : Token du bot Discord
- `OWNER_ID` : ID du propriétaire

Variables optionnelles :
- `PREFIX` : Prefix des commandes (défaut: `+`)
- `EMBED_COLOR` : Couleur des embeds (défaut: `#7289DA`)

## 📊 Système XP

- **Messages** : 15-25 XP par message (cooldown 60s)
- **Vocal** : 20-30 XP toutes les 5 minutes
- **Formule niveau** : `niveau = √(xp / 100)`
- **Récompenses automatiques** :
  - Niveau 5 : 500 coins
  - Niveau 10 : 1000 coins
  - Niveau 20 : 2500 coins
  - Niveau 30 : 5000 coins
  - Niveau 50 : 10000 coins

## 💎 Économie

- **Daily** : 500-1000 coins/jour (bonus streak)
- **Work** : 200-600 coins/heure
- **Jeux** : multiplicateurs variables
- **Banque** : stockage illimité

## 🎨 Design

- **Couleur principale** : Bleu Discord (#7289DA)
- **Emojis partout** pour un style dynamique
- **Embeds colorés** et esthétiques
- **Barres de progression** visuelles
- **Messages fun** et encourageants

## 📝 License

MIT License - Libre d'utilisation
