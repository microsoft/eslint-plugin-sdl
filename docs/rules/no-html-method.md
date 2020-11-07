# Do not write to DOM directly using jQuery html() method (no-html-method)

Direct calls to method `html()` often (e.g. in jQuery framework) manipulate DOM without any sanitization and should be avoided. Use document.createElement() or similar methods instead.

## Related Rules

* [tslint-microsoft-contrib/no-inner-html](https://github.com/microsoft/tslint-microsoft-contrib/blob/master/src/noInnerHtml.ts)
