/**
 * error: Unexpected token import
 * nodejs v8以上才支持 import
 * 尝试 npm install --save-dev babel-preset-env babel-cli
 */


import * as babylon from "babylon";
const code = `
    const abc = 5;
`;
const ast = babylon.parse(code);

/**
 * babel.plugins的核心就是AST处理
 */
import traverse from "babel-traverse"

traverse(ast, {
    enter(path) {
        if (path.node.type === 'Identifier') {
            path.node.name = path.node.name.split("").reverse().join("");
        }
    }
});

import gengerate from "babel-generator";

const newCode = gengerate(ast);

// 注意 \n 没有了
// { code: '\nconst cba = 5;', map: null, rawMappings: null }
console.log(newCode)
// const cba = 5;
console.log(newCode.code)