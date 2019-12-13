# React-Native Typescript with ESLint and Prettier

![](./rn-typescript.png)

React Typescript is picking up speed, as typing offers a lot of benefits in a project.

The following is a walkthough on how to:
* Setup a **React-Native Typescript** project
* Install and configure **ESlint** and **Prettier**
* How to configure ESLint and Prettier **VSCode plugins**.

The linting rules proposed here are `@typescript-eslint/eslint-plugin` and `eslint-config-airbnb-typescript`

Bear in mind that due to [TSLint depreciation](https://medium.com/palantir/tslint-in-2019-1a144c2317a9), Typescript linting is now taken over by ESLint, and there's work in progress.

### Contents:
1. Setup React-Native Typescript project
1. Install and configure `eslint` and `prettier`
1. Setup scripts
1. Git hooking with `husky`
1. Setup ESlint VSCode plugin.

## Setup React-Native Typescript

You can **setup** a react-native typescript project with the cli:
```
react-native init <project-name> --template typescript
cd <project-name>
```

Before `git init` your project make sure to add the following lines to `.gitignore` file:

**.gitignore**
```
# CocoaPods
/ios/Pods/
```

Then you can `git init` your project
```
git init
git add .
git commit -m "project init"
```

## Install and configure `eslint` and `prettier`

The project comes already with `eslint` and `prettier` installed. We will add support for `react` but mainly for `typescript` and `airbnb`'s proposal for typescript eslint.

So install the packages:
```
npm install --save-dev eslint-plugin-react eslint-plugin-import eslint-plugin-jsx-a11y @typescript-eslint/eslint-plugin eslint-config-airbnb-typescript eslint-config-prettier
```

And then configure `.eslintrc.js` to use these plugins:

**.eslintrc.js**
```
module.exports = {
    root: true,
    extends: ['@react-native-community', 'airbnb-typescript', 'prettier', 'prettier/@typescript-eslint', 'prettier/react'],
};
```

In addition you can create a `.prettierrc` file to customize the prettier behavior to your liking. Here's my personal favourite:

**.prettierrc**
```
{
    "singleQuote": true,
    "trailingComma": "none",
    "tabWidth": 4,
    "semi": true
}
```

ADD the following in `excludes` section of `tsconfig.json` to suppress a typescript error in tests:

**.tsconfig.json**
```
    "exclude": [
        "__tests__/**/*-test.ts"
    ] 
```

## Setup scripts

You should setup scripts in `package.json` so you can run those tools manually when needed.

Add a script for running `prettier` in **WRITE** mode. (Caution: It will change your files).

**package.json**
```
"script": {
    ...
    "prettier:write": "npx prettier --write **/*.{js,jsx,ts,tsx,json} && npx prettier --write *.{js,jsx,ts,tsx,json}"
}
```

Also add as script for running `lint` on all files including `.ts` and `.tsx` ones:

**package.json**
```
"script": {
    ...
    "lint": "tsc --noEmit && eslint --ext .js,.jsx,.ts,.tsx ./",
}
```

Before proceeding it's a good idea to commit your existing changes:
```
git add .
git commit -m "eslint typescript prettier"
```

### Fix the existing project

Now you can run
```
npm run prettier:write
```

This command will re-format your project files according to the rules we just installed.

Then you can run `lint`:
```
npm run lint
```

You will see that eslint finds some issues. These must be corrected by hand. Once you fix those run again the commands:

```
npm run prettier:write
npm run lint
```

If no issue found, you can commit your changes:
```
git add .
git commit -m "prettify project"
```

## Git hooking with `husky`

You do not want to run those commands manually, each time you commit. You should automate this process to run automatically each time you commit.

This can be done with `husky`. Also `pretty-quick` will help you to prettify only the files that you changed in this commit.

So install those packages:
```
npm install --save-dev pretty-quick husky
```

Then configure your **package.json** to enable husky pre-commit hook.

**package.json**
```
    "husky": {
        "hooks": {
        "pre-commit": "pretty-quick --staged && npm run lint"
        }
    }
```

Now each time you commit, your changes will be prettified and checked by `eslint`. If issues are found, the commit will be blocked.

## VSCode plugin setup.

To be able to have the `eslint` and `prettier` information real-time in you VSCode Editor you should install the following plugins:

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

`ESLint` plugin needs a bit further configuration to work with typescript.

Open the VSCode settings and the following configuration snippet.

**settings.json**
```
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
]
```

### Done

That's it. You can now write your code in React-native.
Happy coding!
