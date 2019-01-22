## RigoBlock Contribution Guide

This document will help you to start contributing to RigoBlock projects.

### Getting started

1.  Fork `RigoBlock/rigoblock-monorepo`
2.  Clone your fork
3.  Follow the [installation & build steps](https://github.com/RigoBlock/rigoblock-monorepo#installation) in the repo's top-level README.
5.  Open a PR against the `master` branch and describe the change you are intending to undertake in the PR description. Also add the `in progress` label.

Before submitting the PR for review, make sure:

-   It passes our linter checks (`yarn lint`)
-   It doesn't break any unit test (`yarn test:unit`)

Branch names should be prefixed with `fix`, `feature` or `refactor`.

-   e.g `feature/redux-implementation`

#### Linter

We use [Eslint](https://github.com/eslint/eslint) with [Prettier](https://github.com/prettier/prettier) to keep our code-style consistent. We follow the [JavaScript Standard Style](https://standardjs.com/)

Use `yarn:lint` from the root folder to lint the entire monorepo, or run the same command within one of the packages to lint a single one.

We have also enabled git hooks using [Husky](https://github.com/typicode/husky) and [Lint-staged](https://github.com/okonet/lint-staged#readme) to enable automatic pre-commit linting.
