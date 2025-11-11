# 🚀 Guide de Configuration - {+} Nami

## ✅ CE QUI A ÉTÉ CORRIGÉ

### 🐛 Problème 1 : Les commandes ne répondaient pas
**✅ RÉSOLU** - Créé l'événement `messageCreate.js` manquant

### 🏷️ Problème 2 : Renommer le bot
**✅ RÉSOLU** - Le bot s'appelle maintenant "{+} Nami" partout

### 📊 Problème 3 : Statistiques temps réel
**✅ RÉSOLU** - Système de stats avec 3 canaux séparés

---

## 🔧 CONFIGURATION REQUISE

### Étape 1 : Obtenir le Token Discord

1. Allez sur [Discord Developer Portal](https://discord.com/developers/applications)
2. Créez une nouvelle application (ou sélectionnez celle existante)
3. Allez dans l'onglet **Bot**
4. Activez ces 3 intents **OBLIGATOIRES** :
   - ✅ **Presence Intent**
   - ✅ **Server Members Intent**
   - ✅ **Message Content Intent**
5. Copiez le **Token** (bouton "Reset Token" si besoin)

### Étape 2 : Obtenir votre ID Discord

1. Activez le Mode Développeur dans Discord :
   - Paramètres > Avancés > **Mode Développeur** ✅
2. Cliquez droit sur votre profil → **Copier l'identifiant**
3. Notez cet ID (c'est votre OWNER_ID)

### Étape 3 : Configurer les Secrets Replit

1. **Ouvrez l'onglet "Secrets" (🔒) dans Replit** (dans la barre latérale gauche)

2. **Ajoutez ces 2 secrets OBLIGATOIRES** :

   | Clé | Valeur | Exemple |
   |-----|--------|---------|
   | `TOKEN` | Votre token Discord | `MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.GhI...` |
   | `OWNER_ID` | Votre ID Discord | `123456789012345678` |

3. **(OPTIONNEL) Ajoutez le préfixe personnalisé** :
   
   | Clé | Valeur | Par défaut |
   |-----|--------|------------|
   | `PREFIX` | Le préfixe des commandes | `+` |

---

## 📊 STATISTIQUES EN TEMPS RÉEL (Optionnel)

Pour afficher des stats dans les noms de salons vocaux :

### Étape 1 : Créer les salons vocaux

Dans votre serveur Discord, créez **3 salons vocaux** :

```
📊 STATISTIQUES
├─ 👥 ・Membres : 0
├─ 🌐 ・En ligne : 0
└─ 🔊 ・En vocal : 0
```

### Étape 2 : Obtenir les IDs des salons

1. Mode Développeur activé ✅
2. Cliquez droit sur chaque salon vocal → **Copier l'identifiant**
3. Notez les 3 IDs

### Étape 3 : Ajouter les IDs dans Replit Secrets

| Clé | Valeur | Description |
|-----|--------|-------------|
| `STATS_CHANNEL_MEMBERS` | ID du salon "Membres" | Affiche le nombre total de membres |
| `STATS_CHANNEL_ONLINE` | ID du salon "En ligne" | Affiche le nombre de membres en ligne |
| `STATS_CHANNEL_VOICE` | ID du salon "En vocal" | Affiche le nombre de personnes en vocal |

**Exemple** :
```
STATS_CHANNEL_MEMBERS=1234567890123456789
STATS_CHANNEL_ONLINE=9876543210987654321
STATS_CHANNEL_VOICE=5555555555555555555
```

### ⚠️ Permissions requises

Le bot a besoin de la permission **MANAGE_CHANNELS** pour renommer les salons vocaux.

---

## 🚀 LANCER LE BOT

Une fois les secrets configurés :

1. **Cliquez sur le bouton ▶️ "Run"** en haut de Replit
2. **Vérifiez les logs** dans la console :

```
{+} NAMI - STARTING

✅ Bot connecté : {+} Nami#1234
📊 Serveurs : 1
👥 Utilisateurs : 50
🎯 Préfixe : +
🛡️ {+} Nami est prêt !
📊 Stats Updater démarré (mise à jour toutes les 5 min)
```

---

## 🧪 TESTER LES COMMANDES

Dans Discord, tapez :

- `+ping` → Doit répondre avec la latence
- `+help` → Doit afficher la liste des commandes
- `+serverinfo` → Doit afficher les infos du serveur

---

## 📋 COMMANDES DISPONIBLES

### 🛡️ Modération
- `+ban <@utilisateur> [raison]` - Bannir un membre
- `+kick <@utilisateur> [raison]` - Expulser un membre
- `+mute <@utilisateur> <durée> [raison]` - Mute un membre
- `+warn <@utilisateur> <raison>` - Avertir un membre
- `+clear <nombre>` - Supprimer des messages
- `+lock-channel` - Verrouiller le salon
- `+unlock` - Déverrouiller le salon
- `+slowmode <secondes>` - Activer le mode lent

### ℹ️ Informations
- `+serverinfo` - Infos du serveur
- `+userinfo [@utilisateur]` - Infos d'un membre
- `+profile [@utilisateur]` - Profil d'un membre

### 🔧 Utilitaires
- `+help` - Liste des commandes
- `+ping` - Latence du bot
- `+stats` - Statistiques du bot
- `+uptime` - Temps de fonctionnement
- `+calc <expression>` - Calculatrice
- `+avatar [@utilisateur]` - Avatar d'un membre
- `+ticket` - Créer un ticket de support

### ⚙️ Administration (Owner uniquement)
- `+setup-stats` - Configurer les stats
- `+reload <commande>` - Recharger une commande
- `+shutdown` - Éteindre le bot

---

## ❓ PROBLÈMES COURANTS

### Le bot ne répond pas aux commandes

1. ✅ Vérifiez que le **Message Content Intent** est activé
2. ✅ Vérifiez que le préfixe est correct (`+` par défaut)
3. ✅ Vérifiez les logs pour voir si les commandes sont chargées

### Les stats ne s'affichent pas

1. ✅ Vérifiez que les IDs des salons sont corrects
2. ✅ Vérifiez que le bot a la permission **MANAGE_CHANNELS**
3. ✅ Attendez 5 minutes (intervalle de mise à jour)

### Erreur "TOKEN not defined"

1. ✅ Vérifiez que vous avez bien ajouté `TOKEN` dans Replit Secrets
2. ✅ Vérifiez qu'il n'y a pas d'espaces avant/après le token
3. ✅ Relancez le bot (bouton ▶️)

---

## 🎉 C'EST FAIT !

Votre bot **{+} Nami** est maintenant :
- ✅ **Fonctionnel** - Les commandes répondent
- ✅ **Renommé** - S'appelle "{+} Nami" partout
- ✅ **Automatisé** - Stats en temps réel dans les salons vocaux

**Bon usage ! 🚀**
