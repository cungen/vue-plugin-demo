import * as vscode from "vscode";

export declare interface GlobalInfo {
    projectPath: string;
    panel: vscode.WebviewPanel;
}

export declare interface MessageHandler {
    [propName: string]: Function;
}

export declare interface Message {
    [propName: string]: any;
}
