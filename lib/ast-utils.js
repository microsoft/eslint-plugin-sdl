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
    getNodeType(node, context) {
        const typeChecker = context.parserServices.program.getTypeChecker();
        const tsNode = context.parserServices.esTreeNodeToTSNodeMap.get(node);
        const tsType = typeChecker.getTypeAtLocation(tsNode);
        return typeChecker.typeToString(tsType);
    },
    getCallerType(fullTypeChecker, object, context){
        const tsNode = context.parserServices.esTreeNodeToTSNodeMap.get(object);
        const tsType = fullTypeChecker.getTypeAtLocation(tsNode);
        const type = fullTypeChecker.typeToString(tsType);
        return type;
    },
    isDocumentObject(node, context, fullTypeChecker) {
        if (fullTypeChecker) {
            const tsNode = context.parserServices.esTreeNodeToTSNodeMap.get(node);
            const tsType = fullTypeChecker.getTypeAtLocation(tsNode);
            const type = fullTypeChecker.typeToString(tsType);
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
                        node.object.name == "window") ||
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