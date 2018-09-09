# Rigoblock Stats

## Tools

### Chronograf

Chronograf is an open-source web application written in Go and React.js that provides the tools to visualize your monitoring data and easily create alerting and automation rules: https://github.com/influxdata/chronograf

Rigoblock:

http://dev-04.endpoint.network:8888/

### Arena

Rigoblock:

http://dev-04.endpoint.network:4567/


## Setup

### Build docker image (from within rigoblock-monorepo root)
`docker-compose -f ./packages/stats/docker-compose.prod.yml build --build-arg NPM_KEY=<insert npm key> bull`

### Run the whole stack
`docker-compose -f ./packages/stats/docker-compose.prod.yml up`
