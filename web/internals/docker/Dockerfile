FROM node:6.14.2 as build-deps
# FROM node:6.14.2-slim
ENV ELASTICSEARCH_PROXY_MODE http
ENV ELASTICSEARCH_PROXY_HOST localhost
ENV ELASTICSEARCH_PROXY_PORT 3000
ENV ELASTICSEARCH_PROXY_PREFIX ""
ENV FIREBASE_ENDPOINT ""
ENV FIREBASE_DB_VERSION "v1"

# RUN apt-get update && apt-get install -y libpng12-0 pngquant optipng libpng-dev

# WORKDIR /reactapp
# create docker layer with npm packages
# ADD .gitignore .gitignore


# ADD . .
# RUN npm run clean:all && npm run test && npm run build

# add only minimal requirements
# FROM node:6.14.2-slim
WORKDIR /reactapp
ADD package.json yarn.lock ./
RUN npm install
RUN npm install cross-env
COPY build build
COPY server server
COPY internals internals
ADD package.json package.json

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
