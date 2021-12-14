import * as vscode from "vscode";

export default function (context: vscode.ExtensionContext) {
    // 注册HelloWord命令
    context.subscriptions.push(
        vscode.commands.registerCommand("vPlugin.demo.sayHello", () => {
            vscode.window.showInformationMessage("Hi, For you always, sir！");
        })
    );
}
