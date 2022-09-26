import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { allTests } from './tst-globlas.js';
import { searchTestFiles } from './tst-search-files.js';

const _glob_allTests = allTests;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const runTests = async (
    testFilesNamesPattern = 'test.m?js|spec.m?j',
    ignoredLibs = '.git|node_modules'
) => {
    const testFiles = await searchTestFiles(testFilesNamesPattern, ignoredLibs);
    console.log(`Running tests in ${testFiles.length} files:`);
    let testNumber = 0;
    const failed = [];
    for (const fileName of testFiles) {
        console.log('\n', fileName, '\n');
        await import(path.relative(__dirname, fileName).replace(/\\/g, '/'));

        for (testNumber; testNumber < allTests.length; testNumber++) {
            const test = allTests[testNumber];

            try {
                test.test();
            } catch (err) {
                failed.push(test.description + ' ' + err);
                console.log(' '.repeat(6) + ' ' + test.description + ' ' + err);
            }
            console.log(' '.repeat(6) + '✔ ' + test.description);
        }
    }
    console.log('\n');
    console.log(`${testNumber - failed.length} Tests \x1b[42m${' PASSED '}\x1b[40m `);
    if (failed.length) {
        console.log(`${failed.length} Tests \x1b[41m${' FAILED '}\x1b[40m `);
        throw new Error('Error! Test failed.  See above for more details.');
    }
};
const testfiles = process.argv
    .filter((a) => a.includes('testfiles='))[0]
    ?.replace('testfiles=', '');
const ingnore = process.argv.filter((a) => a.includes('ingnore='))[0]?.replace('ingnore=', '');
runTests(testfiles, ingnore);
