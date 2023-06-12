# eslint-plugin-sdl
![Node CI](https://github.com/microsoft/eslint-plugin-sdl/workflows/Node%20CI/badge.svg?branch=main&event=push)
![E2E integration](https://github.com/microsoft/eslint-plugin-sdl/workflows/E2E%20integration/badge.svg?branch=main&event=push)

[ESLint Plugin](https://eslint.org/docs/developer-guide/working-with-plugins) focused on common security issues and misconfigurations.

Plugin is intended as a baseline for projects that follow [Microsoft Security Development Lifecycle (SDL)](https://www.microsoft.com/en-us/securityengineering/sdl) and use ESLint to perform [Static Analysis Security Testing (SAST)](https://www.microsoft.com/en-us/securityengineering/sdl/practices#practice9).

## Installation

```sh
npm install microsoft/eslint-plugin-sdl
```
or
```sh
yarn add microsoft/eslint-plugin-sdl
```

## Usage
When you run npm install within your project's root folder, the plugin will be added automatically to your package.json and package-lock.json files. You can also add the plugin to your package.json file manually by specifying the name and version number in the dependencies section like so:

```sh
"dependencies": {
    "@microsoft/eslint-plugin-sdl": "^0.1.9"
}
```

Run npm install within your root folder to install everything listed in the dependencies section of package.json. If the plugin is listed in your package.json dependencies, eslint will enforce all plugin rules using default settings.

## Configs
Including an eslint configuration file in your project allows you to customize how eslint applies rules to your project. If you are using an .eslintrc file, you can include the plugin by adding:

```sh
plugins: ["@microsoft/eslint-plugin-sdl"]
```

Eslint will then only enforce rules you specify in the rules section of your .eslintrc file at the severity level you designate. The severity level options are 0 (no error), 1 (warning), and 2 (error). For example:

```sh
rules: {
  "no-eval": 2,
  "@microsoft/sdl/no-inner-html": 2
}
```

You can also used the below Shareable config files as guidelines depending on the type of project.

Plugin is shipped with following [Shareable Configs](http://eslint.org/docs/developer-guide/shareable-configs):

- [angular](config/angular.js) - Set of rules for [Angular](https://angular.io) applications
- [angularjs](config/angularjs.js) - Set of rules for [AngularJS](https://docs.angularjs.org) applications
- [common](config/common.js) - Set of rules for common JavaScript applications
- [electron](config/electron.js) - Set of rules for Electron applications
- [node](config/node.js) - Set of rules for Node applications
- [react](config/react.js) - Set of rules for [ReactJS](https://reactjs.org) applications
- [**recommended**](config/recommended.js) - SDL Recommended rules for all applications
- [**required**](config/required.js) - SDL Required rules for all applications
- [typescript](config/typescript.js) - Set of rules for TypeScript applications

## Rules

Where possible, we leverage existing rules from [ESLint](https://eslint.org/docs/rules/) and community plugins such as [react](https://github.com/yannickcr/eslint-plugin-react), [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules) or [security](https://github.com/nodesecurity/eslint-plugin-security#rules).

We also implemented several [custom rules](./lib/rules) where we did not find sufficient alternative in the community.

| Name | Description |
| --- | --- |
| [no-caller](https://eslint.org/docs/rules/no-caller) | Bans usage of deprecated functions `arguments.caller()` and `arguments.callee` that could potentially allow access to call stack. |
| [no-delete-var](https://eslint.org/docs/rules/no-delete-var) | Bans usage of operator `delete` on variables as it can lead to unexpected behavior. |
| [no-eval](https://eslint.org/docs/rules/no-eval) | Bans usage of [`eval()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) that allows code execution from string argument. |
| [no-implied-eval](https://eslint.org/docs/rules/no-implied-eval) | Bans usage of `setTimeout()`, `setInterval()` and `execScript()`. These functions are similar to `eval()` and prone to code execution. |
| [no-new-func](https://eslint.org/docs/rules/no-new-func) | Bans calling `new Function()` as it's similar to `eval()` and prone to code execution. |
| [node/no-deprecated-api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md) | Bans usage of deprecated APIs in Node. |
| [@microsoft/sdl/no-angular-bypass-sanitizer](./docs/rules/no-angular-bypass-sanitizer.md) | Calls to bypassSecurityTrustHtml, bypassSecurityTrustScript and similar methods bypass [DomSanitizer](https://angular.io/api/platform-browser/DomSanitizer#security-risk) in Angular and need to be reviewed. |
| [@microsoft/sdl/no-angularjs-bypass-sce](./docs/rules/no-angularjs-bypass-sce.md) | Calls to `$sceProvider.enabled(false)`, `$sceDelegate.trustAs()`, `$sce.trustAs()` and relevant shorthand methods (e.g. `trustAsHtml` or `trustAsJs`) bypass [Strict Contextual Escaping (SCE)](https://docs.angularjs.org/api/ng/service/$sce#strict-contextual-escaping) in AngularJS and need to be reviewed. |
| [@microsoft/sdl/no-angularjs-enable-svg](./docs/rules/no-angularjs-enable-svg.md) | Calls to [`$sanitizeProvider.enableSvg(true)`](https://docs.angularjs.org/api/ngSanitize/provider/$sanitizeProvider#enableSvg) increase attack surface of the application by enabling SVG support in AngularJS sanitizer and need to be reviewed. |
| [@microsoft/sdl/no-angularjs-sanitization-whitelist](./docs/rules/no-angularjs-sanitization-whitelist.md) | Calls to [`$compileProvider.aHrefSanitizationWhitelist`](https://docs.angularjs.org/api/ng/provider/$compileProvider#aHrefSanitizationWhitelist) or [`$compileProvider.imgSrcSanitizationWhitelist`](https://docs.angularjs.org/api/ng/provider/$compileProvider#imgSrcSanitizationWhitelist) configure whitelists in AngularJS sanitizer and need to be reviewed. |
| [@microsoft/sdl/no-cookies](./docs/rules/no-cookies.md) | HTTP cookies are an old client-side storage mechanism with inherent risks and limitations. Use Web Storage, IndexedDB or other modern methods instead. |
| [@microsoft/sdl/no-document-domain](./docs/rules/no-document-domain.md) | Writes to [`document.domain`](https://developer.mozilla.org/en-US/docs/Web/API/Document/domain) property must be reviewed to avoid bypass of [same-origin checks](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Changing_origin). Usage of top level domains such as `azurewebsites.net` is strictly prohibited. |
| [@microsoft/sdl/no-document-write](./docs/rules/no-document-write.md) | Calls to document.write or document.writeln manipulate DOM directly without any sanitization and should be avoided. Use document.createElement() or similar methods instead. |
| [@microsoft/sdl/no-electron-node-integration](./docs/rules/no-electron-node-integration.md) | [Node.js Integration](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content) must not be enabled in any renderer that loads remote content to avoid remote code execution attacks. |
| [@microsoft/sdl/no-html-method](./docs/rules/no-html-method.md) | Direct calls to method `html()` often (e.g. in jQuery framework) manipulate DOM without any sanitization and should be avoided. Use document.createElement() or similar methods instead. |
| [@microsoft/sdl/no-inner-html](./docs/rules/no-inner-html.md) | Assignments to innerHTML or outerHTML properties manipulate DOM directly without any sanitization and should be avoided. Use document.createElement() or similar methods instead. |
| [@microsoft/sdl/no-insecure-url](./docs/rules/no-insecure-url.md) | Insecure protocols such as [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) or [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol) should be replaced by their encrypted counterparts ([HTTPS](https://en.wikipedia.org/wiki/HTTPS), [FTPS](https://en.wikipedia.org/wiki/FTPS)) to avoid sending potentially sensitive data over untrusted networks in plaintext. |
| [@microsoft/sdl/no-msapp-exec-unsafe](./docs/rules/no-msapp-exec-unsafe.md) | Calls to [`MSApp.execUnsafeLocalFunction()`](https://docs.microsoft.com/en-us/previous-versions/hh772324(v=vs.85)) bypass script injection validation and should be avoided. |
| [@microsoft/sdl/no-postmessage-star-origin](./docs/rules/no-postmessage-star-origin.md) | Always provide specific target origin, not * when sending data to other windows using [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Security_concerns) to avoid data leakage outside of trust boundary. |
| [@microsoft/sdl/no-unsafe-alloc](./docs/rules/no-unsafe-alloc.md) | When calling [`Buffer.allocUnsafe`](https://nodejs.org/api/buffer.html#buffer_static_method_buffer_allocunsafe_size) and [`Buffer.allocUnsafeSlow`](https://nodejs.org/api/buffer.html#buffer_static_method_buffer_allocunsafeslow_size), the allocated memory is not wiped-out and can contain old, potentially sensitive data. |
| [@microsoft/sdl/no-winjs-html-unsafe](./docs/rules/no-winjs-html-unsafe.md) | Calls to [`WinJS.Utilities.setInnerHTMLUnsafe()`](https://docs.microsoft.com/en-us/previous-versions/windows/apps/br211696(v=win.10)) and similar methods do not perform any input validation and should be avoided. Use [`WinJS.Utilities.setInnerHTML()`](https://docs.microsoft.com/en-us/previous-versions/windows/apps/br211697(v=win.10)) instead. |
| [@microsoft/sdl/react-iframe-missing-sandbox](./docs/rules/react-iframe-missing-sandbox.md) | The [sandbox](https://www.w3schools.com/tags/att_iframe_sandbox.asp) attribute enables an extra set of restrictions for the content in the iframe and should always be specified. |
| [react/no-danger](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md) | Bans usage of `dangerouslySetInnerHTML` property in React as it allows passing unsanitized HTML in DOM. |
| [@typescript-eslint/no-implied-eval](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md) | Similar to built-in ESLint rule `no-implied-eval`. Bans usage of `setTimeout()`, `setInterval()`, `setImmediate()`, `execScript()` or `new Function()` as they are similar to `eval()` and allow code execution from string arguments. |

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
