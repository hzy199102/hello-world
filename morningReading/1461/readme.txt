https://mp.weixin.qq.com/s/0-k1xZr8-nPCakN-jnfRnQ
the-super-tiny-compiler

https://astexplorer.net/
【第1461期】平庸前端码农之蜕变 — AST

npm i babylon -S
npm i babel-traverse -S
npm i babel-generator -S
npm install --save-dev babel-preset-env babel-cli 为了支持es6

nodejs 支持es6
1.升级nodejs到8
2.
a.引入babel-preset-env babel-cli
b.新建.babelrc
{
    "presets": ["env"]
}
c.建立index.js，
require("babel-register");
require("./demo.js");
注：不要在demo.js头部直接放置require("babel-register");，那样无效


