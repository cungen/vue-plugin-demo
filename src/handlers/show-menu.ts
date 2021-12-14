import * as vscode from "vscode";

export default function (context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("vPlugin.demo.showMenu", () => {
            const xiSayings = [
                "青年是祖国的未来，是民族的希望。",
                "要立大志。“功崇惟志，业广惟勤。”",
                "要勤学习。“非学无以广才，非志无以成学。”",
                "要修品行。“从善如流，从恶如崩。”",
                "要敢创新。“苟日新，日日新，又日新。”",
                "要务实效。“得其大者可以兼其小，未有学其小而能至其大者也。”",
                "要受历练。“宝剑锋从磨砺出，梅花香自苦寒来。”",
                "“学如弓弩，才如箭镞。”",
            ];
            vscode.window.showInformationMessage(
                xiSayings[
                    Math.floor(Math.random() * xiSayings.length) %
                        xiSayings.length
                ]
            );
        })
    );
}
