FROM node:6.14.2 as build-deps
# FROM node:6.14.2-slim
ARG ELASTICSEARCH_PROXY_HOST
ARG ELASTICSEARCH_PROXY_PORT
ARG ELASTICSEARCH_PROXY_MODE
ARG ELASTICSEARCH_PROXY_PREFIX
ARG FIREBASE_ENDPOINT
ARG FIREBASE_DB_VERSION
# FROM node:6.14.2-slim
ENV ELASTICSEARCH_PROXY_HOST ${ELASTICSEARCH_PROXY_HOST:-localhost}
ENV ELASTICSEARCH_PROXY_PORT ${ELASTICSEARCH_PROXY_PORT:-8443}
ENV ELASTICSEARCH_PROXY_MODE ${ELASTICSEARCH_PROXY_MODE:-https}
ENV ELASTICSEARCH_PROXY_PREFIX ${ELASTICSEARCH_PROXY_PREFIX:-/api/search}
ENV FIREBASE_ENDPOINT ${FIREBASE_ENDPOINT:-https://nutry-v1.firebaseio.com}
ENV FIREBASE_DB_VERSION ${FIREBASE_DB_VERSION:-v1}


RUN apt-get update && apt-get install -y libpng12-0 pngquant optipng libpng-dev
# create docker layer with npm packages
WORKDIR /reactapp
ADD package.json yarn.lock ./
RUN npm install

# lint, test and build project
COPY app app
COPY internals internals
COPY server server
COPY .gitignore .gitignore
RUN npm run clean:all && npm run test && npm run build

# add only minimal requirements
FROM node:6.14.2-slim
ENV NODE_ENV production
ENV ELASTICSEARCH_PROXY_HOST ${ELASTICSEARCH_PROXY_HOST:-localhost}
ENV ELASTICSEARCH_PROXY_PORT ${ELASTICSEARCH_PROXY_PORT:-8443}
ENV ELASTICSEARCH_PROXY_MODE ${ELASTICSEARCH_PROXY_MODE:-https}
ENV ELASTICSEARCH_PROXY_PREFIX ${ELASTICSEARCH_PROXY_PREFIX:-/api/search}
ENV FIREBASE_ENDPOINT ${FIREBASE_ENDPOINT:-https://nutry-v1.firebaseio.com}
ENV FIREBASE_DB_VERSION ${FIREBASE_DB_VERSION:-v1}
WORKDIR /reactapp

COPY --from=build-deps /reactapp/build ./build
COPY --from=build-deps /reactapp/server ./server
COPY --from=build-deps /reactapp/node_modules/ ./node_modules/
COPY --from=build-deps /reactapp/package.json ./package.json
EXPOSE 3000

ENTRYPOINT ["npm", "run", "start:basic"]
