/* global describe, it, beforeEach */
'use strict';

var ModulePathParser = require('../lib/module-path-parser');
var expect           = require('chai').expect;
var extend           = require('extend');

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

describe('ModulePathParser', function() {
	describe('moduleName', function() {
		var options;

		beforeEach(function() {
			options = extend(true, {}, defaultOptions);
		});

		it('applies configured casing convention', function() {
			var modulePathParser = new ModulePathParser(options);
			expect(modulePathParser.moduleName('controllers/some-controller.js')).to.equal('SomeController');
		});

		it('omits configured string from module name', function() {
			options.moduleTypes.service.omit = 'service';
			var modulePathParser = new ModulePathParser(options);

			expect(modulePathParser.moduleName('services/awesome-feature-service.js')).to.equal('awesomeFeature');
		});

		it('adds configured suffix to module name', function() {
			options.moduleTypes.controller.suffix = 'Ctrl';
			var modulePathParser = new ModulePathParser(options);

			expect(modulePathParser.moduleName('controllers/home.js')).to.equal('HomeCtrl');
		});

		it('adds configured prefix to module name', function() {
			options.moduleTypes.controller.prefix = 'Controller';
			var modulePathParser = new ModulePathParser(options);

			expect(modulePathParser.moduleName('controllers/home.js')).to.equal('ControllerHome');
		});
	});

	describe('modulePath', function() {
		var options;

		beforeEach(function() {
			options = extend(true, {}, defaultOptions);
		});

		it('returns relative module path when bootstrap file is in same directory', function() {
			options.bootstrap.path = 'bootstrap.js';
			var modulePathParser = new ModulePathParser(options);

			expect(modulePathParser.modulePath('some-module.js')).to.equal('./some-module');
		});

		it('returns relative module path when bootstrap file is in parent directory', function() {
			options.bootstrap.path = 'bootstrap.js';
			var modulePathParser = new ModulePathParser(options);

			expect(modulePathParser.modulePath('module-folder/some-module.js')).to.equal('./module-folder/some-module');
		});

		it('returns relative module path when bootstrap file is in different directory', function() {
			options.bootstrap.path = 'config/bootstrap.js';
			var modulePathParser = new ModulePathParser(options);

			expect(modulePathParser.modulePath('module-folder/some-module.js')).to.equal('../module-folder/some-module');
		});
	});

	describe('moduleType', function() {
		it('returns module type by module path', function() {
			var options = extend({}, defaultOptions);
			var modulePathParser = new ModulePathParser(options);

			expect(modulePathParser.moduleType('some-path/animations/file-name.js')).to.equal('animation');
			expect(modulePathParser.moduleType('some-path/constants/file-name.js')).to.equal('constant');
			expect(modulePathParser.moduleType('some-path/controllers/file-name.js')).to.equal('controller');
			expect(modulePathParser.moduleType('some-path/directives/file-name.js')).to.equal('directive');
			expect(modulePathParser.moduleType('some-path/factories/file-name.js')).to.equal('factory');
			expect(modulePathParser.moduleType('some-path/filters/file-name.js')).to.equal('filter');
			expect(modulePathParser.moduleType('some-path/providers/file-name.js')).to.equal('provider');
			expect(modulePathParser.moduleType('some-path/services/file-name.js')).to.equal('service');
			expect(modulePathParser.moduleType('some-path/values/file-name.js')).to.equal('value');
		});
	});

	describe('moduleMap', function() {
		it('creates a map of modules by type', function() {
			var paths = [
				'some-path/animations/module-name.js',
				'some-path/constants/module-name.js',
				'some-path/controllers/module-name.js',
				'some-path/directives/module-name.js',
				'some-path/factories/module-name.js',
				'some-path/filters/module-name.js',
				'some-path/providers/module-name.js',
				'some-path/services/module-name.js',
				'some-path/values/module-name.js'
			];

			var expectedMap = {
				animation: [{ path: './some-path/animations/module-name', name: 'module-name' }],
				constant: [{ path: './some-path/constants/module-name', name: 'MODULE_NAME' }],
				controller: [{ path: './some-path/controllers/module-name', name: 'ModuleName' }],
				directive: [{ path: './some-path/directives/module-name', name: 'moduleName' }],
				factory: [{ path: './some-path/factories/module-name', name: 'ModuleName' }],
				filter: [{ path: './some-path/filters/module-name', name: 'moduleName' }],
				provider: [{ path: './some-path/providers/module-name', name: 'moduleName' }],
				service: [{ path: './some-path/services/module-name', name: 'moduleName' }],
				value: [{ path: './some-path/values/module-name', name: 'moduleName' }]
			};

			var options = extend({}, defaultOptions);
			var modulePathParser = new ModulePathParser(options);

			expect(modulePathParser.moduleMap(paths)).to.deep.equal(expectedMap);
		});
	});
});