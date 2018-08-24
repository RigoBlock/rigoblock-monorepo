FROM debian:stretch as builder

WORKDIR /src

RUN apt-get update \
    && apt-get install wget sed build-essential git python -y

ARG NPM_KEY
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.10.0
ENV NPM_KEY ${NPM_KEY}

# install nvm
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.7/install.sh | bash

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN mkdir -p /src/packages/stats
COPY packages/stats ./packages/stats
COPY yarn.lock .
COPY tsconfig.json .
# TODO: use .nvmrc
# COPY .nvmrc /src/.nvmrc
WORKDIR /src/packages/stats

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

# RUNTIME
FROM alpine:3.8

RUN apk add bash
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | /bin/bash

COPY --from=builder /src/dist .
COPY --from=builder /src/node_modules .

CMD ["yarn", "start"]
