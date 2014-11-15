'use strict';

var changeCase = require('change-case');

var bootstrapFileContents = function(moduleMap, modulePathParser) {
	var contents = '\'use strict\';\n\n';
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
			// config & run modules don't have a name
			if (modulePathParser.options.modulesThatDontHaveAName.indexOf(moduleType) === -1) {
				contents += '\'' + moduleName + '\', ';
			}
			contents += 'require(\'' + modulePath + '\'));\n';
		});
	});

	contents += '};';

	return contents;
};

module.exports = bootstrapFileContents;