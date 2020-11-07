# Do not use HTTP cookies in modern applications (no-cookies)

HTTP cookies are an old client-side storage mechanism with inherent risks and limitations. Use Web Storage, IndexedDB or other modern methods instead.

Cookies should be used only in rare and justifiable cases after thorough security review.

## Further Reading

* [Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

## Related Rules

* [tslint-microsoft-contrib/no-cookies](https://github.com/microsoft/tslint-microsoft-contrib/blob/master/src/noCookiesRule.ts)