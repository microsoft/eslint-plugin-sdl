// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Common utils for tests.
 */

"use strict";

const path = require("path");

module.exports = {
    tsParser: require.resolve("@typescript-eslint/parser"),
    tsParserOptions: {
        tsconfigRootDir: path.join(__dirname, '../fixtures'),
        project: 'tsconfig.json',
        sourceType: "module"
    },
    moduleParserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    }
};