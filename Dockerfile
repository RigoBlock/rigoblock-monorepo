FROM debian:stretch

WORKDIR /usr/src

RUN apt-get update
RUN apt-get install wget sed build-essential -y

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.10.0

RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.7/install.sh | bash

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION

RUN echo "source ${NVM_DIR}/nvm.sh" > $HOME/.bashrc && \
    source $HOME/.bashrc

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

COPY . /src
COPY .nvmrc /src/.nvmrc

WORKDIR /src

RUN npm i -g yarn
RUN yarn
RUN yarn build

# second image

FROM jeanblanchard/alpine-glibc

RUN apk update && apk add alpine-sdk curl bzip2

RUN mkdir /opt

RUN curl http://gwan.com/archives/gwan_linux64-bit.tar.bz2 | tar xj -C /opt
RUN mv /opt/gwan_linux64-bit /opt/gwan && \
  rm -rf /opt/gwan/0.0.0.0:8080 && \
  rm -rf /opt/gwan/0.0.0.0:8081_PONG && \
  mkdir -p /opt/gwan/0.0.0.0:80/#0.0.0.0/www

ADD dist /opt/gwan/0.0.0.0:80/#0.0.0.0/www

RUN apk del curl bzip2

EXPOSE 80

CMD /opt/gwan/gwan
