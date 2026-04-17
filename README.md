# 🎬 Netflix Clone - Système d'Authentification Complet (React + Node.js + PostgreSQL)

Ce projet implémente un système d'authentification robuste avec une architecture Full Stack (React côté frontend, Node.js/Express côté backend, et PostgreSQL pour la base de données). Ce projet est conçu pour être propre, sécurisé, et facilement intégrable.

## 📁 Structure du Projet

```text
netflix/
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js (Configuration PostgreSQL)
│   │   ├── controllers/
│   │   │   ├── authController.js (Logique d'inscription/connexion)
│   │   │   └── userController.js (Logique du profil)
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js (Vérification du token JWT)
│   │   │   └── roleMiddleware.js (Vérification du rôle, bonus)
│   │   ├── models/
│   │   │   └── userModel.js (Requêtes SQL liées à l'utilisateur)
│   │   ├── routes/
│   │   │   ├── authRoutes.js (Routes publiques /api/auth)
│   │   │   └── userRoutes.js (Routes protégées /api/users)
│   │   └── server.js (Point d'entrée principal)
│
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx (Configuration du router React)
│   │   ├── main.jsx (Point d'entrée React)
│   │   ├── index.css (Styles globaux UI type Netflix)
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx (Composant de route privée)
│   │   ├── context/
│   │   │   └── AuthContext.jsx (Gestion de l'état d'authentification)
│   │   ├── pages/
│   │   │   ├── Login.jsx (Page de connexion)
│   │   │   ├── Register.jsx (Page d'inscription)
│   │   │   └── Profile.jsx (Page de profil)
│   │   └── utils/
│   │       └── api.js (Configuration Axios avec intercepteurs JWT)
│
└── database.sql (Script SQL pour créer la table)
```

## 🚀 Lancement du Projet

### 1. Base de données (PostgreSQL)
- Lancez PostgreSQL.
- Créez une base de données nommée `netflix_clone` (par défaut).
- Exécutez le script SQL fourni dans `database.sql` pour créer la table `users`.

### 2. Démarrer le Backend
Ouvrez un terminal dans le dossier `backend` :
```bash
cd backend
npm install
npm run dev
```
Le serveur Backend sera lancé sur `http://localhost:5000`.

### 3. Démarrer le Frontend
Ouvrez un nouveau terminal dans le dossier `frontend` :
```bash
cd frontend
npm install
npm run dev
```
L'application React sera accessible sur l'URL fournie par Vite (ex: `http://localhost:5173`).

---

## 🔒 Sécurité & Fonctionnalités Implémentées
- **Hachage de mots de passe** : `bcrypt`.
- **Tokens JWT** : Génération de tokens signés stockés localement et envoyés via Headers (`Bearer`).
- **Validation Backend** : `express-validator` pour requêtes sûres.
- **Validation Frontend** : Feedback visuel propre pour les formulaires.
- **Protection des Routes React** : Redirection stricte via le context global.

---

## 💻 Exemples de Requêtes API Postman

### POST /api/auth/register
```json
{
  "nom": "John Doe",
  "email": "john.doe@example.com",
  "mot_de_passe": "secret123",
  "role": "user"
}
```

### POST /api/auth/login
```json
{
  "email": "john.doe@example.com",
  "mot_de_passe": "secret123"
}
```

### GET /api/users/profile
Nécessite le header: `Authorization: Bearer <votre_token_jwt>`
```json
{
  "user": {
    "id": 1,
    "nom": "John Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "created_at": "..."
  }
}
```
