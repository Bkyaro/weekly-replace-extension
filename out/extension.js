"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    let disposable = vscode.commands.registerCommand("markdown-replace-images.replaceImages", () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const text = document.getText();
            // 正则表达式匹配所有以 ![] 开头的图片文本
            const regex = /!\[(.*?)\]\((.*?)\)/g;
            // 使用替换后的 HTML div 节点
            const newText = text.replace(regex, (match, altText, imageUrl) => {
                return `<div style="display: inline-block; resize: both; overflow: hidden; line-height: 0;">
    <img src="${imageUrl}" alt="${altText}" style="width: 100%; height: 100%; object-fit: contain;">
</div>`;
            });
            // 使用编辑器编辑器 API 替换文本
            editor.edit((editBuilder) => {
                const entireRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
                editBuilder.replace(entireRange, newText);
            });
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map