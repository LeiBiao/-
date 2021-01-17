## scss->css

### 单文件转换

cmd ->  指定路径(powershell) -> node-sass  sass文件路径    css保存路径/文件名

![](images\sass.png)

### 多文件转换

cmd ->  指定路径(powershell) -> node-sass  sass文件夹路径  -o   css保存路径

![](images\scss2.png)

### 单文件监听

保存自动生成单个css(多按几次保存)

cmd ->  指定路径(powershell) -> node-sass  -w  sass文件路径    css保存路径/文件名

### 多文件监听

保存多个css

cmd ->  指定路径(powershell) -> node-sass  -w  sass文件夹 -o  css保存路径

### vscode插件

live sass compiler



## 变量

```css
// 定义
$color: red;
$font:40px;
$border-style:solid;
$border:$color $font $border-style;
//调用
body {
    background-color: $color;
    font-size: $font;
    border: $border;
}
```

## 嵌套&伪类

```css
$color:red;
$font:14px;
div {
    width: 200px;
    height: 200px;
    background-color: $color;
    font-size: $font;
    a {
        color: #fff;
        // （交集|伪类|伪元素选择器） ，利用&进行连接
        &:hover {
            color: yellow;
        }
    }
}
```

## 导入 

以下划线开头的scss文件,叫做局部css.

局部css不会生成对应的css文件

不以下划线,叫做全局scss

全局scss生成对应的css文件

一般在全局scss文件导入很多局部scss文件,最后形成一个css文件



导入时@import " 不加下划线  不加后缀 "

## 混合器

```SCSS
@mixin mycolor($num) {
    color: $num;
    border-color: $num;
    background: $num;
}

div {
    @include mycolor(#112);
}
```



### 运算

在做字符串拼接时,取决于+号前的字符是否带引号

```scss
div::before {
    content: "1元"+1元;//"1元1元"
    font-family: 雷+"彪";//雷彪
}
```

-号前后加空格

```css
$my-width:110px;
$you-width:100px;
div {
    width: $my-width - $you-width;
}
```

scss当中吧以下情况判定为除法

- 被除数为变量
- 被小括号包裹
- 除法为其它计算的一部分

```scss
p {
    width: $you-width/5;
    height: (100px/2);
    margin: 5px+8px/2;
}
```

字符串中用差值

#{1+2}

## 函数

### 预定义函数

round($num) 四舍五入

floor($num)  向下取整

ceil($num)    向上取整

max(...)

min(...)

### 自定义函数

关键字以前加@

变量以前加$

```scss
@function gift($s) {
    @if($s>95) {
        @return "优秀"
    }
    @if($s>80) {
        @return "良好"
    }
    @if($s<60) {
        @return "不合格"
    }
}

div::after {
    content: gift(91);
}
```





## less

### Less 变量

变量是指没有固定的值，可以改变的。因为我们CSS中的一些颜色和数值等经常使用。

```
@变量名:值;
```

+ 必须有@为前缀
+ 不能包含特殊字符
+ 不能以数字开头
+ 大小写敏感

## less嵌套

如果遇见 （交集|伪类|伪元素选择器） ，利用&进行连接

## less运算

+ 乘号（*）和除号（/）的写法  
+ 运算符中间左右有个空格隔开 1px + 5
+ 对于两个不同的单位的值之间的运算，运算结果的值取第一个值的单位 
+ 如果两个值之间只有一个值有单位，则运算结果就取该单位

## rem实际开发适配方案1

总结：

①最后的公式：页面元素的rem值 =  页面元素值（px） /  （屏幕宽度  /  划分的份数）

②屏幕宽度/划分的份数就是 htmlfont-size 的大小

③或者：页面元素的rem值 =  页面元素值（px） /  html font-size 字体大小

## rem实际开发适配方案2

github地址：[https://github.com/amfe/lib-flexible](https://link.jianshu.com/?t=https://github.com/amfe/lib-flexible)

因为flexible是默认将屏幕分为10等分

但是当屏幕大于750的时候希望不要再去重置html字体了

所以要自己通过媒体查询设置一下

并且要把权重提到最高

VSCode  px 转换rem 插件 cssrem 

因为cssrem中css自动转化为rem是参照默认插件的16转换的所以需要自己配置

