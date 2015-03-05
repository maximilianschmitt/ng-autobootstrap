'use strict';

var changeCase = require('change-case');

var namelessModuleTypes = require('./nameless-module-types');

var bootstrapFileContents = function(moduleMap, options) {
	options = options || {};

	var contents = options.strict ? '\'use strict\';\n\n' : '';
	contents += 'module.exports = function(app) {\n';

	Object.keys(moduleMap).forEach(function(moduleType) {
		var filePaths = moduleMap[moduleType];
		if (filePaths.length < 1) {
			return;
		}

		contents += '	// ' + changeCase.ucFirst(moduleType) + 's\n';

		filePaths.forEach(function(file) {
			var moduleName = file.name;
			var modulePath = file.path.replace('\\', '/');

			contents += '	app.' + moduleType + '(';

			// precede animations with a `.`
			if (moduleType === 'animation') {
				moduleName = '.' + moduleName;
			}

			// config & run modules don't have a name
			if (namelessModuleTypes.indexOf(moduleType) === -1) {
				contents += '\'' + moduleName + '\', ';
			}

			contents += 'require(\'' + modulePath + '\'));\n';
		});
	});

	contents += '};';

	return contents;
};

module.exports = bootstrapFileContents;