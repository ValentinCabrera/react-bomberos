FROM node:14.17.5-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]
