/* global describe, it */
'use strict';

var NgAutoBootstrap = require('..');
var expect          = require('chai').expect;

// default options:
// { bootstrap: { path: 'bootstrap.js' },
// 	moduleTypes:
// 	 { animation: { path: '**/animations/*.js', casing: 'paramCase' },
// 		 constant: { path: '**/constants/*.js', casing: 'constant' },
// 		 controller: { path: '**/controllers/*.js', casing: 'pascalCase' },
// 		 directive: { path: '**/directives/*.js', casing: 'camelCase' },
// 		 factory: { path: '**/factories/*.js', casing: 'pascalCase' },
// 		 filter: { path: '**/filters/*.js', casing: 'camelCase' },
// 		 provider: { path: '**/providers/*.js', casing: 'camelCase' },
// 		 service: { path: '**/services/*.js', casing: 'camelCase' },
// 		 value: { path: '**/values/*.js', casing: 'camelCase' } } }

describe('NgAutoBootstrap', function() {
	it('deep extends options passed to it', function() {
		var ngAutoBootstrap = new NgAutoBootstrap({
			bootstrap: {
				path: 'config/bootstrap.js'
			},
			moduleTypes: {
				factory: {
					casing: 'camelCase',
					suffix: 'Factory'
				}
			}
		});

		expect(ngAutoBootstrap.options).to.deep.equal({
			strict: true,
			bootstrap: {
				path: 'config/bootstrap.js'
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
					casing: 'camelCase',
					suffix: 'Factory'
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
				},
				config: {
					path: '**/*-config.js'
				},
				run: {
					path: '**/*-run.js'
				}
			}
		});
	});
});