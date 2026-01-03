FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY dist ./dist

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server/node-build.mjs"]
