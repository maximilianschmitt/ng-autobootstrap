/* global describe, it */
'use strict';

var expect                = require('chai').expect;
var bootstrapFileContents = require('../lib/bootstrap-file-contents');
var fs                    = require('fs');

describe('bootstrapFileContents', function() {
	it('returns a string requiring every module from a map', function() {
		var moduleMap = {
			animation: [{ path: './some-path/animations/module-name', name: 'module-name' }],
			constant: [{ path: './some-path/constants/module-name', name: 'MODULE_NAME' }],
			controller: [{ path: './some-path/controllers/module-name', name: 'ModuleName' }],
			directive: [{ path: './some-path/directives/module-name', name: 'moduleName' }],
			factory: [{ path: './some-path/factories/module-name', name: 'ModuleName' }],
			filter: [{ path: './some-path/filters/module-name', name: 'moduleName' }],
			provider: [{ path: './some-path/providers/module-name', name: 'moduleName' }],
			service: [{ path: './some-path/services/module-name', name: 'moduleName' }],
			value: [{ path: './some-path/values/module-name', name: 'moduleName' }],
			config: [{ path: './some-path/for-something-config' }]
		};
		var expectedBootstrapFileContents = fs.readFileSync(__dirname + '/expected-bootstrap-file.txt').toString();

		expect(bootstrapFileContents(moduleMap, { strict: true })).to.equal(expectedBootstrapFileContents);
	});

	it('optionally generates the file not for strict mode', function() {
		var moduleMap = {};
		var expectedBootstrapFileContents = fs.readFileSync(__dirname + '/expected-bootstrap-file.txt').toString();

		expect(bootstrapFileContents(moduleMap, { strict: false })).to.not.contain('\'use strict\'');
	});
});