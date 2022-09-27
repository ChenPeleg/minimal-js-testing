import * as fs from 'fs';
import * as path from 'path';

export const searchTestFiles = async (testFilesNamesPattern, ignoredLibs) => {
    const testFilesNamesRegex = new RegExp(`.*${testFilesNamesPattern}`, 'gi');
    const ignoredLibsRegex = new RegExp(`.*${ignoredLibs}`, 'gi');
    const recursiveGetAllTestFiles = (dir, allFiles) => {
        fs.readdirSync(dir)
            .filter((f) => !f.match(ignoredLibsRegex))
            .forEach((elm, i) => {
                const fullFileName = path.join(dir, elm);
                if (fs.lstatSync(fullFileName).isDirectory()) {
                    return recursiveGetAllTestFiles(fullFileName, allFiles);
                }
                if (elm.match(testFilesNamesRegex)) {
                    allFiles.push(fullFileName);
                    return;
                }
            });
        return allFiles;
    };
    return recursiveGetAllTestFiles(path.resolve('./'), []);
};
