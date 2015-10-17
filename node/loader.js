var fs = require('fs');
var _eval = require('eval');
var files = require("./files.json");

var fileList = [];
for (var section in files) {
	if (files[section].length) {
		fileList = fileList.concat(files[section]);
	}
}

fileList.forEach(function(filename) {
	filename = 'lib/' + filename;
	var contents = fs.readFileSync(filename, 'utf8');
	console.log('Loading', filename);
	var exports = _eval(contents, filename, {}, true);
	$.extend(true, global, exports);
	var exported = Object.getOwnPropertyNames(exports).join(', ');
	if (exported) console.log('    -->', exported);
});

console.log('done');
