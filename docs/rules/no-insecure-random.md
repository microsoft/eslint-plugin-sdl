# Do not use insecure random functions

Methods such as Math.random or crypto.pseudoRandomBytes do not produce cryptographically-secure random numbers and must not be used for security purposes such as generating tokens, passwords or keys.

Use crypto.randomBytes() or window.crypto.getRandomValues() instead.

## Related Rules

* [tslint-microsoft-contrib/no-insecure-random](https://github.com/microsoft/tslint-microsoft-contrib/blob/master/src/insecureRandomRule.ts)
- https://help.semmle.com/wiki/display/JS/Insecure+randomness
  - [source](https://github.com/github/codeql/blob/master/javascript/ql/src/semmle/javascript/security/dataflow/InsecureRandomnessCustomizations.qll)
- https://vulncat.fortify.com/en/detail?id=desc.semantic.abap.insecure_randomness#JavaScript
- https://rules.sonarsource.com/javascript/RSPEC-2245
  - [source](https://github.com/SonarSource/SonarJS/blob/master/eslint-bridge/src/rules/pseudo-random.ts)
- https://github.com/nodesecurity/eslint-plugin-security/blob/master/rules/detect-pseudoRandomBytes.js
- https://github.com/gkouziik/eslint-plugin-security-node/blob/master/lib/rules/detect-insecure-randomness.js

