FROM node:lts-stretch as base
ENV LC_ALL=C.UTF-8

ARG REACT_APP_CLIENT_ORIGIN=http://localhost/graphql
ARG REACT_APP_SERVER_HOST=http://localhost
ARG NODE_ENV=development

ENV REACT_APP_SERVER_HOST $REACT_APP_SERVER_HOST
ENV REACT_APP_CLIENT_ORIGIN $REACT_APP_CLIENT_ORIGIN
ENV NODE_ENV $NODE_ENV

WORKDIR /app
COPY package*.json /app/

RUN npm ci \
    && npm cache clean --force
COPY . /app/
CMD [ "npm", "run", "start" ]

############################
#####   development    #####
############################
FROM base as dev
ENV NODE_ENV=development

WORKDIR /app
RUN npm install --only=development

############################
#####    production    #####
############################
FROM base as builder
ENV NODE_ENV=production
RUN npm run build

FROM nginx:alpine as prod
RUN rm -rf /etc/nginx/conf.d
RUN rm -rf /etc/nginx/nginx.conf
COPY  conf /etc/nginx
COPY --from=builder /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]