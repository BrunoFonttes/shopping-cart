FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts

ADD . .

RUN npm run build



FROM node:18 as app

WORKDIR /app

COPY --from=build /app/build ./

COPY --from=build /app/package*.json ./

RUN npm install --ignore-scripts --omit=dev

EXPOSE 3000

CMD [ "npm", "run", "prod" ]


