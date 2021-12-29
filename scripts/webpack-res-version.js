const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');

const getFiles = (rootPath, outputPath) => {
    let fileList = [];
    const getFile = (nextPath) => {
        const files = fs.readdirSync(nextPath);
        if (!files.length) return;

        files.forEach((item) => {
            const fileAbsolutePath = path.join(nextPath, item);
            const stat = fs.statSync(fileAbsolutePath);

            if (stat.isDirectory()) {
                return getFile(fileAbsolutePath);
            }

            const basename = path.basename(rootPath);
            const relativePath = `${basename}${fileAbsolutePath.replace(rootPath, '')}`;

            const fileBuffer = fs.readFileSync(fileAbsolutePath);
            const extname = path.extname(fileAbsolutePath);
            if (!extname) return;
            const sum = crypto.createHash('sha256');
            sum.update(fileBuffer);
            const hex = sum.digest('hex').substr(0, 8);
            const outputAbsolutePath = fileAbsolutePath
                .replace(rootPath, outputPath)
                .replace(extname, `-${hex}${extname}`);
            const outputRelativePath = `${basename}${outputAbsolutePath.replace(outputPath, '')}`;
            fileList.push({
                entry: {
                    relativePath,
                    absolutePath: fileAbsolutePath,
                },
                output: {
                    relativePath: outputRelativePath,
                    absolutePath: outputAbsolutePath,
                },
                file: fileBuffer,
            });
        });
    };
    getFile(rootPath);
    return fileList;
};

class WebpackResVersionPlugin {
    constructor(options) {
        this.options = options;
        this.clearVersionJson();
    }

    apply(compiler) {}

    clearVersionJson() {
        const { entry_path, output_path, outputs_path } = this.options;
        if (!fs.existsSync(entry_path)) {
            throw new Error('entry_path cannot be empty');
        }

        if (!fs.existsSync(output_path)) {
            fs.mkdirSync(output_path, { recursive: true });
        }
        const files = getFiles(entry_path, output_path);
        const versionJson = { version: dayjs().format('YYYYMMDDHHmmss') };
        files.forEach((item) => {
            versionJson[item.entry.relativePath] = item.output.relativePath;
            const dir = path.dirname(item.output.absolutePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(item.output.absolutePath, item.file);
        });

        fs.writeFileSync(path.join(outputs_path, 'version.json'), JSON.stringify(versionJson));
    }
}

module.exports = WebpackResVersionPlugin;
