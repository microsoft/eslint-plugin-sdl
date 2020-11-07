# Do not write to DOM directly using document.write or document.writeln methods (no-document-write)

Calls to document.write or document.writeln manipulate DOM directly without any sanitization and should be avoided. Use document.createElement() or similar methods instead.

## Related Rules

* [tslint-microsoft-contrib/no-document-write](https://github.com/microsoft/tslint-microsoft-contrib/blob/master/src/noDocumentWriteRule.ts)
