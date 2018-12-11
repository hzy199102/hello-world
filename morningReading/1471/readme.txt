https://mp.weixin.qq.com/s/EnS22WGKiXnTCdFnqrVahA
https://www.cnblogs.com/longqingyang/p/5787466.html
https://www.npmjs.com/package/recast
https://segmentfault.com/a/1190000015660623#articleHeader15

【第1471期】AST抽象语法树——最基础的javascript重点知识


(function(){ var a = function(){}; function b(){}; this.c = function(){ a(); b(); } })(); c();
(function(){ var a = function(){} function b(){} this.c = function(){ a(); b(); } })(); c();
体会上述2行代码的区别，答案在网址中


npm i recast -S