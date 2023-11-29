FROM node:18.18.2-alpine3.18

WORKDIR /app
COPY package.json package.json
RUN npm i

COPY src src
COPY public public
COPY next-env.d.ts next-env.d.ts
COPY next.config.js next.config.js
COPY tsconfig.json tsconfig.json

EXPOSE 3000
CMD npm run dev
