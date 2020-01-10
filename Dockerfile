FROM node:alpine

WORKDIR /usr/nodeapp

COPY package*.json ./

RUN npm install pm2 -g

RUN npm install

EXPOSE 3003

COPY . .

RUN npm run build

CMD [ "pm2-runtime", "./pm2.config.js"]
