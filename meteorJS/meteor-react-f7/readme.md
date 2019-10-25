# Meteor + React + Framework7 Integration Guide

This is project is both a **starter** template and an **integration guide**, for [Meteor-React](https://guide.meteor.com/) with [Framework7-React](https://framework7.io/react/).

In addition it incldues a preconfigured setup of ESLint and Prettier, for code quality and code style enforcement in your codebase.

- **Meteor** is a full-stack framework for building web and hybrid mobile (web-based) apps, which supports **React** as its templating solution for front-end. On top of that you can use

- **Framework7** to give your mobile apps a close to native look and feel.

## How to use this project

You can directly clone the project and start working on it.

```
git clone https://github.com/killerchip/meteor-react-f7.git
```

```
meteor run
meteor run android-device
meteor run ios-device
```

## Manual integration and explanation

If you want to manually build this project, here are the steps taken:

### Create a meteor project using CLI

```
meteor create --react <my-project>
```

### Add necessary Headers in the project

_client/main.hml_

```
<head>
  <title>meteor-react-f7</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover">
</head>
```

You need to add the `viewport` meta tag to make the app responsive and display correctly in mobile device.

### Adding ESLint and Prettier

**ESLint** will suggest best practices for Javascript, Meteor, and React.

**Prettier** will suggest a unified code style (display) to make it easier to read.

**Husky** will enforce those rules upon commiting changes.

For more details you can refer to the following Posts:

- [ESlint configuration on Meteor-React project](http://killerchip.net/2018/08/20/2018-08-20-meteor-react-eslint/)
- [Setting up Prettier along ESlint](http://killerchip.net/2018/09/22/2018-09-22-prettier-config/)

An overview of steps are the following:

Install the necessary packages:

```
meteor npm install --save-dev babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-meteor eslint-plugin-react eslint-plugin-jsx-a11y eslint-import-resolver-meteor eslint @meteorjs/eslint-config-meteor


meteor npm install --save-dev --save-exact prettier

meteor npm install --save-dev eslint-plugin-prettier eslint-config-prettier
```

Then make sure the following configuration files are put in your project's root directory. They are a suggested configuration for those modules.

- [.eslintrc.json](./eslintrc.json)
- [.prettierignore](.prettierignore)
- [.prettierrc.json](.prettierrc.json)

Finally put the following scripts in `package.json`, to be able to use these tools from command-line.

```
scripts: {
    "lint": "node_modules/.bin/eslint . --ext .js,.jsx",
    "pretty": "node_modules/.bin/prettier './**/*.{js,jsx,scss}'",
    "pretty:write": "node_modules/.bin/prettier --write './**/*.{js,jsx,scss}'",
}
```

Add the following in the `pacakge.json` file to allow automatically prettier fixes when you commit your code.

```
  "husky": {
    "hooks": {
      "pre-commit": "precise-commits --no-verify"
    }
```

My personal preference is to do manual edits with my VSCode plugin.

[https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Framework7 Integration

Install the following F7 packages.

```
meteor npm install framework7 framework7-react
```

According to [documentation](https://framework7.io/react/init-app.html), you must initialize Framework7.

_client/main.jsx_

```
import Framework7 from 'framework7';
import Framework7React from 'framework7-react';

Framework7.use(Framework7React);
```

Also the Framework7 CSS must be imported. In case of Meteor app the easiest way to do it is just to import it in a file, and the Meteor builder will bundle it in the `app.html` file.

_client/main.jsx_

```
import '../node_modules/framework7/css/framework7.min.css';
```

Now you need to initialize the `App` component of framework7. So rename the default `App` React component to something else (e.g. `Root`).

_client/main.jsx_

```
import Root from '/imports/ui/Root.jsx';

Meteor.startup(() => {
    render(<Root />, document.getElementById('react-target'));
});
```

And in the newly renamed `Root.jsx` file, initialize the framework7 App component.

_imports/ui/Root.jsx_

```
import React from 'react';
import Hello from './Hello.jsx';
import Info from './Info.jsx';

/* globals App, View, Page, Navbar */

const Root = () => (
    <App
        params={{
            name: 'Meteor React F7',
            id: 'net.killerchip.meteor-react-f7',
            statusbar: {
                androidBackgroundColor: '#FFF',
                iosBackgroundColor: '#FFF'
            }
        }}
    >
        <View main>
            <Page>
                <Navbar title="MeteorJS - React - F7" />
                <div>
                    <h1>Welcome to Meteor!</h1>
                    <Hello />
                    <Info />
                </div>
            </Page>
        </View>
    </App>
);

export default Root;
```

Framework7's components are included by Meteor's builder in the bundle itself. So you can't (actually you should not) `import` the framework7 react components (e.g. `App`, `View`, etc.). But because ESLint will complain, you can use the `/* globals */` directive to declare them. Consider them as a replacement for `import` statements for these components.

Finally a `cordova-plugin-statusbar` is added, and the correspoing `App` options to set its background color.

_imports/ui/Root.jsx_

```
  statusbar: {
      androidBackgroundColor: '#FFF',
      iosBackgroundColor: '#FFF'
  }
```
