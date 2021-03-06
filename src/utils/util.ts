import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as vscode from "vscode";
import { exec } from "child_process";

export default {
    /**
     * 获取当前所在工程根目录，有3种使用方法：<br>
     * getProjectPath(uri) uri 表示工程内某个文件的路径<br>
     * getProjectPath(document) document 表示当前被打开的文件document对象<br>
     * getProjectPath() 会自动从 activeTextEditor 拿document对象，如果没有拿到则报错
     * @param {*} document
     */
    getProjectPath(document: vscode.TextDocument | null) {
        if (!document) {
            document = vscode.window.activeTextEditor
                ? vscode.window.activeTextEditor.document
                : null;
        }
        if (!document) {
            this.showError("当前激活的编辑器不是文件或者没有文件被打开！");
            return "";
        }
        const currentFile = document.uri.fsPath;
        let workspaceFolders =
            vscode.workspace.workspaceFolders?.map((item) => item.uri.path) ||
            [];
        const projectPath = workspaceFolders.find((folder) => {
            return currentFile.indexOf(folder) === 0;
        });

        if (!projectPath) {
            this.showError("获取工程根路径异常！");
            return "";
        }
        return projectPath;
    },
    /**
     * 获取当前工程名
     */
    getProjectName: function (projectPath: string) {
        return path.basename(projectPath);
    },
    getPluginPath() {},
    /**
     * 将一个单词首字母大写并返回
     * @param {*} word 某个字符串
     */
    upperFirstLetter: function (word: string) {
        return (word || "").replace(/^\w/, (m: string) => m.toUpperCase());
    },
    /**
     * 将一个单词首字母转小写并返回
     * @param {*} word 某个字符串
     */
    lowerFirstLeter: function (word: string) {
        return (word || "").replace(/^\w/, (m) => m.toLowerCase());
    },
    /**
     * 弹出错误信息
     */
    showError: function (info: string) {
        vscode.window.showErrorMessage(info);
    },
    /**
     * 弹出提示信息
     */
    showInfo: function (info: string) {
        vscode.window.showInformationMessage(info);
    },
    /**
     * 从某个文件里面查找某个字符串，返回第一个匹配处的行与列，未找到返回第一行第一列
     * @param filePath 要查找的文件
     * @param reg 正则对象，最好不要带g，也可以是字符串
     */
    findStrInFile: function (filePath: string, reg: string | RegExp) {
        const content = fs.readFileSync(filePath, "utf-8");
        reg = typeof reg === "string" ? new RegExp(reg, "m") : reg;
        // 没找到直接返回
        if (content.search(reg) < 0) {
            return { row: 0, col: 0 };
        }
        const rows = content.split(os.EOL);
        // 分行查找只为了拿到行
        for (let i = 0; i < rows.length; i++) {
            let col = rows[i].search(reg);
            if (col >= 0) {
                return { row: i, col };
            }
        }
        return { row: 0, col: 0 };
    },
    /**
     * 获取某个字符串在文件里第一次出现位置的范围，
     */
    getStrRangeInFile: function (filePath: string, str: string) {
        var pos = this.findStrInFile(filePath, str);
        return new vscode.Range(
            new vscode.Position(pos.row, pos.col),
            new vscode.Position(pos.row, pos.col + str.length)
        );
    },
    /**
     * 获取某个扩展文件绝对路径
     * @param context 上下文
     * @param relativePath 扩展中某个文件相对于根目录的路径，如 images/test.jpg
     */
    getExtensionFileAbsolutePath: function (
        context: vscode.ExtensionContext,
        relativePath: string
    ) {
        return path.join(context.extensionPath, relativePath);
    },
    /**
     * 获取某个扩展文件相对于webview需要的一种特殊路径格式
     * 形如：vscode-resource:/Users/toonces/projects/vscode-cat-coding/media/cat.gif
     * @param context 上下文
     * @param relativePath 扩展中某个文件相对于根目录的路径，如 images/test.jpg
     */
    getExtensionFileVscodeResource: function (
        context: vscode.ExtensionContext,
        relativePath: string
    ) {
        const diskPath = vscode.Uri.file(
            path.join(context.extensionPath, relativePath)
        );
        return diskPath.with({ scheme: "vscode-resource" }).toString();
    },
    /**
     * 在Finder中打开某个文件或者路径
     */
    openFileInFinder: function (filePath: string) {
        if (!fs.existsSync(filePath)) {
            this.showError("文件不存在：" + filePath);
        }
        // 如果是目录，直接打开就好
        if (fs.statSync(filePath).isDirectory()) {
            exec(`open ${filePath}`);
        } else {
            // 如果是文件，要分开处理
            const fileName = path.basename(filePath);
            filePath = path.dirname(filePath);
            // 这里有待完善，还不知道如何finder中如何选中文件
            exec(`open ${filePath}`);
        }
    },
    /**
     * 在vscode中打开某个文件
     * @param {*} path 文件绝对路径
     * @param {*} text 可选，如果不为空，则选中第一处匹配的对应文字
     */
    openFileInVscode: function (path: string, text: string) {
        let options = undefined;
        if (text) {
            const selection = this.getStrRangeInFile(path, text);
            options = { selection };
        }
        vscode.window.showTextDocument(vscode.Uri.file(path), options);
    },
    /**
     * 使用默认浏览器中打开某个URL
     */
    openUrlInBrowser: function (url: string) {
        exec(`open '${url}'`);
    },
};
