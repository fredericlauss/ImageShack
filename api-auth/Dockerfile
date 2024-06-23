FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production

COPY . .

CMD [ "npm", "start" ]