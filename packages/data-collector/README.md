# Rigoblock Data Collector

## Services

### Bull

Bull is a package that allows us to create queues of repeatable jobs, configurated using a cron expression. Our package is set up to have one queue for each different task. Tasks can be found in the folder of the same name, while queues are listed in `src/config.ts`.
To add a new queue, simply add it to the `config.ts` file following the template we used.
To add a new task, write an async function that accepts a `job` parameter and returns a promise.

### Arena

Arena is an interactive UI dashboard for Bull and Bee Queue. It allows us to monitor the status of jobs, see the cause of failure in case they failed and also remove or rerun jobs.

## Setup

Build the docker image (from the monorepo root).

```
docker-compose -f ./packages/data-collector/docker-compose.prod.yml build --build-arg NPM_KEY=<insert npm key> bull
```

## Run the whole stack (from the monorepo root).

```sh
docker-compose -f ./packages/stats/docker-compose.prod.yml up
```

## Tasks

- [fetchInfo](src/tasks/fetchInfo/README.md)
- [fetchNews](src/tasks/fetchNews/README.md)
