# Code style and best practices enforcement in Angular (TSLint - Prettier)

Every language and framework has its best practices rules to make developer life's easier and avoid pitfalls. But not _'walking astray from the path'_ in a manually way is not easy and becomes impossible when multiple developers / teams get involved.

Having a toolbox to enforce these best practices, as automatically as possible is one of the 'base' preparations every project should have before even start writing a single line of code. 

The web languages and Angular are no exception to this rule and 
there are various tools doing just that. After searching around and do some testing, here is my personal recommandation for setting up 'Lint' and 'Code formatting' enforcements.

## The tools

The tools proposed here are of two categories: _'CLI based'_ and _'Editor Plugins / Extensions'_.

The CLI tools are part of the project (in `package.json`). So this means that is easy to be kept in sync and enforced in all developer's environments and CI/CD deployments.

The editor plugins presented here are for the propular [VSCode](2od: url here) editor (my personal favourite). They help you _'stay in the path'_ real-time, while you are coding.

The CLI tools:
* [TSLint](https://palantir.github.io/tslint/)
* [codelyzer](http://codelyzer.com/) and [tslint-angular](https://github.com/mgechev/tslint-angular/)
* [prettier](https://prettier.io/) and [tslint-config-prettier](https://github.com/prettier/tslint-config-prettier/)
* [pretty-quick](https://github.com/azz/pretty-quick) and [husky](https://github.com/typicode/husky)

The VSCode plugins are:
* [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
* [Angular Snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)
* [angular2-inline](https://marketplace.visualstudio.com/items?itemName=natewallace.angular2-inline)

## tslint

`tslint` is a package that parses your Typescript code looking for points that _'break the best practice rules'_. It comes with a pre-configured set of rules for best practices in Typescript in general.

You don't have to do something to install it. It comes pre-included in any new Angular project you create, when you run `ng new` command.

## codelyzer and tslint-angular

`codelyzer` and `tslint-angular` packages are a set of rules for `tslint`, and they are enforce Angular-specific best practices including the [Angular Style Guide](https://angular.io/guide/styleguide/). 

You don't have to install `codelyzer` as it included with new projects created with `ng new` command. 

To install `tslint-angular` 

1. run `npm install --save-dev tslint-angular`
1. edit `tslint.json` to extend the configuration
```
{
  "extends": ["tslint:recommended", "tslint-angular"],
```

To run your project against these rules, just run: `ng lint`.

## prettier and tslint-config-prettier

Prettier is a tool that enforces code style formatting. It is just concerned with the display format of the code. It has nothing to do code operation and effectiveness checks that `tslint` performs.

To install it, run: `npm install --save-dev prettier`

You will also want to install `tslint-config-prettier`. This is an additional rules configuration file that resolves conflicts between `prettier` and `tslint`. `tslint` includes some code formatting rules, that conflict with `prettier`. So when you `prettier` you break `tslint`, and when you fix to conform with `tslint`, then `prettier` starts to complain. So the above mentioned configuration file, resolve this conflict once and for all.

To install it 
1. run: `npm install --save-dev tslint-config-prettier`.
1. edit `tslint.js` file to apply the config
```
{
  "extends": ["tslint:recommended", "tslint-angular", "tslint-config-prettier"],
```

You might want also to override some `prettier` rules with your own. You can create a `.prettierrc` file in root folder of your project.
Here's my preferred rules:

**.prettierrc**
```
{
    "tabWidth": 4,
    "singleQuote": true
}
```
You can have look at [Prettier options](https://prettier.io/docs/en/options.html) to see what else can be overriden to your liking.

You might also want to exclude certain files from `prettier` checks. Just place a `.prettierignore` configuration file in project's root folder. Here's my preferrence:

**.prettierignore**
```
package.json
package-lock.json
yarn.lock
dist
```

To manually run a prettier, just enter:
```
npx prettier --write "**/*"
```

**CAUTION:** The `--write` parameter will directly change your files. Having a clean commit state before you do that it's a good idea so you can revert any changes that did not work out well (this can happen).

To format only specific file-types of your project, you can run (e.g):
```
npx prettier --write "**/*.{ts, html}"
```

You can also launch it for specific files. e.g.:
```
npx prettier --write "src/app/app.component.ts"
```

## pretty-quick and husky

Having to run `tslint` and `prettier` manually each time you wish to commit, is a real burden. And is almost sure that it cannot be effectively enforced just by telling your colleagues to respect the policy and run these tools themselves each time.

That is why we need to enforce these rules automatically, before committing files. Code should be automatically formatted and if it does not follows our best practices, the commit should stop.

Welcome, `husky` package. It allows you to automatically run your script within git life-cycle hooks like `pre-commit` and `pre-push`.

But then again running these checks enforcement on the entire code base each time, is a waste of time, resources. And it messses up commits.

Welcome, `pretty-quick`:  It identifies which files have changed and allow applying `prettier` fixes only on those.

So: 

1. install `pretty-quick`: `npm install --save-dev pretty-quick`
1. install `husky`: `npm install --save-dev husky`
1. Configure `husky` to run before commits. Add the following to `package.json`
```
"husky": {
    "hooks": {
        "pre-commit": "pretty-quick --staged && ng lint"
    }
}
```

So before each commit:

1. `prettier` will format the changed files automatically re-stage them. 
2. Then `ng lint` will run. If the code does not comply with the rules, then the commit will be stopped.

Otherwise the commit will procced as normal.

## VSCode Plugins

As we mentioned earlier, it is much more efficient if you have the above mentioned checkes real-time while you are writing your code.  Fortunately there are corresponding VSCode plugins to do exactly that. Here are my recommendations.

### [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) and codelyzer.

It performs `tslint` analysis based on the files you are editing. Just install the plugin and you are set for the `tslint` part.

[For enabling also the `codelyzer` rules for VSCode](https://github.com/mgechev/codelyzer/blob/master/README.md#editor-configuration): Open _Code > Preferences > User Settings_, and enter the following lines:

{
  "tslint.rulesDirectory": "./node_modules/codelyzer",
  "typescript.tsdk": "node_modules/typescript/lib"
}

### [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

It will suggest code format corrections in real-time. It binds to _Format Document_ command of VSCode - Right-click menu in the file contents you are editing - and formats based on your `prettier` rules the entire document you are working on.

### Angular specific plugins

The following plugins are Angular specific and they are also [recommended by Angular guru John Papa](https://johnpapa.net/rec-ng-extensions/).

* [Angular Inline](https://marketplace.visualstudio.com/items?itemName=natewallace.angular2-inline)
* [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
* [Angular Snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)

And the following are also a very useful.

* [Chrome Debugger](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
* [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=pkief.material-icon-theme)

## Closing

As mentioned above, these are personal recommendations. They are not 'written in stone', and I expect some of those to change over time as I bump onto cases that need fine-tunning. I will be updating this post accordingly.

Happy Angular coding !
