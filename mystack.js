/**
 * push 添加一个元素到栈顶
 * pop 弹出栈顶元素，但是有返回值，就是弹出的那个元素
 * top 返回栈顶的元素，只是看一眼，不拿出
 * isEmpty 判断栈是否为空
 * size 返回栈元素的个数
 * clear 清空栈
 * @constructor
 *
 * v1.0 只是单纯了解栈的数组实现形式，健壮性不做过多要求
 *
 * 1.对数组的封装，栈太简单？
 *  栈是种概念，既然会数组，为什么不用它实现栈，是不知道栈的概念，还是不知道栈的的具体方法，无论
 *  哪种情况，栈对你都是全新的知识
 *
 * 2.既然栈的底层实现是数组，栈能做的事情，数组也能做，为什么弄一个栈出来，不是多此一举吗？
 * 封装是为了隐藏实现的细节，站在栈的肩膀思考问题显然要比站在数组的肩膀思考问题更方便
 *
 *
 *
 */
function Stack() {
    var items = []; // 使用数组存储数据

    /**
     * 从栈顶添加元素，也叫压栈
     * @param item
     */
    this.push = function (item) {
        items.push(item)
    }

    /**
     * 弹出栈顶元素
     * @returns {T}
     */
    this.pop = function () {
        return items.pop()
    }

    /**
     * 返回栈顶元素
     * @returns {*}
     */
    this.top = function () {
        return items[items.length - 1]
    }

    /**
     * 判断栈是否为空
     * @returns {boolean}
     */
    this.isEmpty = function () {
        return items.length === 0
    }

    /**
     * 返回栈的大小
     * @returns {Number}
     */
    this.size = function () {
        return items.length
    }

    /**
     * 清空栈
     */
    this.clear = function () {
        items = []
    }

}

/**
 * 下面的字符串包含小括号，请编写一个函数判断字符串中的括号是否合法，所谓合法，就是括号成对出现
 *
 * sdf(asd(aas(dddd)aa))
 * asdas(dd)(asdas(aaaa)dsa)()vvvv
 * asd(asd)((asdsad)asdsadsad)(asd(asdsad)(
 *
 * 思路：
 * 循环整个字符串
 * 遇到左括号。压入栈中
 * 遇到右括号，判断栈是否为空，为空缺乏左括号，不为空，移除栈顶左括号
 * for循环结束，如果栈中还有元素，说明缺乏右括号
 *
 *
 * 场景：
 * 1.代码编译器，格式校验
 * 2.word文档的撤销和恢复
 */
function is_leagl_brackets(string) {
    var stack = new Stack()
    for (var i = 0; i < string.length; i++) {
        var item = string[i]
        // 遇到左括号入栈
        if (item === '(') {
            stack.push(item)
        } else if (item === ')') {
            // 遇到右括号，判断栈是否为空
            if (stack.isEmpty()) {
                return false
            } else {
                stack.pop()
            }
        }
    }
    // 如果栈为空，说明字符串括号合法
    return stack.isEmpty()
}
//console.log(is_leagl_brackets('sdf(asd(aas(dddd)aa))'))
//console.log(is_leagl_brackets('asdas(dd)(asdas(aaaa)dsa)()vvvv'))
//console.log(is_leagl_brackets('asd(asd)((asdsad)asdsadsad)(asd(asdsad)('))

/**
 * 逆波兰表达式，也叫后缀表达式，它将复杂表达式转换为可以依靠简单的操作得到计算结果的表达式，
 * 例如：（a+b）*（c+d）转换为ab+cd+*
 *
 * 前缀、中缀、后缀表达式(逆波兰表达式)
 * https://www.cnblogs.com/chensongxian/p/7059802.html
 *
 * 后缀表达式好处
 * 计算机是使用后缀表达式计算公式的，它不会像人类一样用中缀表达式做，效率太低
 *
 *  运算符前2个数加起来运算符计算出结果，替换这3个数
 *  [4, 13, 5, /, +]
 *  [4, 2, +]
 *  这个思路太low，太复杂
 *
 *  用栈实现的思路
 *  遍历数组
 *  如果元素不是运算符，压栈
 *  如果是运算符，则从栈弹出2个元素，计算，将结果从新压栈
 *  注意：运算符左边是栈的次顶元素，右边是顶元素
 *  循环结束，栈里只会剩下一个元素，就是计算结果
 *
 */
function calc_exp(exp){
    var stack = new Stack()
    for (var i = 0; i < exp.length; i++) {
        var item = exp[i]
        if(["+", "-", "*", "/"].indexOf(item) > -1) {
            var value_1 = stack.pop()
            var value_2 = stack.pop()
            // 注意2个数字在运算符的左右位置
            var exp_str = value_2 + item + value_1
            // 计算
            var res = parseInt(eval(exp_str))
            // 计算结果压入栈中
            stack.push(res.toString())
        } else {
            stack.push(item)
        }
    }
    return stack.pop()
}
//console.log(calc_exp(['4', '13', '5', '/', '+']))

/**
 * 实现一个有min方法的栈
 *
 * 除了常见的push，pop方法之外，提供min方法，返回栈里最小的元素，而且时间复杂度为o(1)
 * 意味着只能循环一次
 *
 * 时间复杂度
 * https://blog.csdn.net/qq_41523096/article/details/82142747
 * 如何推导出时间复杂度呢？有如下几个原则：如果运行时间是常数量级，用常数1表示；只保留时间函数中的最高阶项；如果最高阶项存在，则省去最高阶项前面的系数。
 *
 * 思路
 * 2个栈去实现，一个存放栈的原数据，一个存放当前栈的最小值，
 * 注意，push_2的空间复杂度比push要低
 */
function MinStack() {
    var data_stack = new Stack()
    var min_stack = new Stack()

    this.push = function (item) {
        data_stack.push(item)
        /**
         * 这里是最关键的地方，如果min_stack是空或者不大于min_stack的顶元素，直接push到min_stack的栈顶
         * 如果都不符合，为了保持和data_stack数量一致，肯定也要push进一个值，那这个值就是原来栈顶的的最小值
         * 为什么呢？这样在pop操作之后，data_stack和min_stack同时pop后，min_stack的栈顶还能继续保持最小值，就是
         * data_stack中的那个最小值，
         *
         */
        if (min_stack.isEmpty() || item < min_stack.top()) {
            min_stack.push(item)
        } else {
            min_stack.push(min_stack.top())
        }
    }
    /**
     * 换个思路，如果min_stack是空或者不大于min_stack的顶元素，直接push到min_stack的栈顶
     * 如果都不符合，不放值
     * 注：考虑有2个相同的最小值的情况，所以才是不大于
     */
    this.push_2 = function (item) {
        data_stack.push(item)
        if (min_stack.isEmpty() || item <= min_stack.top()) {
            min_stack.push(item)
        } else {
        }
    }
    /**
     * 直接保持data_stack，和min_stack里面数据的数量是一致的
     */
    this.pop = function () {
        data_stack.pop()
        min_stack.pop()
    }
    /**
     * 需要在pop方法上做文章，判断data_stack栈pop的值不大于min_stack栈顶的最小值，
     * 是的话不处理min_stack，反之min_stack.pop
     */
    this.pop_2 = function() {
        var temp = data_stack.pop()
        if (temp > min_stack.top()) {

        } else {
            min_stack.pop()
        }
    }
    this.min = function () {
        return min_stack.top()
    }
}
var minstack = new MinStack()
//minstack.push(6)
//minstack.push(8)
//minstack.push(3)
//minstack.pop()
//console.log(minstack.min())
//minstack.push(2)
//console.log(minstack.min())
//minstack.pop()
//console.log(minstack.min())

minstack.push_2(6)
minstack.push_2(8)
minstack.push_2(3)
minstack.pop_2()
console.log(minstack.min())
minstack.push_2(2)
minstack.push_2(2)
console.log(minstack.min())
minstack.pop_2()
minstack.pop_2()
console.log(minstack.min())

/**
 * 中缀转后缀表达式
 */
function infix_exp_2_postfix_exp() {

}