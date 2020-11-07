# Do not write to document.domain property (no-document-domain)

Writes to [`document.domain`](https://developer.mozilla.org/en-US/docs/Web/API/Document/domain) property must be reviewed to avoid bypass of [same-origin checks](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Changing_origin). Usage of top level domains such as `azurewebsites.net` is strictly prohibited.

## Related Rules

* [tslint-microsoft-contrib/no-document-domain](https://github.com/microsoft/tslint-microsoft-contrib/blob/master/src/noDocumentDomainRule.ts)
