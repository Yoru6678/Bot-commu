# Nami Protect - Bot Discord de Modération

## Vue d'ensemble
Bot Discord professionnel de modération ultra-sécurisé avec plus de 80 commandes pour gérer votre serveur Discord.

## État actuel
✅ **Opérationnel** - Le bot est configuré et fonctionne avec 84 commandes actives

## Dernières modifications (12 novembre 2025)
- ✅ Configuration initiale pour Replit
- ✅ Création de 50+ nouvelles commandes
- ✅ Ajout des services partagés (AutomodService, ConfigService, CacheService)
- ✅ Intégration des fonctionnalités de sécurité avancées
- ✅ Système de logs complet
- ✅ Commandes utilitaires étendues (snipe, editsnipe, poll, etc.)
- ✅ Système d'administration complet

## Architecture du projet

### Structure des dossiers
```
src/
├── commands/           # Toutes les commandes du bot (84 commandes)
│   ├── administration/ # Commandes d'administration (11)
│   ├── information/    # Commandes d'information (2)
│   ├── logging/        # Commandes de logs (6)
│   ├── moderation/     # Commandes de modération (18)
│   ├── security/       # Commandes de sécurité (11)
│   ├── staff/          # Commandes du staff (4)
│   ├── system/         # Commandes système (2)
│   └── utility/        # Commandes utilitaires (30)
├── config/            # Configuration du bot
├── core/              # Cœur du bot (client, envLoader, index)
├── database/          # Gestion SQLite (better-sqlite3)
├── events/            # Gestionnaires d'événements Discord
├── handlers/          # Gestionnaires de commandes, permissions, etc.
├── jobs/              # Tâches planifiées (stats)
├── security/          # Modules de sécurité
├── services/          # Services partagés (nouveaux)
│   ├── AutomodService.js
│   ├── ConfigService.js
│   └── CacheService.js
└── utils/             # Utilitaires (embeds, logger, validators)
```

### Base de données SQLite
Le bot utilise `better-sqlite3` pour stocker:
- Sanctions et avertissements
- Configuration des serveurs
- Tickets de support
- Notes internes du staff
- Configuration des logs
- Configuration de l'automodération
- Rappels et statuts AFK

## Catégories de commandes

### 🔧 Utilitaires (30 commandes)
- Informations: help, ping, botinfo, uptime, stats, serverinfo, userinfo, avatar, banner, roleinfo
- Comptage: membercount, rolecount, channelcount
- Interaction: poll, pollmulti, suggest, afk
- Création: say, embed
- Récupération: snipe, editsnipe
- Outils: remind, translate, timezone, ticket, support, invite, calc

### 🛡️ Modération (18 commandes)
ban, unban, kick, mute, unmute, timeout, tempban, warn, warnings, delwarn, checkwarns, clear, purge, lock-channel, unlock, slowmode, nuke

### 🔒 Sécurité (11 commandes)
antispam, antilink, antiflood, antimention, antijoinraid, antinuke, antiedit, antibot, verify, checkperms, security-check

### ⚙️ Administration (11 commandes)
setprefix, setwelcome, setgoodbye, setlogs, setmodlogs, setverif, autorole, removeautorole, setup-stats, maintenance, restartbot

### 📝 Logging (6 commandes)
messagelog, joinlog, leavelog, modlog, voicelog, logstatus

### 👥 Staff (4 commandes)
stafflist, report, notes, broadcast

### 🔐 Système (2 commandes)
reload, shutdown

### ℹ️ Information (2 commandes)
profile, roleinfo

## Variables d'environnement

### Obligatoires
- `TOKEN` - Token du bot Discord (configuré via Replit Secrets)
- `OWNER_ID` - ID Discord du propriétaire (configuré via Replit Secrets)

### Optionnelles
- `PREFIX` - Préfixe des commandes (défaut: `+`)
- `EMBED_COLOR` - Couleur des embeds (défaut: `#FF69B4`)
- `STATS_CHANNEL_MEMBERS` - ID du salon pour stats membres
- `STATS_CHANNEL_ONLINE` - ID du salon pour stats en ligne
- `STATS_CHANNEL_VOICE` - ID du salon pour stats vocaux
- `STATS_UPDATE_INTERVAL` - Intervalle de mise à jour stats (défaut: 300s)

## Fonctionnalités clés

### Système de sécurité avancé
- Protection anti-spam, anti-link, anti-flood
- Protection anti-raid et anti-nuke
- Détection des modifications abusives
- Vérification manuelle et automatique des membres

### Système de logs complet
- Logs des messages (suppression/édition)
- Logs d'arrivées et départs
- Logs de modération
- Logs vocaux
- Configuration flexible par serveur

### Utilitaires puissants
- Snipe/EditSnipe pour récupérer messages supprimés/modifiés
- Système de sondages simple et multi-choix
- Rappels programmables
- Gestion de statut AFK
- Notes internes sur les membres

### Services partagés
- **AutomodService**: Gestion centralisée de l'automodération
- **ConfigService**: Configuration par serveur (préfixes, salons, messages)
- **CacheService**: Cache temporaire pour snipe/editsnipe

## Préférences utilisateur
- **Langue**: Français
- **Préfixe par défaut**: `+`
- **Style des embeds**: Rose (#FF69B4)

## Développement

### Dépendances principales
- discord.js v14.14.1
- better-sqlite3 v8.4.0
- dotenv v16.3.1
- winston v3.9.0

### Workflow Replit
Le bot démarre automatiquement via `npm start` (workflow: discord-bot)

### Tests
```bash
npm test        # Exécuter les tests
npm run lint    # Vérifier le code
```

## Notes importantes
- Le bot utilise Node.js 18+
- La base de données est créée automatiquement au premier lancement
- Les permissions Discord doivent être correctement configurées
- Certaines commandes nécessitent des permissions spécifiques

## Support
Utilisez `+help` dans Discord pour voir toutes les commandes disponibles.
Pour une commande spécifique: `+help <nom_commande>`
