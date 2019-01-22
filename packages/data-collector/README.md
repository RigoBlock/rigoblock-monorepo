# Data Collector

A utility package to gather and save an overview and pricing information about the top traded tokens on Ethereum.

## Services

### Bull

Bull is a package that allows us to create queues of repeatable jobs, configurated using a cron expression. Our package is set up to have one queue for each different task. Tasks can be found in the folder of the same name, while queues are listed in `src/config.ts`.
To add a new queue, simply add it to the `config.ts` file following the template we used.
To add a new task, write an async function that accepts a `job` parameter and returns a promise.

### Arena

Arena is an interactive UI dashboard for Bull and Bee Queue. It allows us to monitor the status of jobs, see the cause of failure in case they failed and also remove or rerun jobs.

## Setup

Build the docker image (from the monorepo root).

    docker-compose -f ./packages/data-collector/docker-compose.prod.yml build --build-arg NPM_KEY=<insert npm key> bull

## Run the whole stack (from the monorepo root).

```sh
docker-compose -f ./packages/stats/docker-compose.prod.yml up
```

## Security and Authorizations

The [env file](https://github.com/RigoBlock/rigoblock-monorepo/blob/master/packages/data-collector/env.couchdb) contains the username and password to access CouchDB. This is where we set the password for the database. The password stored in this file must be HASHED, however its non-hashed version will be the one used by the CouchDB client and when accessing `localhost:5984/_utils`.

> CouchDB requires the hashed password specified in the env.couchdb file.
>
> Any other client including the web UI requires the password in clear sent through the REST endpoint

We have updated the index of the file with the following command:

    git update-index --skip-worktree env-couchdb

This way the file is stored on git, but any changes to the local file will not be tracked by git. However, if we update the file on master, and try to pull the changes while having local changes to it, git will show a conflict and prompt for resolution.

### Permissions

The databases are read-only for non-admins, thanks to the validation function in [initDatabase.ts](https://github.com/RigoBlock/rigoblock-monorepo/blob/master/packages/data-collector/src/initDatabase.ts). This file creates the databases if they do not exist, creates an index and sets the validation function.

In case we need to update the validation function on any of the DBs on staging, we can execute the file like this:

```javascript
COUCHDB_HOST=nameofthehost COUCHDB_PORT=portnumber COUCHDB_PASSWORD=password node dist/initDatabase.js
```

## Tasks

-   [fetchInfo](docs/tasks/fetch_info.md)
-   [fetchNews](docs/tasks/fetch_news.md)
