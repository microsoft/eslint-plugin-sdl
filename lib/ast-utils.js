// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview Common utils for AST.
 */

"use strict";

module.exports = {
    isTypeScriptParserServices(parserServices) {
        // Check properties specific to @typescript-eslint/parser
        return (
            parserServices &&
            parserServices.program &&
            parserServices.esTreeNodeToTSNodeMap &&
            parserServices.tsNodeToESTreeNodeMap
        );
    },
    hasFullTypeInformation(context) {
        var hasFullTypeInformation = (
            context && 
            this.isTypeScriptParserServices(context.parserServices) &&
            context.parserServices.hasFullTypeInformation === true
        );
        return hasFullTypeInformation;
    },
    getFullTypeChecker(context) {
        return this.hasFullTypeInformation(context) ? context.parserServices.program.getTypeChecker() : null;
    },
    getNodeTypeAsString(fullTypeChecker, node, context) {
        if (fullTypeChecker && node) {
          const tsNode = context.parserServices.esTreeNodeToTSNodeMap.get(node);
          const tsType = fullTypeChecker.getTypeAtLocation(tsNode);
          const type = fullTypeChecker.typeToString(tsType);
          return type;
        }
        return "any";
    },
    isDocumentObject(node, context, fullTypeChecker) {
        if (fullTypeChecker) {
            const type = this.getNodeTypeAsString(fullTypeChecker, node, context);
            return (type === "Document");
        }

        // Best-effort checking without Type information
        switch (node.type) {
            case "Identifier":
                return node != undefined && node.name == "document";
            case "MemberExpression":
                return (
                    node != undefined &&
                    node.property != undefined &&
                    node.property.name == "document" && (
                        (node.object != undefined &&
                         typeof node.object.name === "string" &&
                         node.object.name.toLowerCase().endsWith('window')) ||
                        (
                            node.object != undefined &&
                            node.object.property != undefined &&
                            node.object.property.name == "window" &&
                            (

                                (node.object.object != undefined && node.object.object.type == "ThisExpression") ||
                                (node.object.object != undefined && node.object.object.name == "globalThis")
                            )
                        )
                    )
                );
        };
        return false;
    }
};