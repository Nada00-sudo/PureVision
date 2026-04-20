# STEP 1 — Build React app
FROM node:20 AS build

WORKDIR /app

# copier package.json d'abord (optimisation cache)
COPY package*.json ./

# Important: Vite 8 dépend de "rolldown" qui utilise des optionalDependencies
# pour récupérer un binding natif par plateforme. Dans certains contextes Docker,
# `npm install` peut "oublier" ces optional deps; `npm ci --include=optional`
# est plus déterministe.
RUN npm ci --include=optional --no-audit --fund=false

# copier le reste du projet
COPY . .

# build React (Vite → dist/)
RUN npm run build


# STEP 2 — Nginx pour servir le frontend
FROM nginx:alpine

# supprimer config par défaut
RUN rm -rf /usr/share/nginx/html/*

# copier config nginx custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copier build dans nginx
COPY --from=build /app/dist /usr/share/nginx/html

# exposer port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]