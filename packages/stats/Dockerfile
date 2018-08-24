FROM alpine:3.8

RUN apk add bash
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | /bin/bash

WORKDIR /root

RUN mkdir -p /root/packages/stats

COPY packages/stats ./packages/stats
COPY yarn.lock .
COPY tsconfig.json .

COPY --from=builder /src/packages/stats/dist .
COPY --from=builder /src/packages/stats/node_modules .
COPY --from=builder /src/packages/stats/package.json .

WORKDIR /root/packages/stats

RUN nvm install && nvm use
RUN npm i -g yarn
RUN yarn --pure-lockfile
RUN yarn build

CMD ["yarn", "start"]
