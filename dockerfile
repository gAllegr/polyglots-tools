### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:10-alpine as builder

# Copy package.json files
COPY package*.json ./

# Set npm configuration
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

# Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN mkdir /ng-app

WORKDIR /ng-app

# Copy project files in ng-app
COPY . .

# Install node_modules
RUN npm install

## Build the angular app in production mode and store the artifacts in dist folder
ARG PROD
RUN if [ "$PROD" = "true" ]; then npm run build:prod ; else npm run build:stage; fi

## Generate documentation
RUN npm run docs

### STAGE 2: Setup ###
FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*.*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/polyglots-tools /usr/share/nginx/html

## From 'builder' stage copy over the docs folder
COPY --from=builder /ng-app/docs /usr/share/nginx/html/docs

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
