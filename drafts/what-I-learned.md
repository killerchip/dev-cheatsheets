# What NEW I learned today

... on my software development adventures

## Sept 20 2019

**Node**: [How to create HTML-template based PDFs ;-)](https://medium.com/@rodolfo.marcos07/how-to-generate-beautifull-pdf-using-nodejs-puppeteers-and-handlebars-7e3a1ef7cfb7)

**Javascript**: How to initialize `eslint` for a specific project:

```
./node_modules/.bin/eslint --init
```

## Sept 17 2019

**React**: How to create HOCs.

## Sept 16 2019

**Javascript**: How to extend Javascript errors to make your own custom ones:
[https://javascript.info/custom-errors](https://javascript.info/custom-errors)

## Sept 14 2019

**Typescript ts-node**: Easily setup a local typescript project using:

```
yarn init
yarn add typescript
yarn add ts-node
```

**Typescript**: How to `import` JSON files directly into project:
Add this to `tsconfig.json`:

```
{
    "compilerOptions": {
      "resolveJsonModule": true,
      "esModuleInterop": true
    }
}
```

and then you can do: `import myVar from '../myJson.json'`

**Typescript:** How to import node stuff from node environment without linter complaining:

```
yarn add @types/node --dev
```

And then you can,... e.g:

```
import { existsSync, mkdirSync, writeFileSync } from "fs";
```

## Sept 13 2019

React: Redux & Async functions - [draft notes](https://github.com/killerchip/react-native-cheatsheet/blob/master/drafts/redux-asyc/redux-asyn-draft.md)

## Sept 9 2019

React cheat:

- Single form handler ;-)
  When you have many 'inputs' in a form, instead of creating multiple handlers you can create a handle factory.

```
state = {
 name: '',
 surname: '',
 address: '',
 // ...
}

getHandler = key => val => this.setState([key]: val);

...

<TextInput onChangeText={this.getHandler('name')} />
<TextInput onChangeText={this.getHandler('surname')} />
<TextInput onChangeText={this.getHandler('address')} />
...
```

- `console.error('this is an error');` displays a full page error and stops execution.
- `console.warn('...');` displays a 'warning'. They don't appear in production mode.
- `npm -g install react-devtools` for analyzing react component layout via Expo.

- `react-navigation`: You can pass in your navigator some props that will be passed down to any screens. eg. `<AppNav screenProps={/* my current state*/} />`. It's good for prototyping, or a short-circuit solution in passing-down state, but not for production/large applications.

- Nice RN Icons package: [https://github.com/oblador/react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

## Sept 8 2019

React cheat: Validating simple forms:

- Validate form before submitting
- Validate form after changing single input value
  - this.setState() can take a callback as the second argument
  - componentDidUpdate()

## Sept 5 2019

- How to use the RN Expo Client - CLI.

## August 2019

- How to spy and stub with Sinon

## July 25

**Mocha/chai**

- You can prescribe your tests and leave in 'pending' state, if you do not define yet a test function ;-)

## July 11-19

**React Native Typescript**

- Continue to build a pet project using Typescript with RN, Redux and React-Redux

## July 7-10

**React Native Typescript**

- How to setup Redux using Typescript

## July 5-6

**React Native**

- How to setup `React-Native Typescript`
- Setup `eslint` and `prettier` for `React-Native Typescript`

## July 1-2, 2019

**Angular**

Refreshed memory on

- HTTP Interceptors
- How to install Bootstrap with Angular,
- Base Bootstrap responsive Layout,

Learned How to install and the basics of [material.angular.io](https://material.angular.io/)

## June 28, 2019

**Angular** Refreshed memory on RxJS and Observables

- Smart use: [json2ts](http://json2ts.com/) automatically generates TS interface from JSON sample data
- Angular version update instructions: [update.angular.io](https://update.angular.io/)

## June 24-27, 2019

**Angular** Refreshed memory on

- Template-driven forms
- Reactive Forms

## June 21, 2019

**Angular** Refreshed memory on

- Components,
- Directives,
- Pipes,
- ngFor,
- ngIf with `else` and `ng-template`

## June 19-20, 2019

**Angular** Refreshed memory on

- Creating services
- Using the HttpClient

- Learned how to perform install `codelyzer`, `prettier`, `husky` etc for linting and code formatting.

## June 18, 2019

**Angular** Refreshed memory on

- how to install Angular `npm install typescript -g && npm install -g @angular/cli`
- how to start a project `ng new <project-name>`
- how to run the project `ng serve`
- what NgModules are
- how to create and use `@Injectables`

**nvm** How to [switch and manage Node versions](https://davidwalsh.name/nvm) with NVM.

## June 13, 2019

**Sequelize** How to use `.destroy` function of a model

## June 7, 2019

**MariaDB-MySQL** How to use [SET](https://mariadb.com/kb/en/library/set/) for setting script variables.

## June 3, 2019

**React-Native** How to share info via other apps using [react-native-share](https://github.com/react-native-community/react-native-share)

## May 28, 2019

**Sequelize** How to use [Ordering](http://docs.sequelizejs.com/manual/querying.html#ordering) when using `include` that performs JOINs.

## May 27, 2019

**Sequelize** How to uplift `where` conditions into top level, when you are using `include` to perform JOINs.
[http://docs.sequelizejs.com/manual/models-usage.html#eager-loading](http://docs.sequelizejs.com/manual/models-usage.html#eager-loading)

## May 23, 2019

- **ES6** [Conditionally adding props to object](https://medium.freecodecamp.org/how-to-conditionally-build-an-object-in-javascript-with-es6-e2c49022c448)
- **React-Native** [How to integrate](https://github.com/jhen0409/react-native-debugger/blob/master/docs/redux-devtools-integration.md) redux-debugging tools in React Native Debugger

## May 22, 2019

**Sequelize**: How to perform associations, and 'step' JOINs on non-associated tables (with `include`). How to flatten the results with `raw: true` parameter.

## May 3 - 19, 2019

**React-Native** `Modals` and `Dialog` popup handling.

## May 2, 2019

- **React-Native**: How to use [react-native-config](https://github.com/luggit/react-native-config) to setup and consume environmental variables in your RN app.

## April 17, 2019

- First contact with [`Docker`](https://www.docker.com/) on my Mac.
- First contact qith [Sequalize](http://docs.sequelizejs.com/). A library for accessing SQL databases via NodeJS apps.

## April 15, 2019

- Refreshed my knowledge and gained some best-practices on `redux`, via the edx.org course: `React Router and Redux`.

## April 1, 2019

- Started an [EdX.org](https://www.edx.org/) course: `React Router and Redux`.
- Learned how to use `react-router`, for the web-browser.

## March 22, 2019

- Refreshed by knowledged on `react-redux`.

## March 20, 2019

- **React-Native**: How to Setup [React-Navigation](https://reactnavigation.org/en/) routes hierarchy tree.

## March 18, 2019

- **React-Native**: How to Setup [React-Navigation](https://reactnavigation.org/en/) **V3.x**

## March 16, 2019

** React-Native**: How to perform Android App signing and setup `gradle.properties`.
