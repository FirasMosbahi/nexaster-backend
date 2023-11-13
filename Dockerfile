FROM node:20-bookworm-slim

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .
ENV PORT=3000
ENV DB_HOST=mongodb+srv://nexaster-main-db-03de9210a7c:SJcWmcAzDsyNtKfR87NEXUdkURNbtt@prod-us-central1-1.lfuy1.mongodb.net/nexaster-main-db-03de9210a7c
ENV JWT_SECRET=rgredgrh
ENV JWT_EXPIRATION_TIME=24h
ENV BCRYPT_ROUNDS=10

EXPOSE 3000

CMD ["npm", "start"]
