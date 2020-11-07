# Do not bypass Angular's built-in sanitization (no-angular-bypass-sanitizer)

Calls to bypassSecurityTrustHtml, bypassSecurityTrustScript and similar methods bypass [DomSanitizer](https://angular.io/api/platform-browser/DomSanitizer#security-risk) in Angular and need to be reviewed.

Sanitization should be disabled only in very rare and justifiable cases after careful review so that the risk of introducing Cross-Site-Scripting (XSS) vulnerability is minimized.

The issue is well described in official [DomSanitizer](https://angular.io/api/platform-browser/DomSanitizer#security-risk) documentation. Also see [Angular Security Guide](https://angular.io/guide/security) for more details.
