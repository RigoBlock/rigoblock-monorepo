# Rigoblock Stats
TODO

## Build docker image (from within rigoblock-monorepo root)
`docker-compose -f ./packages/stats/docker-compose.prod.yml build --build-arg NPM_KEY=<insert npm key> bull`

## Run the whole stack
`docker-compose -f ./packages/stats/docker-compose.prod.yml up`
