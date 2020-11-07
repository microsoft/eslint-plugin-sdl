# Do not bypass Angular's built-in sanitization (no-angularjs-sanitization-whitelist)

Calls to [$compileProvider.aHrefSanitizationWhitelist](https://docs.angularjs.org/api/ng/provider/$compileProvider#aHrefSanitizationWhitelist) or [$compileProvider.imgSrcSanitizationWhitelist](https://docs.angularjs.org/api/ng/provider/$compileProvider#imgSrcSanitizationWhitelist) configure whitelists in AngularJS sanitizer and need to be reviewed.

Sanitization should be disabled only in very rare and justifiable cases after careful review so that the risk of introducing Cross-Site-Scripting (XSS) vulnerability is minimized.

See [official documentation](https://docs.angularjs.org/api/ng/provider/$compileProvider#aHrefSanitizationWhitelist) for more details about the issue.
