const fs = require('fs');
const zlib = require('zlib');

function fn(path) {
	fs.readdirSync(path, { withFileTypes: true }).forEach(x => {
		if (x.isFile()) {
			let fullPath = path + x.name;
			fs.writeFileSync(`${fullPath}.gz`, zlib.gzipSync(fs.readFileSync(fullPath), { level: 9 }));
		} else if (x.isDirectory()) {
			fn(path + x.name + '/');
		};		
	});
};

fn('./dist/');