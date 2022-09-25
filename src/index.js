import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { allTests } from './tst-globlas.js';
import { searchTestFiles } from './tst-search-files.js';

const _glob_allTests = allTests;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const runTests = async (
    fileNameMatcher = /.*\.(test.m?js|spec.m?js)/gi,
    ignoredLibs = /.git|node_modules/
) => {
    const testFiles = await searchTestFiles(fileNameMatcher, ignoredLibs);
    console.log(`Running Tests. \n Found ${testFiles.length} test files`);
    let testNumber = 0;
    const failed = [];
    for (const fileName of testFiles) {
        await import(path.relative(__dirname, fileName).replace(/\\/g, '/'));
        console.log(fileName);

        for (testNumber; testNumber < allTests.length; testNumber++) {
            const test = allTests[testNumber];

            try {
                test.test();
            } catch (err) {
                failed.push(test.description + ' ' + err);
                console.error(' '.repeat(6) + err);
                return;
            }
            console.log(' '.repeat(6) + '✔ ' + test.description);
        }
    }
    console.log(`${testNumber + 1 - failed.length} Tests ${' PASSED '}`);
    if (failed.length) {
        console.log(`${failed.length} Tests ${' FAILED '}`);
        throw new Error('Error! Test failed.  See above for more details.');
    }
};
runTests();
