import * as fs from 'fs';
import * as path from 'path';
import { allTests } from './tst-globlas';

const _glob_allTests = allTests;

export const testRunner = (
    fileNameMatcher = /.*\.(test.m?js|spec.m?js)/gi,
    ignoreLibs = /.git|node_modules/
) => ({
    async runTests() {
        const testFiles = await this.searchTestFiles(
            fileNameMatcher,
            ignoreLibs
        );
        console.log(`Running Tests. \n Found ${testFiles.length} test files`);
        const passed = [];
        const failed = [];
        for (const fileName of testFiles) {
            await import(
                path.relative(__dirname, fileName).replace(/\\/g, '/')
            );
        }

        _glob_allTests.forEach((test) => {
            try {
                test.test();
            } catch (err) {
                console.log(' '.repeat(4) + err);
                failed.push(test.descriptopn + ' ' + err);
                return;
            }
            console.log(' '.repeat(4) + test.descriptopn);
            passed.push(test.descriptopn);
        });
        if (failed.length) {
            console.log(`${failed.length} Tests ${' FAILED '}`);
        }
        console.log(`${passed.length} Tests ${' PASSED '}`);
        if (failed.length) {
            throw new Error('Error! Test failed.  See above for more details.');
        }
    },
});
