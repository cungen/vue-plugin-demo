import * as vscode from "vscode";

export default function (context: vscode.ExtensionContext) {
    // 获取所有命令
    vscode.commands.getCommands().then((allCommands) => {
        console.log("(VuePlugin)监听命令：", allCommands);
    });

    // 编辑器命令
    context.subscriptions.push(
        vscode.commands.registerTextEditorCommand(
            "vPlugin.demo.testEditorCommand",
            (textEditor, edit) => {
                console.log("您正在执行编辑器命令！");
                console.log(textEditor, edit);
            }
        )
    );

    // 执行某个命令
    // vscode.commands.executeCommand('命令', 'params1', 'params2');
}
