'use strict';

var minimatch  = require('minimatch');
var path       = require('path');
var changeCase = require('change-case');

var ModulePathParser = function(options) {
	this.options = options;
};

ModulePathParser.prototype = {
	moduleMap: function(filePaths) {
		var moduleMap = {};
		for (var moduleType in this.options.moduleTypes) {
			moduleMap[moduleType] = [];
		}

		filePaths.forEach(function(filePath) {
			var moduleType = this.moduleType(filePath);
			if (typeof moduleType === 'undefined') {
				return;
			}

			moduleMap[moduleType].push({
				name: this.moduleName(filePath),
				path: this.modulePath(filePath)
			});			
		}.bind(this));

		return moduleMap;
	},

	modulePath: function(filePath) {
		var fileName = path.basename(filePath, path.extname(filePath));
		var relativeDir = path.relative(path.dirname(this.options.bootstrap.path), path.dirname(filePath));

		var modulePath = fileName;

		if (relativeDir) {
			modulePath = relativeDir + '/' + modulePath;
		}

		modulePath = path.normalize(modulePath);

		if (modulePath.substr(0, 3) !== '../') {
			modulePath = './' + modulePath;
		}

		return modulePath;
	},

	moduleName: function(filePath) {
		var fileName   = path.basename(filePath, path.extname(filePath));
		var moduleType = this.moduleType(filePath);
		var casing     = this.options.moduleTypes[moduleType].casing;
		var omit       = this.options.moduleTypes[moduleType].omit;
		var suffix     = this.options.moduleTypes[moduleType].suffix;
		var prefix     = this.options.moduleTypes[moduleType].prefix;
		var moduleName = fileName;

		if (omit !== false && typeof omit !== 'undefined') {
			moduleName = moduleName.replace(omit, '');
		}

		moduleName = changeCase[casing](moduleName);

		if (suffix !== false && typeof suffix !== 'undefined') {
			moduleName += suffix;
		}

		if (prefix !== false && typeof prefix !== 'undefined') {
			moduleName = prefix + moduleName;
		}

		return moduleName;
	},

	moduleType: function(filePath) {
		var moduleTypes = this.options.moduleTypes;

		for (var moduleType in moduleTypes) {
			if (minimatch(filePath, moduleTypes[moduleType].path)) {
				return moduleType;
			}
		}
	}
};

module.exports = ModulePathParser;