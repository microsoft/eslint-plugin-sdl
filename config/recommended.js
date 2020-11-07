// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Default SDL recommended config for all applications. 
 */

"use strict";

module.exports = {
  plugins: [
    "@microsoft/sdl",
    "security"
  ],
  extends: [
    "plugin:@microsoft/sdl/required",
    "plugin:@microsoft/sdl/typescript"
  ],
  // TODO:
  //  - Consider using SDL Recommended for identifying places in code that are often misused and can be potentially risky. 
  //  - The action should be to review the code, not to remove it.
  //  - Good lists of such APIs
  //    - https://github.com/mozfreddyb/eslint-plugin-scanjs-rules/tree/master/lib/rules
  //    - https://github.com/ajinabraham/njsscan/tree/master/njsscan/rules/semantic_grep
  //  - Eventually we might remove detect-* rules from security plugin as they have high FP-rate.
}