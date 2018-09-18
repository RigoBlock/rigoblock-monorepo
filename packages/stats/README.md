# Rigoblock Stats
TODO

## Services

### Traefik

Træfik is a modern HTTP reverse proxy and load balancer that makes deploying microservices easy.

### Chronograf
Chronograf is an open-source web application written in Go and React.js that provides the tools to visualize your monitoring data and easily create alerting and automation rules.

### Arena
Rigoblock:
https://arena.stats.endpoint.network/

username: admin

## Setup

### Environment

Add `rbstats` system user:

```
adduser rbstats
```

Clone the repo into `rbstats` home:

  su rbstats
  cd ~
  clone https://github.com/RigoBlock/rigoblock-monorepo

Copy help script into the home directory:

  cp rigoblock-monorepo/packages/stats/scripts/* ./
  chmod u+x *.sh

Create data diretory:

  mkdir data

Create `acme.json` file. This file contains private keys. Protect it.

  touch rigoblock-monorepo/packages/stats/config/traefik/acme.json
  chmod 600 rigoblock-monorepo/packages/stats/conf/traefik/acme.json

### Build docker image (from within rigoblock-monorepo root)
`docker-compose -f ./packages/stats/docker-compose.prod.yml build --build-arg NPM_KEY=<insert npm key> bull`
## Run the whole stack
### Run the whole stack
`docker-compose -f ./packages/stats/docker-compose.prod.yml up`