ARG NODE_VER="22"

FROM node:${NODE_VER}

WORKDIR /app

COPY package*.json yarn.lock .yarnrc.yml server.js ./
COPY .yarn .yarn

RUN yarn install

EXPOSE 3000

CMD [ "node", "server.js" ]