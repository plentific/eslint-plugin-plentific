## Installation

After cloning this repository, run:

```
cd eslint-plugin-plentific && yarn 
```

##  Development

Symlink a package folder during development.

In `eslint-plugin-plentific` repository, run:

```
yarn link
```
Output should look: 
```
yarn link vx.x.x
success Registered "eslint-plugin-plentific".
info You can now run `yarn link "eslint-plugin-plentific"` in the projects where you want to use this package and it will be used instead.
```

In `dashboard` repository, run:

```
yarn link eslint-plugin-plentific
```

Output should look: 
```
yarn link vx.x.x
success Using linked package for "eslint-plugin-plentific".
```

To reverse this process, simply use `yarn unlink` or `eslint-plugin-plentific` depending on the repository.

##  Troubleshooting

Linting errors appears on fresh cloned project or code changes in linting rules files seem to not take an effect.
* Remove `node_modules` and `run yarn`
