'use strict';

var extend                = require('extend');

var ModulePathParser      = require('./lib/module-path-parser');
var defaultOptions        = require('./lib/default-options');
var bootstrapFileContents = require('./lib/bootstrap-file-contents');

var NgAutoBootstrap = function(options) {
	options = options || {};
	this.options = extend(true, {}, defaultOptions, options);
	this.modulePathParser = new ModulePathParser(this.options);
};

NgAutoBootstrap.prototype = {
	bootstrap: function(filePaths) {
		var moduleMap = this.modulePathParser.moduleMap(filePaths);

		return bootstrapFileContents(moduleMap, this.modulePathParser);
	}
};

module.exports = NgAutoBootstrap;