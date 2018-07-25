FROM debian:stretch as builder

WORKDIR /src

RUN apt-get update
RUN apt-get install wget sed build-essential git python -y

ARG NPM_KEY
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.10.0
ENV NPM_KEY ${NPM_KEY}

# install nvm
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.7/install.sh | bash

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

COPY packages/dapp /src
COPY yarn.lock .
# TODO: use .nvmrc
# COPY .nvmrc /src/.nvmrc

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install

RUN echo "source ${NVM_DIR}/nvm.sh" > $HOME/.bashrc && \
    source $HOME/.bashrc

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN echo "//registry.npmjs.org/:_authToken=$NPM_KEY" > $HOME/.npmrc

RUN npm i -g yarn
RUN yarn --pure-lockfile
RUN yarn build

# setup nginx on alpine linux, copy dist folder from builder image onto nginx's folder
FROM nginx:stable-alpine

# Set password
RUN apk add --update apache2-utils && \
    htpasswd -b -c /etc/nginx/.htpasswd rigoblock-dev rdev2018_

COPY --from=builder /src/dist /usr/share/nginx/html
COPY packages/dapp/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx-debug", "-g", "daemon off;"]
