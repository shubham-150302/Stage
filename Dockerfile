# First Stage : to install and build dependences
FROM node:21 AS builder
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Second Stage : Setup command to run your app using lightweight node image
FROM node:21-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
CMD ["npm", "run", "start"]