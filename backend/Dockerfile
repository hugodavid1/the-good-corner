# VÉRIFIER VERSION NODE
FROM node:18.18.2-alpine3.18

WORKDIR /app
COPY package.json package.json
RUN npm i

COPY src src
#a supprimer
COPY tsconfig.json tsconfig.json

CMD npm run start

#docker build -t backend .
#docker run -p 5000:5000 backend
