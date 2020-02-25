FROM node:latest
WORKDIR /app
EXPOSE 8081

COPY ./package.json ./
RUN yarn install

COPY . .

CMD ["yarn", "start"]