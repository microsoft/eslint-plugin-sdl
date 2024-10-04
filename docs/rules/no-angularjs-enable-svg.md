# Do not enable SVG support in AngularJS (no-angularjs-enable-svg)

Calls to [`$sanitizeProvider.enableSvg(true)`](https://docs.angularjs.org/api/ngSanitize/provider/$sanitizeProvider#enableSvg) increase attack surface of the application by enabling SVG support in AngularJS sanitizer and need to be reviewed.

SVG support should be enabled only in very rare and justifiable cases after careful review so that the risk of introducing Clickjacking vulnerability is minimized.

See [official documentation](https://docs.angularjs.org/api/ngSanitize/provider/$sanitizeProvider#enableSvg) for more details about the issue.
