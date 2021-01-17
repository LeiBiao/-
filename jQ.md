[toc]
## 引入jq

1. 引入项目本地jQuery.js文件

   ```js
   <script src="jquery.min.js"></script>
   ```

2. 引入CDN网络中共享的jQuery.js文件

## 入口函数

$(function(){  ...   })   :HTML+js下载完成就提前触发

$(window).load(function(){...})    :   必须等HTML+css+js+img下载生成才触发



<!-- $是jQuery的别称 -->


## jQuery对象和DOM对象
1.原生js获取的对象是DOM对象
2.jQ获取的对象是jQ对象
3.jQ对象的本质是:利用$对Dom对象包装后产生的对象(伪数组形式储存)

```js
    // 以DOM获取    
        window.addEventListener('load', function() {   //入口函数
                var div = document.querySelector('div');
                console.dir(div);
            })
        //以jQ获取对象
        $(function() {                          //入口函数
            $('div');
            console.dir($('div'));

        })
```
##　jQ和Dom转换
DOM->jQ
$(DOM对象)

jQ->DOM
(1)   $('div')[index]
(2)   $('div')get(index) 



## jQ设置样式

$("div").css("属性","新值")

```js
        $("ul li").css("background", "red");
```
* 当.css()没有接到第二个型属性值实参时,默认执行读取旧属性值的操作-------相当于getComputedStyle()
* 当.css传入第二个型属性值实参时,自动切换为修改属性值的操作-------相当于.style.css属性

## jQ选择器

```js
<body>
    <button id="btn1">click me(0)</button>
    <button id="btn1">click me(0)</button>
    <button id="btn1">click me(0)</button>
    <script>
        var $btns = $("button");
        $btns.click(function() {
            // this属于dom的函数,jq需要封装
            var $this = $(this);
            var n = parseInt($this.html().slice(9, -1));
            n++;
            $this.html(`click me(${n})`);
        })
    </script>
</body>
```

不需要遍历  jq自带遍历

使用jq时 申明的变量加$(非强制)

this属于dom的函数,jq要使用需要封装

## 筛选选择器

$('li:first') 获取第一个li元素
$('li:last')  获取最后一个li元素
$('li:eq(2)') 获取li元素的索引为2的元素
$('li:odd')   获取li元素的索引为奇数的元素
$('li:even')  获取li元素的索引为偶数的元素

$('li:lt(i)')    选择整个查找结果中下标<i位置的所有元素

$('li:gt(i)')   选择整个查找结果中下标>i位置的所有元素

```js
        $("li:eq(1)").css("background", "red");
```
## 筛选方法
parent()       父级
children ()   相当于子代选择器
find()         相当于后代选择器

```js
<body>

    <div class="nav">
        <p>abc</p>
        <ul>
            <li>
            </li>
            <li>
                <p>123</p>
            </li>
            <li></li>
        </ul>
	</div>
</body>

<script>
    $(function() {
        console.log($("ul").parent()); //nav 
        $('.nav').children('p').css('color', 'red'); //abc
        $('.nav').find('p').css('background', 'black'); //abc 123


    })

</script>
```



next():用来获取下一个同辈元素。

prev():用来获取上一个同辈元素。

siblings()：用来获取所有的同辈元素。

hasClass  判断是否有类 返回t or f

```js
      <ul class="item">
        <li>0</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
    <div class="fun"></div>
    <div></div>
    <script>
        $(function() {
            $('li:eq(2)').siblings('li').css('color', 'red');
            $('.item li').eq(3).css('background', 'blue'); //3
            console.log($('div:eq(0)').hasClass('fun')); //true
            console.log($('div').eq(1).hasClass('fun')); //false
        })
```
​         1). :contains(关键词) 选择内容中包含指定关键词的元素

​         2). :has(选择器) 选择包含符合选择器要求的子元素的父元素

​         3). :empty 选择没有任何内容的空元素

​         4). :parent :empty的反义词，选择内容不为空的元素

```js
<body>
    <div class="container">
        <h1>jQuery中的选择器——内容过滤选择器</h1>

        <button>提交订单</button>
        <button>Submit注册信息</button>
        <button>马上提交</button>
        <button>清空重填</button>

        <hr/>
        <div class="alert" id="alert1"></div>
        <div class="alert" id="alert2">
            <span class="close">×</span>
        </div>

    </div>
    <script src="js/jquery-1.11.3.js"></script>
    <script>
        //选择包含"提交"二字的按钮，变为绿色按钮
        $("button:contains(提交)")
            .css("background-color", "lightGreen")
            //选中包含.close按钮的.alert元素，让它们变为红色的警告框
        $(".alert:has(.close)")
            .css("background-color", "pink")
            //选中不包含.close按钮的.alert元素，让它们变为绿色的警告框
        $(".alert:not(:has(.close))")
            .css("background-color", "lightGreen")
            //给空的div添加红色阴影
        $(".alert:empty")
            .css("box-shadow", "0 0 5px red")
            //给非空的div添加绿色阴影
        $(".alert:parent")
            .css("box-shadow", "0 0 5px green")
    </script>
</body>
```

:input 选择一个表单中所有的表单元素(input select button textarea)

 :text  :password  :radio  :checkbox ... ...

​             每种input的type属性值都对应着一个专门的选择器



```js
<body>
    <form>
        用户名:<input disabled><span>*</span></br>
        密码:<input type="password" disabled><span>*</span></br>
        <input type="checkbox">我同意本站的使用条款<br>
        <input type="submit" value="提交注册信息" disabled/>
    </form>
    <script src="js/jquery-1.11.3.js"></script>
    <script>
        var $chb = $(":checkbox")
        $chb.click(function() {
            var $others = $(":input:not(:checkbox)");
            var $this = $(this);
            if ($this.prop("checked") == true) {
                $others.prop("disabled", false);
            } else {
                $others.prop("disabled", true);
            }
        })
    </script>
</body>
```



## 排他思想

```js
    <button>BUTTON</button>
    <button>BUTTON</button>
    <button>BUTTON</button>
    <button>BUTTON</button>
    <script>
        $(function() {
            //影视迭代 给所有按钮都绑定事件 不用for循环
            $("button").click(function() {
                $(this).css('background', 'blue');
                $(this).siblings("button").css('background', '');
           //   $(this).css("color", "red").siblings().css("color", "");
            })
        })

```

   <!-- 链式编程 -->
`$(this).css("color", "red").siblings().css("color", "");`


## 样式操作
###　css
```html

        div {
            width: 200px;
            height: 200px;
            background-color: greenyellow;
        }
    </style>

    <div>123</div>
    <script>
        $(function() {
            $('div').click(function() {
                $(this).css({
                    width: 300,
                    height: 300,
                    backgroundColor: "red"
                })
            })
        })
    </script>
```

### 类

1.添加类 addClass()

```js
$(this).addClass("current");
```

2.删除类 removeClass()

```js
$(this).removeClass("current");
```

3.切换类 toggleClass()

```js
$(this).toggleClass("fn");
```

4.判断是否包含class   hasClass();

```js
    <style>
        div {
            width: 150px;
            height: 150px;
            background-color: pink;
            margin: 100px auto;
            transition: all 0.5s;
        }
        
        .current {
            background-color: red;
            transform: rotate(360deg);
        }
        
        .fn {
            background-color: green;
            transform: rotate(360deg);
        }
    </style>
    <script src="jquery.min.js"></script>
</head>

<body>
    <div class="current"></div>
    <script>
        $(function() {
            // 1. 添加类 addClass()
            $("div").click(function() {
                $(this).addClass("current");
            });
            // 2. 删除类 removeClass()
            $("div").click(function() {
                $(this).removeClass("current");
            });
            // 3. 切换类 toggleClass()
            $("div").click(function() {
                $(this).toggleClass("fn");
            });
        })
    </script>
</body>
```
##　鼠标事件

mouseenter 鼠标移入

mouseleave鼠标移出

mouseenter 和mouseleave代替DOM的mouseover和mouseout

好处: 如果频繁进入子元素,就不会触发父元素上的事件处理函数了

### 切换事件

hover([over,]out)

out:当鼠标移到元素上或移出元素时触发执行的事件函数

如果同时绑定mouseenter 和mouseleave事件时,可以用  $元素.hover ( function(){...},function(){...} )

由于hover绑定的是移入和移出两个事件,所以在hover中需要先入两个函数和移入和移出事件

```html
    <style>
        #d1 #d2 #d3 {
            cursor: pointer
        }
        
        #d1 {
            background-color: green;
            position: relative;
            width: 150px;
            height: 150px;
            text-align: center;
            cursor: pointer;
        }
        
        #d2 {
            background-color: blue;
            position: absolute;
            top: 25px;
            left: 25px;
            width: 100px;
            height: 100px;
        }
        
        #d3 {
            background-color: red;
            position: absolute;
            top: 25px;
            left: 25px;
            width: 50px;
            height: 50px;
            line-height: 50px;
        }
    </style>

</head>

<body>
    <div id="d1">
        <div id="d2">
            <div id="d3">
            </div>
        </div>
    </div>
    <script src="js/jquery-1.11.3.js"></script>
    <script>
        //只在最外层d1绑定鼠标进入和鼠标移出事件
        // $("#d1").mouseenter(function() {
        //     console.log(`进入d1`)
        // }).mouseleave(function() {
        //     console.log(`移出d1`)
        // })

        $("#d1").hover(
            function() {
                console.log(`进入d1`)
            },
            function() {
                console.log(`移出d1`)
            }
        )
    </script>
</body>
```



当将鼠标进入的事件处理函数和鼠标移出时的事件处理函数完全一样时,就可以只写一个函数

```html
    <style>
        #target {
            border: 1px solid #eee;
        }
        
        .bg {
            background-color: red;
        }
    </style>
</head>

<body>
    <div id="target">
        <p>Lorem ipsum dolor sit amet</p>
    </div>
    <script src="js/jquery-1.11.3.js"></script>
    <script>
        $("#target")
            // .hover(
            // 	function(){
            // 		$(this).addClass("bg")
            // 	},
            // 	function(){
            // 		$(this).removeClass("bg")
            // 	}
            // )
            .hover(
                function() {
                    $(this).toggleClass("bg")
                }
            )
    </script>
</body>
```



## 模拟触发

$元素.tirgger("事件名")

trigger() 方法触发被选元素的指定事件类型。

```js
<body>
    <input id="kw"><button>百度一下</button>
    <script src="js/jquery-1.11.3.js"></script>
    <script>
        $("button").click(function() {
            var kw = $("#kw").val().trim()　;
            if (kw !== "") {
                console.log(`查找 ${kw} 相关的内容...`)
            }
        })

        // $("#kw").keydown(function(e) {
        $("#kw").keyup(function(e) {
            if (e.keyCode == 13) {
                $("button").click();
                // 执行keyup事件时click事件被触发
                //$("button").trigger("click");
            }
        })
    </script>
</body>
```



## 动画

### 显示  隐藏   切换
show([speed],[easing],[fn])
hide([speed],[easing],[fn])
toggle([speed],[easing],[fn]);

### 滑动
slideDown([speed],[easing],[fn])向下增大
slideUP([speed],[easing],[fn])向上减小
slideToggle([speed],[easing],[fn])切换

### 动画队列
动画一旦触发就会执行,如果多次触发,就会造成多个动画排队执行

 jq中新增了一个选择器":animated"，专门匹配正在播放animate()动画的元素！

 jq中新增了一个函数: `var bool=$元素.is("选择器")`，专门判断当前元素是否符合选择器的要求！

#### 停止排队
`stop()要写在动画或效果前面`
stop()  :默认只停止队列中第一个正在播放的动漫

stop(true) 即停止第一个动漫,又清空动画队列

### 淡入淡出
fadeIn([speed],[easing],[fn])
fadeOut([speed],[easing],[fn])
fadeToggle([speed,[easing],[fn]])
fadeTo([[speed],opacity,[easing],[fn]])更改不透明渡

###　自定义动画
animate(params,[speed],[easing],[fn])
params:一组包含作为动画属性和终值的样式属性和及其值的集合,以对象的格式书写

 jq的动画函数，最后一个回调函数参数, 凡是写在动画函数最后一个回调函数参数中的代码，只能在动画函数结束后才能自动执行

```js
 <style>
        .box {
            position: absolute;
            width: 300px;
            height: 250px;
            background-color: yellow;
        }
    </style>
    <script>
        $(function() {
            $(".box").click(function() {
                $(this).animate({
                    left: 500,
                  //  opacity: .4
                }, 1000,function(){
                     $(this).hide();
                })
            })
        })
    </script>

```

## 属性操作
### 获取或更改元素固定的属性值
prop("属性","属性值");

bool类型只能用prop

```js
<script>
        $(function() {
            $("input").prop("value", "456")
        })
    </script>
</head>

<body>
    <input type="text" name="" id="" value="123">
</body>
```

### 获取或更改元素自定义的属性值
attr("属性")             类似原生getAttribute()
attr("属性","属性值")    类似原生setAttribute()

```js
   <script>
        $(function() {
            $("div").attr("index", 2)
        })
    </script>
</head>

<body>
    <div index="1"></div>
</body>

```
### 数据缓存
data("属性","属性值")
<!-- 讲数据储存在该元素的缓存里  -->

```js
  $(function() {
    $("span").data("uname", 2) //DOM里不显示
    console.log($("span").data("uname")); //2
    })
<body>
    <span></span>
</body>
```

## 内容文本值
### 获取设置元素内容
html()            相当于原生innerHTML

```html
  <script>
        $(function() {
            // console.log($("div").html());
            // 输出以下结果
            // <span>
            //     123
            // </span>
            $("div").html("456")
                //将123改成456
        })
    </script>
</head>

<body>
    <div>
        <span>
            123 
        </span>
    </div>
```

### 获取设置文本内容
text()  相当于原生的innerText
```js
$(function() {
        // console.log($("div").text());
        // 输出以下结果
        //     123
        $("div").text("456")
            //将123改成456
    })
```

### 获取设置表单值



val()   相当于原生的value

```html
 <script>
        $(function() {
            console.log($("input").val()); //     123
            // $("div").text("456")      //  456
        })
    </script>
</head>

<body>
    <input type="text" value="123">
</body>

```


## each()遍历
`$("div").each(function(index,domEle){})`
- domEle返回的是dom元素
- 想要使用jq方法,就该给改dom元素转换为jq对象$(domEle)

```html
    <script>
        $(function() {
            var color = ["red", "black", "blue"];
            $("div").each(function(i, domEle) {
                $(domEle).css("background", color[i]);

            })
        })
    </script>
</head>

<body>
     <div>1</div>  <!-- 红 -->
    <div>3</div>     <!-- 黑 -->
    <div>3</div> <!-- 蓝 -->
</body>

```
`$.each(obj,function(index,domEle){})`
- 主要用于数组,对象处理
- console.log(index)  输出属性名
- console.log(domEle)  输出属性值


## 元素增删改

 ### 创建元素
 $("添加的内容以及标签");


 ### 添加元素
#### 内部添加 
`append(); // 放到元素后面`
`prepend();   //放到元素前面`

```html
 <script>
        $(function() {
            // 创建元素
            var li = $("<li>添加</li>");
            // 内部添加
            // $("ul").append(li); // 放到元素后面
            $("ul").prepend(li);   //放到元素前面
        })
    </script>
</head>

<body>
    <ul>
        <li>b</li>
    </ul>
</body>
```

#### 外部添加
`after();` // 放到元素后面

`before();`//放到元素前面

`replaceWith()`//替换一个现有元素

```html
 <script>
        $(function() {
            // 创建元素
            var div = $("<div>添加</div>");
            // 外部添加
            //$(".text").before(div); // 放到元素前面
            $(".text").after(div); //放到元素后面
        })
    </script>
</head>

<body>
    <div class="text">b</div>
</body>

```

### 删除元素
remove() 删除本身
empty()   删除子节点
html("")  清空匹配元素内容

```html
 <script>
        $(function() {
            //$("li:eq(0)").remove(); //2 3
            //$("ul").remove(); //空
            $("li:eq(0)").html(""); //li还存在但内容没了
        })
    </script>
</head>

<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
```

### 克隆节点

`.clone()`

```js
<style>
        body {
            text-align: center;
        }
        
        div {
            width: 100px;
            height: 100px;
        }
        
        #chosen div {
            background: #000;
        }
    </style>
</head>

<body>
    <h1>替换节点</h1>

    <div id="chosen">
        <div></div>
    </div>
    <hr/>
    <div id="list">
        <div style="background: #ffff00;"></div>
        <div style="background: #0f0;"></div>
        <div style="background: #0ff;"></div>
    </div>

    <script src="js/jquery-1.11.3.js"></script>
    <script>
        $("#list>div").click(function() {
            //点下方的div要修改上方id为chosen的div
            var $chosen = $("#chosen div");
            //先将当前选中的div，克隆一个副本，
            var $div2 = $(this).clone();
            //再用副本替换上方的div
            $div2.replaceAll($chosen);
        })
    </script>
```



## 事件处理 

### on()绑定事件
on(events,[selector],[data],fn)

events:一个或多个用空格分隔的事件类型和可选的命名空间，如"click"或"keydown.myPlugin" 。

selector:一个选择器字符串用于过滤器的触发事件的选择器元素的后代。如果选择的< null或省略，当它到达选定的元素，事件总是触发。

data:当一个事件被触发时要传递event.data给事件处理函数。

fn:该事件被触发时执行的函数。


```html
   <script>
        $(function() {
            $("div").on({
                mouseover: function() {
                    $(this).css("background", "red");
                },
                mouseleave: function() {
                    $(this).css("background", "yellow");
                }
            })
        })
    </script>
    <style>
        div {
            width: 150px;
            height: 150px;
            background-color: blue;
        }
    </style>
</head>

<body>
    <div></div>
</body>

```

或者

```html
 <script>
        $(function() {
            $("div").on("mouseover mouseleave", function() {
                $(this).toggleClass("bc");
            })
        })
    </script>
    <style>
        div {
            width: 150px;
            height: 150px;
            background-color: blue;
        }
        
        .bc {
            background-color: brown;
        }
    </style>
</head>

<body>
    <div></div>
</body>

```

#### on实现事件委派
```html
<script>
        $(function() {
            $("div").on("click", "p", function() {
                $(this).html("a");
            })
        })
    </script>

</head>

<body>
    <div>
        <p>1</p>
        <p>2</p>
    </div>
```
#### on实现动态绑定事件

```html
  <script>
        $(function() {
            // 给新创建的元素进行绑定
            $("div").on("click", "p", function() {
                $(this).html("a");
            })
            var p = $("<p>新创建的</p>");
            $("div").append(p);
        })
    </script>

</head>

<body>
    <div>
    </div>
</body>
```

### 事件解除绑定
$("div").off()  //解绑div元素的所有事件处理程序
$("div").off("click)//解绑div元素上面的点击事件
$("div").off("click","li") //解绑事件委托

### one() 只触发一次
不需要解绑

###  事件拷贝
$.extend([deep], target, object1, [objectN])

deep:如果设为true，则递归合并(深拷贝)。

target:待修改对象。

object1:待合并到第一个对象的对象。

objectN:待合并到第一个对象的对象。


## jq尺寸
width()/height()  取得匹配元素的宽度和高度值 只算width/height
innerWidth()/innerHeight()  取得匹配元素的宽度和高度值 包括padding
outerWidth()/outerHeight()  取得匹配元素的宽度和高度值 包括padding,border
outerWidth(true)/outerHeight(true)  取得匹配元素的宽度和高度值 包括padding,border,margin

## jq位置
jQuery的位置操作主要有三个： offset()、position()、scrollTop()/scrollLeft()
`offset()`
获取匹配元素在当前视口的相对偏移。
返回的对象包含两个整型属性：top 和 left，以像素计。此方法只对可见元素有效。
`position()`
获取匹配元素相对父元素的偏移。
返回的对象包含两个整型属性：top 和 left。为精确计算结果，请在补白、边框和填充属性上使用像素单位。此方法只对可见元素有效。
`scrollTop()`
获取匹配元素相对滚动条顶部的偏移。
此方法对可见和隐藏元素均有效。

## 自定义函数

jQuery.prototype.自定义函数名 = function() {...}

简写:jQuery.fn.自定义函数名 = function() {...}

```js
<body>
    <ul>
        <li>85</li>
        <li>91</li>
        <li>73</li>
        <li>59</li>
    </ul>
    <script src="./js/jquery-1.11.3.js"></script>
    <script>
        // jQuery.prototype.sum = function() {
        jQuery.fn.sum = function() {
            var count = 0;
            // this指向$("ul li")
            this.each(function(i, elem) {
                $elem = $(elem)
                count += parseInt($elem.html())
            })
            return count;
        }
        console.log($("ul li").sum());
    </script>
</body>
```



## .ajax

```js
 $.ajax({
            url: "服务器接口地址",
            type: "请求类型",
     		data:{参数名:参数值,....}//如果服务器端端的接口不需要带参数则可以省略data
            dataType: "返回值类型",
            success: function(result) {}//请求响应成功结束后自动调用 ,result收到的是服务器端返回的结果
        })
```

1. type:请求类型,get   post
2. dataType :返回值的类型,因为服务器接口返回的是json字符串格式的数据,所以dataType会自动调用JSON.parse()将返回的json字符串转换为js内存中的数组或对象

`不带参数`

```js

<body>
    <table id="data">
        <thead>
            <tr>
                <th>名称</th>
                <th>描述</th>
                <th>单价</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
    <script src="./js/jquery-1.11.3.js"></script>
    <script>
        $.ajax({
            url: "http://xzserver.applinzi.com/index",
            type: "get",
            dataType: "json",
            success: function(result) {
                console.log(result);
                for (var p of result) {
                    $(` <tr>
                            <th>${p.title}</th>
                            <th>${p.details}</th>
                            <th>${p.price.toFixed(2)}</th> 
                        </tr>`).appendTo("#data tbody");
                }
            }
        })
    </script>
</body>

```

`带参数`

```js

<body>
    <ul>
        <li>品名: <span id="title"></span></li>
        <li>描述: <span id="subtitle"></span></li>
        <li>单价: ¥<span id="price"></span></li>
        <li>服务承诺: <span id="promise"></span></li>
    </ul>
    <script src="./js/jquery-1.11.3.js"></script>
    <script>
        //!!!地址栏: xxx.html?lid=10

        //从地址栏获得查询字符串参数
        var search = location.search;
        //如果有查询字符串参数的话
        if (search !== "") {
            console.log(search);
            //将search按=切割，然后取第二部分商品编号值
            var lid = search.split("=")[1];
            //想从东哥新浪云服务器请求5号商品的详细信息
            $.ajax({
                url: "http://xzserver.applinzi.com/details",
                type: "get",
                //将从地址栏获得的商品编号值，传到服务器上，作为查询商品详细信息的条件。
                data: {
                    lid
                }, //{ lid:lid },
                dataType: "json",
                success: function(result) {
                    console.log(result);
                    var {
                        product
                    } = result;
                    var {
                        title,
                        subtitle,
                        price,
                        promise
                    } = product;
                    $("#title").html(title);
                    $("#subtitle").html(subtitle);
                    $("#price").html(price.toFixed(2));
                    $("#promise").html(promise);
                }
            })
        }
    </script>
</body>

```

`post`

```js

<body>
    用户名:<input><br/> 密码:
    <input type="password"><br/>
    <button>登录</button>
    <script src="./js/jquery-1.11.3.js"></script>
    <script>
        $("button").click(function() {
            var uname = $(":text").val();
            var upwd = $(":password").val();
            $.ajax({
                url: "http://xzserver.applinzi.com/users/signin",
                type: "post",
                data: {
                    uname,
                    upwd
                },
                dataType: "json",
                success: function(result) {
                    console.log(result);
                    if (result.ok == 1) {
                        alert(`登录成功，欢迎${result.uname}`);
                    } else {
                        alert(`登录失败, ${result.msg}`)
                    }
                }
            })
        })
    </script>
</body>
```



### 跨域

当前的网页地址与请求的地址的**域名、端口号、协议**任意一个不同时，会有同源策略的限制。

​     (1). 域名不同: 

​     http://www.a.com/网页 -> http://www.b.com/资源

​     (2). 子级域名不同: 

​     http://hr.tedu.com/网页 -> http://oa.tedu.com/资源

​     (3). 端口号不同: 

​     http://localhost:5500/网页 -> http://localhost:3000/资源

​     (4). 协议不同: 

​     http://12306.cn/网页 -> https://12306.cn/资源

​     (5). 即使同一台机器，IP与域名之间互访也算跨域

​     http://localhost/网页 -> http://127.0.0.1/资源

#### 同源策略(Cross Origin Resoures Sharing)



解决跨域问题:

1. CORS方式

   - 服务器端必须知道客户端网站的域名或ip地址，受局限。

   - **需要服务器端设置 (同源策略) Access-Control-Allow-Origin  为客户端网站的域名或ip地址**

     res.writeHead(200,{

     ​         "Access-Control-Allow-Origin":"http://客户端地址:端口号",

     ​         ... : ...

     ​     })。

     

     ```html
     <body>
         <script src="../js/jquery-1.11.3.js"></script>
         <script>
             $.ajax({
                 url: "http://localhost:3000",
                 type: "get",
                 success: function(result) {
                     document.write(`<h1>通过5500端口返回的数据:${result}</h1>`)
                 }
             })
         </script>
     </body>
     ```

     ```js
     //引入http模块
     const http = require("http"); //内置核心模块
     //创建一个支持http请求的服务器端程序
     var server = http.createServer(
         function(req, res) {
             //假设服务器端可以返回天气数据
             var weather = "北京 阴23~29度";
             //配置响应结果头部信息，要求客户端浏览器必须使用utf-8编码来解析返回的内容
             res.writeHead(200, {
                 "Content-Type": "text/plain;charset=utf-8",
                 //添加跨域访问，将返回的数据头伪装为和客户端网页所在的地址一模一样的地址: http://127.0.0.1:5500
                 "Access-Control-Allow-Origin": "http://127.0.0.1:5500"
             });
             res.write(weather);
             res.end();
         }
     );
     //让服务器对象启动监听3000端口
     server.listen(3000);
     ```

     

2. JSONP方式

   -  JSONP方式，服务器端无需知道任何客户端的IP或域名，没有局限。
-  由于script 标签 src 属性中的链接可以访问跨域的js脚本, 服务端不再返回JSON格式的数据，而是返回一段调用某个函数的js代码,  在src中进行了调用，这样实现了跨域
   
   ```js
   <body>
       <script>
           function doit(data) {
               console.log(`自动调用了doit()`)
               alert(data);
               console.log(data);
           }
       </script>
       <script src="http://localhost:3000?callback=doit">
           //接收一条js程序，并立刻执行js程序
       </script>
   </body>
```
   
   ```js
   //引入http模块
   const http = require("http"); //内置核心模块
   //创建一个支持http请求的服务器端程序
   var server = http.createServer(
       function(req, res) {
           // 获取到回调函数名
           var fun = req.url.split("=")[1];
           //假设服务器端可以返回天气数据
           var weather = "北京 阴23~29度";
           //配置响应结果头部信息，要求客户端浏览器必须使用utf-8编码来解析返回的内容
           res.writeHead(200, {
               "Content-Type": "text/plain;charset=utf-8",
           });
           res.write(`${fun}("${weather}")`);
           res.end();
       }
   );
   //让服务器对象启动监听3000端口
   server.listen(3000);
```
   

   
   3. http代理   (见vue)