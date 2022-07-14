# Do not use insecure URLs (no-insecure-url)

Insecure protocols such as [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) or [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol) should be replaced by their encrypted counterparts ([HTTPS](https://en.wikipedia.org/wiki/HTTPS), [FTPS](https://en.wikipedia.org/wiki/FTPS)) to avoid sending potentially sensitive data over untrusted networks in plaintext.

- [Rule Source](../../lib/rules/no-insecure-url.js)
- [Rule Test](../../tests/lib/rules/no-insecure-url.js)

## Options
This rule comes with three [default lists](../../lib/rules/no-insecure-url.js#L13):
- **blocklist** - a RegEx list of insecure URL patterns.
- **exceptions** - a RegEx list of common false positive patterns. For example, HTTP URLs to XML schemas are usually allowed as they are used as identifiers, not for establishing actual network connections.
- **varExceptions** - a RegEx list of false positive patterns which a derivated from the variable name. For example, a variable that is called "insecureURL" which is used to test HTTP explicitly.

These lists can be overrided by providing options.

---
For example, providing these options... :
```javascript
"@microsoft/sdl/no-insecure-url": ["error", {
            "blocklist": ["^(http|ftp):\\/\\/", "^https:\\/\\/www\\.disallow-example\\.com"],
            "exceptions": ["^http:\\/\\/schemas\\.microsoft\\.com\\/\\/?.*"],
            "varExceptions": ["insecure?.*"]
        }]
```

... overrides the internal blocklist, blocking the following URL patterns... :
- `http://`...
- `ftp://`...
- `https://www.disallow-example.com`

... and also overrides the internal exceptions list, allowing the following URL patterns as exceptions.:
- `http://schemas.microsoft.com`
  - `http://schemas.microsoft.com/sharepoint`
  - `http://schemas.microsoft.com/path/subpath`

... and also overrides the internal variable exceptions list, allowing the following declaration name patterns as exceptions.:
- `var insecureURL = "http://..."`
- `var insecureWebsite = "http://..."`
- ...

URLs in neither the blocklist nor the exceptions list, are allowed:
- `telnet://`...
- `ws://`...
- ...

---

**Note**: The RegEx for the lists is provided within a string in a JSON. It is without delimiting slashes `/ /` and thus users cannot pass RegEx parameters. We make it case-insensitive after user input. Do not forget to escape characters:
```javascript
let pureRegex = /^https:\/\/www\.disallow-example\.com/;
let regexInString = "^https:\\/\\/www\\.disallow-example\\.com";
```

## Related Rules
* [tslint-microsoft-contrib/no-http-string](https://github.com/microsoft/tslint-microsoft-contrib/blob/master/src/noHttpStringRule.ts)
* [CodeQL/InsecureDownloadCustomizations.qll](https://github.com/github/codeql/blob/master/javascript/ql/src/semmle/javascript/security/dataflow/InsecureDownloadCustomizations.qll#L62)
* [DevSkim/DS137138](https://github.com/microsoft/DevSkim/blob/main/guidance/DS137138.md)
* [Fortify/insecure_transport](https://vulncat.fortify.com/en/detail?id=desc.config.java.insecure_transport#JavaScript%2fTypeScript)

## Further Reading
* [HTTPS Everywhere](https://en.wikipedia.org/wiki/HTTPS_Everywhere)
