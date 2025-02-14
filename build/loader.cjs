const fs = require('node:fs');
const yaml = require('yaml');

require.extensions['.yml'] = function (module, filename) {
    const file = fs.readFileSync(filename, 'utf8')

    try {
        module.exports = yaml.parse(file);
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}
