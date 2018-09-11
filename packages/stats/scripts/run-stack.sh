#!/bin/bash

export AUTH_DURATION=1h
# https://docs.influxdata.com/chronograf/v1.6/administration/managing-security/#configuring-github-authentication
export TOKEN_SECRET=
export GH_CLIENT_ID=
export GH_CLIENT_SECRET=
export GH_ORGS=RigoBlock
export NPM_KEY=

#e.g.: traefik.stats.endpoint.network
export TRAEFIK_URI= 

# Generate with:
# htpasswd -n admin
# Remember to escape $ characters with $
export TRAEFIK_CREDENTIALS=admin:CHANGE_ME

#e.g.: chronograf.stats.endpoint.network
export CHRONOGRAF_URI=
 
# e.g.: arena.stats.endpoint.network 
export ARENA_URI= 

# Generate with:
# htpasswd -n admin
# Remember to escape $ characters with $

export ARENA_CREDENTIALS=admin:CHANGE_ME 

cd rigoblock-monorepo && docker-compose -f packages/stats/docker-compose.prod.yml up
