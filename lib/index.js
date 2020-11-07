// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview ESLint plugin that implements rules intended for static testing during SDL
 * @author Antonios Katopodis
 */
"use strict";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------
const path = require("path");
const fs = require('fs');

function readFilesAsMap(relativeDir) {
    var absoluteDir = path.resolve(__dirname, relativeDir);
    var files = fs.readdirSync(absoluteDir);
    var output = {};
    files.forEach(filename => {
        var file = path.parse(filename);
        var obj = require(path.join(absoluteDir, file.base));
        output[file.name] = obj;
    });
    return output;
}

module.exports = {
    rules: readFilesAsMap("./rules"),
    configs: readFilesAsMap("../config")
}
