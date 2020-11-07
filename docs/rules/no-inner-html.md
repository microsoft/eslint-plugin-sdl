# Do not write to DOM directly using innerHTML/outerHTML property (no-inner-html)

Assignments to [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)/[outerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML) properties or calls to [insertAdjacentHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML) method manipulate DOM directly without any sanitization and should be avoided. Use document.createElement() or similar methods instead.

* [Rule Source](../../lib/rules/no-inner-html.js)
* [Rule Test](../../tests/lib/rules/no-inner-html.js)

## Related Rules

* [tslint-microsoft-contrib/no-inner-html](https://github.com/microsoft/tslint-microsoft-contrib/blob/master/src/noInnerHtml.ts)
* [eslint-plugin-no-unsanitized](https://github.com/mozilla/eslint-plugin-no-unsanitized/blob/master/docs/rules/method.md)