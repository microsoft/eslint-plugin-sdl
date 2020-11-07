# Do not enable Node.js Integration for Remote Content (no-electron-node-integration)

[Node.js Integration](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content) must not be enabled in any renderer that loads remote content to avoid remote code execution attacks.

[Rule Source Code](../../lib/rules/no-electron-node-integration.js)

## Related Rules

* [codeql/js/enabling-electron-renderer-node-integration](https://help.semmle.com/wiki/display/JS/Enabling+Node.js+integration+for+Electron+web+content+renderers)
