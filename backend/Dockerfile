# image node
FROM node:18

# dossier de travail
WORKDIR /app

# copier package
COPY package*.json ./

# installer dépendances
RUN npm install

# copier code
COPY . .

# exposer port
EXPOSE 5000

# lancer serveur
CMD ["node", "index.js"]