// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Rule to enforce sandbox attribute on iframe elements
 */

"use strict";

// TODO: Follow-up on https://github.com/yannickcr/eslint-plugin-react/issues/2754 and try to merge rule into eslint-plugin-react

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    type: "suggestion",
    fixable: "code",
    schema: [],
    docs: {
      category: "Security",
      description: "The [sandbox](https://www.w3schools.com/tags/att_iframe_sandbox.asp) attribute enables an extra set of restrictions for the content in the iframe and should always be specified.",
      url: "https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/react-iframe-missing-sandbox.md"
    },
    messages: {
      attributeMissing: 'An iframe element is missing a sandbox attribute',
      invalidValue: 'An iframe element defines a sandbox attribute with invalid value "{{ value }}"',
      invalidCombination: 'An iframe element defines a sandbox attribute with both allow-scripts and allow-same-origin which is invalid'
    }
  },

  create(context) {
    const ALLOWED_VALUES = [
      // From https://www.w3schools.com/tags/att_iframe_sandbox.asp
      '',
      'allow-forms',
      'allow-modals',
      'allow-orientation-lock',
      'allow-pointer-lock',
      'allow-popups',
      'allow-popups-to-escape-sandbox',
      'allow-presentation',
      'allow-same-origin',
      'allow-scripts',
      'allow-top-navigation',
      'allow-top-navigation-by-user-activation'
    ];

    function validateSandboxAttribute(node, attribute) {
      const values = attribute.value.value.split(' ');
      let allowScripts = false;
      let allowSameOrigin = false;
      values.forEach((attributeValue) => {
        const trimmedAttributeValue = attributeValue.trim();
        if (ALLOWED_VALUES.indexOf(trimmedAttributeValue) === -1) {
          context.report({
            node,
            messageId: 'invalidValue',
            data: {
              value: trimmedAttributeValue
            }
          });
        }
        if (trimmedAttributeValue === 'allow-scripts') {
          allowScripts = true;
        }
        if (trimmedAttributeValue === 'allow-same-origin') {
          allowSameOrigin = true;
        }
      });
      if (allowScripts && allowSameOrigin) {
        context.report({
          node,
          messageId: 'invalidCombination'
        });
      }
    }

    return {
      'JSXOpeningElement[name.name="iframe"]'(node) {
        let sandboxAttributeFound = false;
        node.attributes.forEach((attribute) => {
          if (attribute.type === 'JSXAttribute'
            && attribute.name
            && attribute.name.type === 'JSXIdentifier'
            && attribute.name.name === 'sandbox'
          ) {
            sandboxAttributeFound = true;
            if (
              attribute.value
              && attribute.value.type === 'Literal'
              && attribute.value.value
            ) {
              // Only string literals are supported for now
              validateSandboxAttribute(node, attribute);
            }
          }
        });
        if (!sandboxAttributeFound) {
          context.report({
            node,
            messageId: 'attributeMissing'
          });
        }
      }
    };
  }
};