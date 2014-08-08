# ng-autobootstrap

ng-autobootstrap automatically creates bootstrap files for including your angular modules like controllers and directives with browserify. Best used with [gulp](http://gulpjs.com) and [gulp-ng-autobootstrap](https://github.com/maximilianschmitt/gulp-ng-autobootstrap).

## Gulp plugin

Check out [gulp-ng-autobootstrap](https://github.com/maximilianschmitt/gulp-ng-autobootstrap)!

## Installation

```
npm install ng-autobootstrap
```

## API

### new NgAutoBootstrap([options])

Creates a new `NgAutoBootstrap` object with the specified options.

### ngAutoBootstrap.bootstrap(filePaths)

Returns a string with the generated bootstrap file contents.

## Configuring ng-autobootstrap

### Options

Override default options by passing them to the `NgAutoBootstrap` constructor.

``` js
var ngAutoBootstrap = new NgAutoBootstrap({
	bootstrap: {
		path: 'config/bootstrap.js'
	}
});
```

#### options.bootstrap

This is where you configure the path to your bootstrap file. ng-autobootstrap needs to know this paths so that it can generate relative paths to the angular modules that are being pulled in.

#### options.moduleTypes.{{moduleType}}.path

A glob for identifying the respective module type by its file path.

#### options.moduleTypes.{{moduleType}}.casing

How the file name should be transformed to its module name. Supports everything that [change-case](https://github.com/blakeembrey/change-case) supports.

E.g. if a controller file is called `my-awesome-controller.js`, it will be registered as `MyAwesomeController` with `pascalCase` or `myAwesomeController` with `camelCase` in your angular app.

#### options.moduleTypes.{{moduleType}}.prefix

A prefix to add to each module name of the respective module type.

#### options.moduleTypes.{{moduleType}}.suffix

A suffix to add to each module name of the respective module type.

#### options.moduleTypes.{{moduleType}}.omit

A string to omit from the filename before casing it.

E.g. if a service file is called `user-service.js` and you set `options.moduleTypes.service.omit = '-service'`, then the resulting module will be registered with angular via `app.service('User', ...);` (assuming PascalCasing).

### Default options

Prefixes, suffixes and omits are not set by default.

``` js
var defaultOptions = {
	bootstrap: {
		path: 'bootstrap.js'
	},
	moduleTypes: {
		animation: {
			path: '**/animations/*.js',
			casing: 'paramCase'
		},
		constant: {
			path: '**/constants/*.js',
			casing: 'constant'
		},
		controller: {
			path: '**/controllers/*.js',
			casing: 'pascalCase'
		},
		directive: {
			path: '**/directives/*.js',
			casing: 'camelCase'
		},
		factory: {
			path: '**/factories/*.js',
			casing: 'pascalCase'
		},
		filter: {
			path: '**/filters/*.js',
			casing: 'camelCase'
		},
		provider: {
			path: '**/providers/*.js',
			casing: 'camelCase'
		},
		service: {
			path: '**/services/*.js',
			casing: 'camelCase'
		},
		value: {
			path: '**/values/*.js',
			casing: 'camelCase'
		}
	}
};
```