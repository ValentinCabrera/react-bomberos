FROM node:14

WORKDIR /app

COPY . /app

EXPOSE 3000

RUN npm run build

CMD ["npm",  "start"]

