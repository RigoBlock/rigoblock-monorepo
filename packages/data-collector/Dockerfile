FROM ubuntu:cosmic

WORKDIR /root

RUN apt-get update \
    && apt-get install wget sed build-essential git python -y

RUN apt-get update && apt-get install -yq libgconf-2-4
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /src/*.deb

ARG NPM_KEY
ENV NVM_DIR /usr/local/nvm
ENV NPM_KEY ${NPM_KEY}
RUN echo "//registry.npmjs.org/:_authToken=$NPM_KEY" > $HOME/.npmrc

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

RUN mkdir -p /root/packages/data-collector

COPY packages/data-collector ./packages/data-collector
COPY yarn.lock .

WORKDIR /root/packages/data-collector

RUN npm i -g yarn

RUN yarn --pure-lockfile
RUN yarn build

CMD ["yarn", "start"]
