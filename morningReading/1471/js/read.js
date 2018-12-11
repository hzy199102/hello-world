#!/usr/bin/env node

/**
 * Module dependencies.
 */
//// 给你一把"螺丝刀"——recast
//const recast = require("recast");
//recast.run( function(ast, printSource){
//    printSource(ast)
//})

const recast  = require('recast')
recast.run(function(ast, printSource) {
    recast.visit(ast, {
            names: [],
        visitFunctionDeclaration: function(path) {
            console.log(path)
                var node = path.value;
                this.visitor.names.push(node.name);
                console.log(this.visitor.names)
                this.traverse(path);
            }
    });
});


//const recast  = require('recast')
//recast.run(function(ast, printSource) {
//    recast.visit(ast, {
//        visitExpressionStatement: function(path) {
//            const node = path.node
//            printSource(node)
//            this.traverse(path)
//        }
//    })
//});