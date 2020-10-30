FROM node:13.8.0-alpine
WORKDIR /app
COPY . /app

WORKDIR /app/nike-client
RUN npm install
RUN npm run build

WORKDIR /app
RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
