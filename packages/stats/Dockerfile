FROM ubuntu:cosmic

WORKDIR /root

RUN apt-get update \
    && apt-get install wget sed build-essential git python -y

ARG NPM_KEY
ENV NVM_DIR /usr/local/nvm
ENV NPM_KEY ${NPM_KEY}
RUN echo "//registry.npmjs.org/:_authToken=$NPM_KEY" > $HOME/.npmrc

ENV NPM_KEY ${NPM_KEY}

ENV NODE_VERSION 8.10.0

# Install nvm with node and npm
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.7/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN mkdir -p /root/packages/stats

COPY . ./packages/stats
COPY ../../yarn.lock .
COPY ../../tsconfig.json .

WORKDIR /root/packages/stats

RUN npm i -g yarn

RUN yarn --pure-lockfile
RUN yarn build

CMD ["yarn", "start"]
