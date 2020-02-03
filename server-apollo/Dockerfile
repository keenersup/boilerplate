FROM node:lts-stretch as base
ENV LC_ALL=C.UTF-8
ENV SERVER_HOST=http://localhost
ENV SERVER_PORT=6060
ENV GRAPHQL_PATH=graphql
ENV SECRET_KEY=secret_key
ENV ACCESSTOKEN_EXPIRED='30m'
ENV REFRESH_SECRET_KEY=refresh_secret_key
ENV REFRESHTOKEN_EXPIRED='1d'

WORKDIR ./app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm config list
USER root
RUN npm ci \
    && npm cache clean --force
COPY . .
EXPOSE ${SERVER_PORT}

############################
#####   development    #####
############################
FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development\
    && npm i -g ts-node-dev typescript \
    && npm cache clean --force
USER node
CMD ["ts-node-dev","--transpileOnly","--no-notify","src"]


############################
#####    production    #####
############################
FROM dev as test
USER root
COPY . .
RUN npm audit

FROM test as pre-prod
RUN tsc -p tsconfig.prod.json
RUN rm -rf ./tests && rm -rf ./node_modules

FROM base as prod
ENV NODE_ENV=production
COPY --from=pre-prod /app /app
RUN rm -rf ./src
USER node
CMD ["node","dist/index.js"]
