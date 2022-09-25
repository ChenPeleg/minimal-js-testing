import * as fs from 'fs';
import * as path from 'path';

export const searchTestFiles = async (fileNameMatcher, ignoreLibs) => {
    const recursiveGetAllTestFiles = (dir, allFiles) => {
        const dirCont = fs.readdirSync(dir);
        dirCont
            .filter((f) => !f.match(ignoreLibs))
            .forEach((elm, i) => {
                const fullFileName = path.join(dir, elm);
                const stat = fs.lstatSync(fullFileName);
                if (stat.isDirectory()) {
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
