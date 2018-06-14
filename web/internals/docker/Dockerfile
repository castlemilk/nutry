FROM node:6.14.2 as build-deps
# FROM node:6.14.2-slim
ARG ELASTICSEARCH_PROXY_HOST
ARG ELASTICSEARCH_PROXY_PORT
ARG ELASTICSEARCH_PROXY_MODE
ARG ELASTICSEARCH_PROXY_PREFIX
ARG FIREBASE_ENDPOINT
ARG FIREBASE_DB_VERSION

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
WORKDIR /reactapp

COPY --from=build-deps /reactapp/build ./build
COPY --from=build-deps /reactapp/server ./server
COPY --from=build-deps /reactapp/node_modules/ ./node_modules/
COPY --from=build-deps /reactapp/package.json ./package.json
EXPOSE 3000

CMD ["npm", "run", "start:basic"]
