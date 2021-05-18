# zerokara-react-ts

An opinionated boilerplate for a TypeScript React web application using `redux-saga`, composed of various libraries that I usually use and some utilities codes.

## Quick Start

1. Clone this project.

``` bash
git clone https://github.com/happyhang/zerokara-react-ts.git FolderNameToCloneTo
```

2. Navigate to the project

``` bash
cd ProjectName
```

3. Reinitialise git history

``` bash
rm -rf .git
git init
```

4. Replace Placeholder

Using your preferred tool, do a global project replace for text `zerokara-react` to your project name.

5. Install dependencies.

``` bash
yarn install
```

6. Run webpack server for development.

``` bash
yarn start
```

The server will be hosted in `http://localhost:8080`.

7. Build source for deployment.

``` bash
yarn build
```

The built output will be in `/dist/` folder.

More documentations can be found in the `docs` folder. They are still quite incomplete by now but hopefully it can still help you with exploring stuffs out.

## Command List

Use `yarn [command]` to run.

`start` - Start development webpack server.

`build` - Build source.

`analyse` - Analyse production build (using webpack analyser)

## Components

This boilerplate will have the following dependencies specified in `package.json`.

### Core

- React 17.0
  - prop-types
- Redux
  - react-redux
- Webpack 5
  - webpack-dev-server 4.0 beta 3
  - webpack-cli
  - ts-loader (TypeScript 4.2)
    - ts-nameof
  - css-loader
  - sass-loader
  - sass-resources-loader
  - postcss-loader
    - postcss-import
    - autoprefixer
    - postcss-preset-env
    - cssnano
  - eslint-webpack-plugin
  - clean-webpack-plugin
  - copy-webpack-plugin
  - html-webpack-plugin
  - mini-css-extract-plugin
  - terser-webpack-plugin
  - dotenv-webpack

### Redux

- @reduxjs/toolkit
- redux-saga
- redux-logger
- redux-persist

### UI & Styling

Utilizing CSS Module to separate CSS classes per component. [Read this](https://github.com/gajus/babel-plugin-react-css-modules) for more details.

- Bootstrap 5.0
- node-sass
- clsx
- react-popper
  - @popperjs/core

### SPA Routing

- react-router 5.2
  - connected-react-router
  - history (Must be version 4 for browser router to work)
  - react-router-dom

### Form

- Formik
- big.js

### Dynamic Loading

Utilizing dynamic modules to defer the setup of reducers and sagas of components (needed if you want to code split sagas and reducers). [Read this](https://github.com/microsoft/redux-dynamic-modules) for more details.

To set up a page using this, you can refer to how `homePage` is declared and organised.

- redux-dynamic-modules
  - redux-dynamic-modules-saga

### Utilities Libraries

- axios
- jquery (Needed by bootstrap)
- lodash
- immer
- luxon
- query-string
- js-cookie
- react-helmet
- react-loadable
- react-to-print

### Development & Optimization

- eslint
  - eslint-config-airbnb
  - eslint-import-resolver-alias
  - eslint-plugin-import
  - eslint-plugin-jsx-a11y
  - eslint-plugin-react
  - eslint-plugin-react-hooks
- redux-devtools-extension
- webpack-bundle-analyzer

## Configuration & Environment variables

There are 3 predefined environments in this boilerplate: `development`, `staging` and `production`. You can add additional environment(s) if you want to.

You can set up environment configurations (that will be available throughout your codebase via `process.env.VAR_NAME`) in `/config/env.[environment].js` file.

## Contributing

This boilerplate is more for my personal use but any issue or pull request is welcomed too!
