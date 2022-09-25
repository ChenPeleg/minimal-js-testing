import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


export const testRunner = () => ({
    async searchTestFiles(
        fileNameMatcher = /.*\.(test.m?js|spec.m?js)/gi,
        ignoreLibs = /.git|node_modules/
    ) {

        const recursiveGetAllTestFiles = (dir, allFiles) => {
            const dirCont = fs.readdirSync(dir);
            dirCont.filter(f => !f.match(ignoreLibs)).forEach((elm, i) => {
                const fullFileName = path.join(dir, elm);
                const stat = fs.lstatSync(fullFileName);
                if (stat.isDirectory() && fullFileName) {
                    return recursiveGetAllTestFiles(fullFileName, allFiles);
                }
                if (elm.match(fileNameMatcher)) {
                    allFiles.push(fullFileName);
                    return;
                }
            });
            return allFiles;
        };
        return recursiveGetAllTestFiles(path.resolve('./'), []);
    },
    async runTests() {

        console.log('Running tests...');
        const testFiles = await this.searchTestFiles();
        console.log(`Found ${testFiles.length} test files`)
        for (const fileName of testFiles) {
            await import(
                path.relative(__dirname, fileName).replace(/\\/g, '/')
            ); // for windows
        }
        const descriptions = [];
        const passed = [];
        const failed = [];
        this.testingFramework.globalData.tests.forEach((test) => {
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
            console.log(
                (
                    `${failed.length} Tests ${' FAILED '
                    }`
                )
            );
        }
        console.log(
            (
                `${passed.length} Tests ${' PASSED '}`
            )
        );
        if (failed.length) {
            //  process.exit(1);
            throw new Error(
                'Error! Test failed.  See above for more details.'
            );
        }
    }
})