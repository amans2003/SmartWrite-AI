const { pathToRegexp } = require('path-to-regexp');

const tests = [
    '/:any(.*)',
    '/{*any}',
    '/(.*)',
    '*',
    '/:any*'
];

for (const pattern of tests) {
    try {
        const keys = [];
        pathToRegexp(pattern, keys);
        console.log(`SUCCESS: ${pattern}`);
    } catch (err) {
        console.log(`FAILED: ${pattern} - ${err.message}`);
    }
}
