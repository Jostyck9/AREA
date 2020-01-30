FROM node:latest
WORKDIR /app
EXPOSE 8080

COPY ./package.json ./
RUN yarn install

COPY . .

CMD ["yarn", "start"]