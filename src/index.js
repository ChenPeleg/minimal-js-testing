import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { allTests } from './tst-globlas.js';
import { searchTestFiles } from './tst-search-files.js';

const _glob_allTests = allTests;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const runTests = async (testfiles, ignoredLibs) => {
    const testFiles = await searchTestFiles(testfiles, ignoredLibs);
    console.log(`Running tests in ${testFiles.length} files:`);
    let testNumber = 0;
    const failed = [];
    for (const fileName of testFiles) {
        console.log(`\n${fileName}\n`);
        await import(path.relative(__dirname, fileName).replace(/\\/g, '/'));

        for (testNumber; testNumber < allTests.length; testNumber++) {
            const test = allTests[testNumber];
            try {
                test.test();
            } catch (err) {
                failed.push(test.description + ' ' + err);
                console.log(`       \x1b[41m${test.description} ${err}\x1b[40m`);
            }
            console.log(`        ✔ ${test.description}`);
        }
    }
    console.log(
        `\n${testNumber - failed.length} Tests ${
            testNumber ? '\x1b[42m PASSED ' : 'were found'
        }\x1b[40m`
    );
    if (failed.length) {
        console.log(`${failed.length} Tests \x1b[41m${' FAILED '}\x1b[40m `);
        throw new Error('Error! Test failed.  See above for more details.');
    }
};

const testfiles =
    process.argv.filter((a) => a.includes('testfiles='))[0]?.replace('testfiles=', '') ||
    'test.m?js|spec.m?j';

const ingnore =
    process.argv.filter((a) => a.includes('ingnore='))[0]?.replace('ingnore=', '') ||
    '.git|node_modules';

runTests(testfiles, ingnore);
