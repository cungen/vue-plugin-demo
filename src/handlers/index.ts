export * from "./say-hello";
export * from "./show-menu";
export * from "./jump-to-definition";

require("./completion")(context); // 自动补全
require("./hover")(context); // 悬停提示
require("./webview")(context); // Webview
require("./welcome")(context); // 欢迎提示
require("./other")(context); // 其它杂七杂八演示代码

const testFn = require("./test-require-function");
console.log(testFn); // vscode的日志输出不可靠，这里竟然会打印null？！
testFn(1, 2);
