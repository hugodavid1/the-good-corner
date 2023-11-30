FROM node:18.18.2-alpine3.18

WORKDIR /app
COPY package.json package.json
RUN npm i

COPY tsconfig.json tsconfig.json
#COPY .eslintrc.json .eslintrc.json
COPY next.config.js next.config.js
COPY postcss.config.js postcss.config.js
COPY tailwind.config.js tailwind.config.js
COPY public public
COPY src src
RUN npm run build

CMD npm run start
