# Déployer Haruka_Protect sur Replit

Ce guide explique comment lancer et tester le bot `Haruka_Protect` sur Replit (idéale si ton PC ne peut pas exécuter les tests localement).

Important : ne partage jamais ton `TOKEN` publiquement. Utilise le panneau "Secrets" (Environment Variables) de Replit.

Pré-requis
- Un compte Replit
- Un dépôt contenant ce projet (tu peux importer via Git depuis GitHub ou uploader les fichiers)

Étapes rapides
1. Crée un nouveau Replit et importe ce dossier (ou `git clone` depuis ton repo si tu l'as poussé sur GitHub).
2. Dans la sidebar Replit, ouvre "Secrets" (Environment variables) et ajoute les variables suivantes (valeurs d'exemple) :
   - `TOKEN` = ton token Discord (string)
   - `OWNER_ID` = ton ID Discord
   - `PREFIX` = `+` (ou ce que tu veux)
   - `SQLITE_PATH` = `./data/haruka.db` (optionnel)
   - `STATS_VC_MEMBERS_ONLINE` = ID du salon vocal qui affichera `Membres: X • Online: Y`
   - `STATS_VC_VOICE_COUNT` = ID du salon vocal qui affichera `En vocal: Z`
   - `STATS_UPDATE_INTERVAL` = `60` (secondes, optionnel)

3. Installe les dépendances : dans la console Replit (Shell) exécute :
```
npm install
```

4. Lancer le bot : Replit utilisera la configuration du fichier `.replit` et exécutera `npm run start`. Tu peux cliquer sur "Run".

5. Vérifie les logs dans la console Replit. Le job `statsVoiceUpdater` démarre automatiquement après la connexion du bot et tentera de renommer les salons configurés.

Conseils et limitations
- Active les Intents privilégiés dans le Developer Portal (Presence & Server Members) pour avoir des comptages exacts.
- Sur Replit gratuit, les processus peuvent être stoppés après un certain temps d'inactivité. Soit active l'option "Always On" (si disponible), soit utilise un service de ping externe (UptimeRobot) pour garder le processus actif.
- Si le bot manque de permissions (MANAGE_CHANNELS) il écrira un avertissement dans les logs et ne pourra pas renommer les salons.

Sécurité
- Ne jamais stocker le token dans le code source. Utilise toujours les variables d'environnement.
- Si tu suspectes que ton token a fuité, révoque-le immédiatement depuis le Developer Portal et recrée-en un nouveau.

Debug rapide
- Si le bot ne démarre pas, vérifie :
  - présence d'une variable `TOKEN` dans les Secrets
  - que `node` et les dépendances sont installées (`npm install`)
  - logs d'erreur dans la console Replit

Support
Si tu veux, je peux ajouter un script d'installation automatique dans le projet (`replit_setup.sh`) ou une commande `+health` qui renvoie l'état actuel des channels de stats. Dis-moi ce que tu préfères.
