// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Common utils for tests.
 */

"use strict";

const path = require("path");

module.exports = {
    tsParserOptions: {
        parser: require("@typescript-eslint/parser"),
        parserOptions: {
            tsconfigRootDir: path.join(__dirname, '../fixtures'),
            project: 'tsconfig.json'
        }
    },
    moduleParserOptions: {
        ecmaVersion: 6
    },
    tsReactParserOptions: {
        parser: require("@typescript-eslint/parser"),
        parserOptions: {
            tsconfigRootDir: path.join(__dirname, '../fixtures'),
            project: 'tsconfig-react.json',
            ecmaFeatures: {
                jsx: true
            },
        }
    }
};