const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const {toCsv} = require('./csv.js');

const actual = toCsv([{id: 1, title: 'Hello, "REA"'}]);
assert.equal(actual, readFileSync(join(__dirname, 'expected.csv'), 'utf8').replace(/\r\n/g, '\n'));
assert.equal(toCsv([]), 'id,title\n');
assert.equal(toCsv([{id: 2, title: 'Line 1\nLine 2'}]), 'id,title\n2,"Line 1\nLine 2"\n');
console.log(actual);
console.log('PASS: 3 CSV checks');
