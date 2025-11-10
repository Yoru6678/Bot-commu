# Haruka Protect - Security Overview

Ce fichier résume les règles de sécurité de base pour Haruka Protect.

Principes clefs:
- Aucun secret en dur dans le code (utiliser variables d'environnement)
- Vérification hiérarchique stricte avant toute action de modération
- Try/catch et logs sur toutes les opérations sensibles
- Audit automatique au démarrage (voir `src/security/securityAudit.js`)

Pour plus de détails, consulter `docs/SECURITY.md` (à compléter).
