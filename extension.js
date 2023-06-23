// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let panel = undefined

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	if (panel) {
		panel.reveal(vscode.ViewColumn.One)
		return
	}
	let disposable = vscode.commands.registerCommand('assistant.chat', function () {
		panel = vscode.window.createWebviewPanel(
			'assistant',
			'assistant',
			vscode.ViewColumn.One,
			{
				enableScripts: true
			}
		);
		panel.webview.html = getWebViewContent(context, './index.html')
	});

	context.subscriptions.push(disposable)
}

function getWebViewContent(context, templatePath) {
    const resourcePath = path.join(context.extensionPath, templatePath);
    let html = fs.readFileSync(resourcePath, 'utf-8');
    return html;
}

// This method is called when your extension is deactivated
function deactivate() {
	panel.dispose && panel.dispose()
}

module.exports = {
	activate,
	deactivate
}
