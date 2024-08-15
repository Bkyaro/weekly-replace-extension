import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		"markdown-replace-images.replaceImages",
		() => {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				const document = editor.document;
				const text = document.getText();

				// 正则表达式匹配所有以 ![] 开头的图片文本
				const regex = /!\[(.*?)\]\((.*?)\)/g;

				// 使用替换后的 HTML div 节点
				const newText = text.replace(
					regex,
					(match, altText, imageUrl) => {
						return `<div style="display: inline-block; resize: both; overflow: hidden; line-height: 0; width:200px;">
    <img src="${imageUrl}" alt="${altText}" style="width: 100%; height: 100%; object-fit: contain;">
</div>`;
					}
				);

				// 使用编辑器编辑器 API 替换文本
				editor.edit((editBuilder) => {
					const entireRange = new vscode.Range(
						document.positionAt(0),
						document.positionAt(text.length)
					);
					editBuilder.replace(entireRange, newText);
				});
			}
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
