# Do not bypass Strict Contextual Escaping (SCE) in AngularJS (no-angularjs-bypass-sce)

Calls to `$sceProvider.enabled(false)`, `$sceDelegate.trustAs()`, `$sce.trustAs()` and relevant shorthand methods (e.g. `trustAsHtml` or `trustAsJs`) bypass [Strict Contextual Escaping (SCE)](https://docs.angularjs.org/api/ng/service/$sce#strict-contextual-escaping) in AngularJS and need to be reviewed.

SCE should be bypassed only in very rare and justifiable cases after careful review so that the risk of introducing Cross-Site-Scripting (XSS) vulnerability is minimized.

See [official documentation](https://docs.angularjs.org/api/ng/service/$sce#strict-contextual-escaping) for more details.