'use strict';

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

module.exports = defaultOptions;