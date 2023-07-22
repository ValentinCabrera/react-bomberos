FROM node:14.17.5

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["sh", "-c", "ulimit -n 8192 && npm start"]
