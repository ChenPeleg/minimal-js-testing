import * as fs from 'fs';
import * as path from 'path';

export const searchTestFiles = async (fileNameMatcher, ignoredLibs) => {
    const recursiveGetAllTestFiles = (dir, allFiles) => {
        fs.readdirSync(dir)
            .filter((f) => !f.match(ignoredLibs))
            .forEach((elm, i) => {
                const fullFileName = path.join(dir, elm);
                if (fs.lstatSync(fullFileName).isDirectory()) {
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
};
