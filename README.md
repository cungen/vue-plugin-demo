# VSCode 插件开发简明教程

> 该项目是为了讲解 VSCode 各类型插件开发步骤而建立的

## 内容

-   简介
-   如何创建一个插件
-   示例
-   总结

## 简介

-   扩展性
    -   可扩展性很好，几乎所有内容都可以定制开发
    -   Extension API
-   内容包含
    -   color、icon(material-color, material-icon)
    -   新的语言支持(local,中文)
    -   快捷键支持(VI)
    -   一些视图(git,leetCode)
    -   添加 webview(markdown preview)
    -   新的编程语言(C++)
    -   新的调试过程(C++)
    -   Notebook Renderer(markdown)
-   实现方式
    -   思考：如果你要做一个可扩展的工具，你会怎么做？
    -   事件：命令、任务、提示、菜单、主题（定义有没有）
    -   注册：注册一个回调函数、定义配置文件（定义做什么）
    -   触发：触发回调

## 创建一个插件

### 创建

-   `npm install -g yo generator-code`
-   yo code

```bash
yo code

     _-----_     ╭──────────────────────────╮
    |       |    │   Welcome to the Visual  │
    |--(o)--|    │   Studio Code Extension  │
   `---------´   │        generator!        │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

? What type of extension do you want to create? (Use arrow keys)
❯ New Extension (TypeScript)
  New Extension (JavaScript)
  New Color Theme
  New Language Support
  New Code Snippets
  New Keymap
```

### 配置说明

```markdown
.
├── .vscode
│ ├── launch.json // Config for launching and debugging the extension
│ └── tasks.json // Config for build task that compiles TypeScript
├── .gitignore // Ignore build output and node_modules
├── README.md // Readable description of your extension's functionality
├── src
│ └── extension.ts // Extension source code
├── package.json // Extension manifest
├── tsconfig.json // TypeScript configuration
```

#### `package.json`

```json
{
    "activationEvents": ["onLanguage:gantt"],
    "main": "./out/extension.js",
    "contributes": {
        "languages": [
            {
                "id": "gantt",
                "aliases": ["gantt", "gantt"],
                "extensions": ["gantt"],
                "configuration": "./language-configuration.json"
            }
        ],
        "grammars": [
            {
                "language": "gantt",
                "scopeName": "source.gantt",
                "path": "./syntaxes/gantt.tmLanguage.json"
            }
        ],
        "configurationDefaults": {
            "[gantt]": {
                "editor.insertSpaces": true,
                "editor.tabSize": 2,
                "editor.autoIndent": "advanced"
            }
        },
        "menus": {
            "editor/title": [
                {
                    "when": "resourceLangId == gantt",
                    "command": "gantt.showPreview",
                    "group": "navigation"
                }
            ]
        },
        "commands": [
            {
                "title": "Gantt: Show Preview",
                "command": "gantt.showPreview"
            }
        ]
    }
}
```

-   engines.vscode 版本
-   main 入口
-   activationEvents 插件激活事件
    -   onLanguage
    -   onCommand
-   contribute.commands 命令
-   contribute.menus 菜单
-   contribute.language 语言
-   contribute.keybindings 快捷键
-   contribute.configuration 配置

#### `extensions.ts`

-   activate 激活插件，在激活方法中注册相关回调

```javascript
context.subscriptions.push(
    vscode.commands.registerCommand("commandName", function (uri) {})
);
```

-   deactivate

### 运行及调试

-   F5/Run -> Start Debugging
-   前置条件 tsc watch
-   调试 cmd+shift+Y/View -> Debug Console

## 示例

-   命令
-   快捷键
-   右键菜单、顶部菜单、活动菜单
-   Snippet(Suggestion)
-   WebView
-   主题
-   设置项

## 上线

> TODO

## 比较好的实践

> TODO

## 总结

-   插件思想，定义回调
-   场景：编辑器提效(snippets、preview、debug、tip)
-   基于文件的应用(csv,markdown 插件,自定义文件格式)

## 参考

-   [Extension API](https://code.visualstudio.com/api)
-   [Your First Extension](https://code.visualstudio.com/api/get-started/your-first-extensiona)

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

-   安装相关依赖`npm i`
-   运行`npm run watch`来转换 typescript 文件
-   F5 运行(或 Run And Debug)

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

-   `myExtension.enable`: enable/disable this extension
-   `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

包含了一个可以运行的 Demo 插件及插件开发过程详解

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

-   [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

-   Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
-   Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
-   Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

-   [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
-   [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
