// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to disallow call to Math.random and crypto.pseudoRandomBytes functions
 * @author Antonios Katopodis
 */

"use strict";

const astUtils = require("../ast-utils");
const path = require('path');

const bannedRandomLibraries = [
  'chance',
  'random-number',
  'random-int',
  'random-float',
  'random-seed',
  'unique-random'
]

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    type: "suggestion",
    fixable: "code",
    schema: [],
    docs:{
      description: `Methods such as Math.random or crypto.pseudoRandomBytes do not produce cryptographically-secure random numbers and must not be used for security purposes such as generating tokens, passwords or keys.

      Use crypto.randomBytes() or window.crypto.getRandomValues() instead.
      
      `,
      url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-insecure-random.md"
    },
    messages: {
      default: 'Do not use pseudo-random number generators for generating secret values such as tokens, passwords or keys.'
    }
  },
  create: function(context) {
    const fullTypeChecker = astUtils.getFullTypeChecker(context);
    return {
      "CallExpression > MemberExpression[property.name='pseudoRandomBytes']"(node) {
        var notFalsePositive = false;

        if (fullTypeChecker) {
          const type = astUtils.getCallerType(fullTypeChecker, node.object, context);
          notFalsePositive = type === "any" || type === "Crypto";
        }else{
          notFalsePositive = node.object.name === 'crypto';
        }

        if(notFalsePositive){
          context.report({
            node: node,
            messageId: "default"
          });
        }   
      },
      "CallExpression > MemberExpression[property.name='random']"(node) {
        var notFalsePositive = false;
        if (fullTypeChecker) {
          const type = astUtils.getCallerType(fullTypeChecker, node.object, context);
          notFalsePositive = type === "any" || type === "Math";
        }else{
          notFalsePositive = node.object.name === 'Math';
        }

        if(notFalsePositive){
          context.report({
            node: node,
            messageId: "default"
          });
        }
      },
      ImportDeclaration(node){
        if(bannedRandomLibraries.includes(path.basename(node.source.value))){
          context.report({
            node: node,
            messageId: "default"
          });  
        }
      },
      "CallExpression[callee.name='require'][arguments.length=1]"(node){
        var requireName = path.parse(path.basename(node.arguments[0].value)).name;
        if(bannedRandomLibraries.includes(requireName)){
          context.report({
            node: node,
            messageId: "default"
          });  
        }
      }
    };
  }
};