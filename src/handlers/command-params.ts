import * as vscode from "vscode";

export default function (context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand(
            "vPlugin.demo.getCurrentFilePath",
            (uri) => {
                vscode.window.showInformationMessage(
                    `当前文件(夹)路径是：${uri ? uri.path : "空"}`
                );
            }
        )
    );
}
