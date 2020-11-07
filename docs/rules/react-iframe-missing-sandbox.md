# An iframe element is missing a sandbox attribute (react-iframe-missing-sandbox)

The [sandbox](https://www.w3schools.com/tags/att_iframe_sandbox.asp) attribute enables an extra set of restrictions for the content in the iframe and should always be specified.

Additional functionality such as the ability to run scripts should be enabled only in justifiable cases after thorough security review.

* [Rule Source](../../lib/rules/react-iframe-missing-sandbox.js)
* [Rule Test](../../tests/lib/rules/react-iframe-missing-sandbox.js)

## Related Rules

* [tslint-microsoft-contrib/react-iframe-missing-sandbox](https://github.com/microsoft/tslint-microsoft-contrib/blob/master/src/reactIframeMissingSandboxRule.ts)

## More Reading

* [How to safely inject HTML in React using an iframe](https://medium.com/the-thinkmill/how-to-safely-inject-html-in-react-using-an-iframe-adc775d458bc)
* [Play safely in sandboxed IFrames](https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/)