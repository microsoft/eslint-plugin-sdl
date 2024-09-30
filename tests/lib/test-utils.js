// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Common utils for tests.
 */

"use strict";

const path = require("path");
const tsParser = require("@typescript-eslint/parser");

module.exports = {
    es6LanguageOptions: {
        parserOptions: {
            ecmaVersion: 6,
            sourceType: "module"
        }
    },
    tsLanguageOptions: {
        parser: tsParser,
        parserOptions: {
            tsconfigRootDir: path.join(__dirname, "../fixtures"),
            project: "tsconfig.json"
        }
    },
    tsReactLanguageOptions: {
        parser: tsParser,
        parserOptions: {
            tsconfigRootDir: path.join(__dirname, "../fixtures"),
            project: "tsconfig-react.json",
            sourceType: "module",
            ecmaFeatures: {
                jsx: true
            }
        }
    }
};