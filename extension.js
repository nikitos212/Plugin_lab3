// extension.js
const vscode = require('vscode');
const { execSync } = require('child_process');

function activate(context) {
    let disposable = vscode.commands.registerCommand('docgen.generateDocumentation', () => {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("Workspace folder not found.");
            return;
        }

        try {
            const command = `doxygen ${workspaceFolder}/.doxyfile`;
            execSync(command, { cwd: workspaceFolder });
            vscode.window.showInformationMessage("Documentation generated successfully!");
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to generate documentation: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

module.exports = {
    activate,
};