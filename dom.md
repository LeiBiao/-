# DOM

`文档对象模型`
`DOM就是把[文档]当做一个对象来看待`
`DOM的顶级对象是document`
`DOM主要学习的是操作页面元素`
`DOM是w3c标准`

document 文档   
element  元素   



###　1. 元素的获取

#### 1.1节点数

<!-- 父节点 parentNode -->

- 得到的是离元素最近的父级节点 如果找不到父节点就返回为 null

<!-- 子节点children -->

```html
    <ol>
        <li>我是li1</li>
        <li>我是li2</li>
        <li>我是li3</li>
        <li>我是li4</li>
        <li>我是li5</li>
    </ol>
    <script>
        var ol = document.querySelector('ol');
        // 1. firstChild 第一个子节点 不管是文本节点还是元素节点
        console.log(ol.firstChild);
        console.log(ol.lastChild);
        // 2. firstElementChild 返回第一个子元素节点 ie9才支持
        console.log(ol.firstElementChild);
        console.log(ol.lastElementChild);
       
        // 3. 实际开发的写法 操作元素树  既没有兼容性问题又返回第一个子元素
        console.log(ol.children[0]);
        console.log(ol.children[ol.children.length - 1]);
    </script>
```



#### 1.2元素树

children              所有直接子元素

children[1]          下表为1的子元素

firstElementChild     第一个子元素

lastElementChild      最后一个子元素

nextElementSibling     下一个相邻元素

previousElementSibling   上一个相邻元数

```html
<body>
    <span id="s1">Hello</span>
    <h1>标题一</h1>
    <script>
        var body = document.body;
        //获得body下所有直接子元素
        var children = body.children;
        console.log(children);
        //想获得body下第一个孩子span
        var span = body.firstElementChild;
        console.log(span);
        //想获得body下最后一个孩子script
        var script = body.lastElementChild;
        console.log(script);
        //想获得body下的h1元素
        //var h1=span.nextElementSibling  //span的下一个相邻元素
        //var h1=script.previousElementSibling  //scipt的上一个相邻元素
        var h1 = body.children[1];
        console.log(h1);
    </script>
</body>
```



<!-- 通过id选择器获取元素 -->
`document.getElementById('id') ;`

`console.dir`
打印返回的元素对象,更好的查看里面的属性和方法

``` html
<body>
    <div id="neme">
         loream;
    </div> 
    <script>
        var timi = document.getElementById('neme');
        console.dir(timi);
    </script>
</body>
```

**注意**

在es6中用id选择器，也以直接用id名获取对象

```html
<body>
    <div id="neme">
        loream;
    </div>
    <script>
        console.dir(neme);
    </script>
</body>
```





<!-- 返回带有指定标签的对象集合 -->
`document.getElementsByTagName('标签名');`

- 得到的是一个对象集合,需要对里面的元素进行遍历
- 得到的元素是动态的

``` html
<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>

    <script>
        var lis = document.getElementsByTagName('li')
        console.log(lis);
        console.log(lis[0]);
        for (var i = 0; i < lis.length; i++) {
            console.log(lis[i]);
        }
    </script>
</body> 
```


*例子*
<!-- 得到li里面的么lorem -->

``` html
<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
    <ul id="nav">
        <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li>
    </ul>
    <script>
        // 返回id=nav的li
        var navs = document.getElementById('nav');
        var lis = navs.getElementsByTagName('li');
        console.log(lis);
        for (var i = 0; i < lis.length; i++) {
            console.log(lis[i]);
        }
    </script>
</body>
```




<!-- 通过类名获得元素集合 -->
`document.getElementsByClassName('box')`

```html
<body>
    <div class="box">
        123
    </div>
    <div class="box">
        456
    </div>
    <script>
        var boxs = document.getElementsByClassName('box');
        console.log(boxs);
    </script>
</body>
```

` document.querySelector('选择器');`

<!-- 根据指定的选择器返回第一个元素的对象 -->

```html
<body>
    <div class="box">
        123
    </div>
    <div class="box">
        456
    </div>
    <div id="nav">
        <ul>
            <li>1</li>
            <li>2</li>
        </ul>
    </div>
    <script>
        var boxs = document.querySelector('.box');
        console.log(boxs);  //123
        var nav = document.querySelector('#nav');
        console.log(nav);  //nav
        var li = document.querySelector('li')
        console.log(li);   //1
    </script>
</body>
```

`document.querySelectorAll('选择器');`
<!-- 根据指定的选择器返回所有元素的对象 -->

```html
<body>
    <div class="box">
        123
    </div>
    <div class="box">
        456
    </div>
    <div id="nav">
        <ul>
            <li>1</li>
            <li>2</li>
        </ul>
    </div>
    <script>
        var box = document.querySelectorAll('.box');
        console.log(box);
        var li = document.querySelectorAll('li')
        console.log(li);
    </script>
</body>
```

#### 1.3特殊元素的获取

<!-- 获取document元素 -->

```js
console.log(document);
```

<!-- 获取head元素 -->

```js
console.log(document.head);
```

<!-- 获取body元素 -->

```html
    <script>
        var bodyEle = document.body;
        console.log(bodyEle);
    </script>
```

<!-- 获取html元素 -->

```html
    <script>
        var htmlEle = document.documentElement;
        console.log(htmlEle);
    </script>
```


<!-- 事件 -->
*例子：点击一个按钮，弹出对话框*
事件三要素:

- 事件源
- 事件类型
- 事件处理程序

``` html
<body>
    <button id="btn">
        button
    </button>
    <script>
        // 事件源 
        var btn = document.getElementById('btn');
        //事件类型  如:onclick 鼠标点击
        btn.onclick = function() {
            alert('Message'); //事件处理的程序
        }
    </script>
</body>
```

总结三步骤
1.获取事件源
2.注册事件
3.添加事件处理程序


## 2.鼠标事件

**click**:鼠标点击

**mouseover**鼠标经过

**mouseout**鼠标离开

**mousemove**鼠标移动

**mouseup**鼠标弹起

**mousedown**鼠标按下

**focus**获取焦点

**blur**失去焦点



##　3.改变元素内容

**innerText (textContent)和innerHTML的区别**

- 获取内容时的区别：

​	innerText(textContent)会去除空格和换行，而innerHTML会保留空格和换行	

- 设置内容时的区别：

​	innerText(textContent)不会识别html，而innerHTML会识别

## 4.修改标签属性

**获取属性值:**

1. 元素对象.属性名
2. 元素对象.getAttribute("属性名")

**修改属性值:**

1. 元素对象.属性名="替换值"
2. 元素对象.setAttribute("属性","替换值")

**判断是否包含某个属性值**

1. 元素对象.属性名!=="";
2. 元素对象.hasAttribute("属性值")

**移除属性**

1. 元素对象.属性名="";
2. 元素对象.removeAttribute("属性名")

```html
<body>
    <a id="a1" href="http://tmooc.cn">go to tmooc</a>
    <script>
        var a = document.getElementById("a1");
        console.log(a.href);
        a.title = "欢迎访问tmooc";
        console.log(a.target !== ""); //false
        a.target = "_blank";
        console.log(a.target !== ""); //true 
        a.target = "";
        console.log(a.target !== ""); //false
    </script>
</body>
```



##  5.表单元素的属性操作

**案例代码**
`表单里面的值 文字内容是通过 value 来修改的`
`disabled 禁用`

```html
<body>
    <button>按钮</button>
    <input type="text" value="输入内容">
    <script>
        var btn = document.querySelector('button');
        var input = document.querySelector('input');
        btn.onclick = function() {
            input.value = '被点击了';
            // 点击后禁用按钮
            this.disabled = true;// btn.disabled = true;
            // this 指向的是事件函数的调用者 btn
        }
    </script>
</body>
```

##  6.操作样式元素

方式1：通过操作style属性
`elemen.style`行内样式操作

```html
   <style>
        div {
            width: 200px;
            height: 200px;
            background-color: antiquewhite;
        }
    </style>
</head>

<body>
    <div>

    </div>
    <script>
        var div = document.querySelector('div');
        div.onclick = function() {
            this.style.backgroundColor = '#ccc';//行内样式操作 
        }
    </script>


```

方式2:获取计算后的样式

getComputedStyle(元素对象)

```js
<body>
    <h1 id="h1" style="color:#fff">Welcome</h1>
    <p>welcome to my web site</p>
    <script>
        var h1 = document.getElementById("h1");

        var style = getComputedStyle(h1);
        console.log(style.color);
        console.log(style.backgroundColor);
        console.log(style.fontSize);
        console.log(style);
    </script>
</body>
```

总结:

1. 要用程序修改一个元素的css属性时,用style
2. 要获取一个元素的css属性时,用getComputedStyle



## 7.通过操作className属性

`elemen.className`类名样式操作

- 如果想要保留原先的类名，我们可以写多类名选择器

``` html
  <style>
        div {
            height: 80px;
            width: 80px;
            background-color: black;
        }
        
        .box {
            float: left;
            width: 104px;
            height: 124px;
            background-color: aqua;
            margin: 15px;
        }
    </style>
</head>

<body>
    <div>
    </div>
    <script>
        var box = document.querySelector('div');
        box.onclick = function() {
            this.className = 'box';//类名样式操作
        }
    </script>
</body>
```

## 8.自定义扩展属性

如何: HTML5标准中有明确的规定: 

​         1). 在HTML中手工添加自定义扩展属性: 

​         <元素 data-自定义属性名="属性值">

​         2). 在js中获取或修改自定义属性的属性值: 

​         i.  不能用HTMLDOM的"元素.属性名"。不能用 .  的方式	

​         ii.  可以用旧核心DOM4个函数访问: 

​         getAttribute() setAttribute() hasAttribute()  removeAttribute() 

​        iii. 其实HTML5标准提供了简写的方式: (有兼容性问题)

​         元素.dataset.自定义属性名

```js
<input type="button" data-click="say" value="亮亮">

    var btn1=document.querySelector("[data-click=say]")
    // btn1.setAttribute("data-age",45);
    btn1.dataset.age=45;
    btn1.onclick=function(){
      //从当前按钮自己身上获得自定义age属性
      //var age=this.getAttribute("data-age");
      var age=this.dataset.age;
      console.log(`年龄${age}`);
    }

```



## 9.节点操作

### 9.1创建节点

`document.createElement(' ')`

### 9.2添加节点

` node.appendChild(child)` <!-- node 父级  child 是子级 后面追加元素 -->
` node.insertBefore(child, 指定元素); `   <!--  前面追加元素 -->

`node.replaceChild(child, 指定元素)  `    <!--  替换元素 -->

```js
var a = document.createElement("a");
        a.href = "http://tmooc.cn";
        a.innerHTML = "欢迎访问tmooc";
        console.log(a);


        document.body.appendChild(a);
        //想创建一个input文本框
        var input = document.createElement("input")
            //想把input插入在a之前？
        document.body.insertBefore(input, a);
        //想把input追加在a之后?
        document.body.appendChild(input)
            //想用input替换a
        document.body.replaceChild(input, a);
```

#### 9.2.1文本片段对象.createDocumentFragment()

`var frag = document.createDocumentFragment();`

将文本片段对象添加到页面以后会释放不会留在页面中,而节点添加了进去,避免了重复创建dom树

```js
   <style>
        table {
            width: 600px;
            border-collapse: collapse;
            text-align: center;
        }
        
        td,
        th {
            border: 1px solid #ccc
        }
    </style>

</head>

<body>
    <div id="data">
        <table>
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>薪资</th>
                    <th>年龄</th>
                </tr>
            </thead>
            <tbody data-tbody>
			//此处添加文本片段对象
            </tbody>
        </table>
    </div>
    <script>
        var json = [{
            "ename": "Tom",
            "salary": 11000,
            "age": 25
        }, {
            "ename": "John",
            "salary": 13000,
            "age": 28
        }, {
            "ename": "Mary",
            "salary": 12000,
            "age": 25
        }];
        // 创建文本片段对象临时存储新建节点
        var frag = document.createDocumentFragment();
        for (var emp of json) {
            var tr = document.createElement("tr");
            // 将创建的节点放入文档片段对象
            frag.appendChild(tr);
            for (var key in emp) {
                var td = document.createElement("td")
                    //并添加到tr
                tr.appendChild(td);
                td.innerHTML = emp[key];
            }
        }

        // 将整个frag追加到tbody中：
        var tbody = document.querySelector("[data-tbody]");
        tbody.appendChild(frag);
    </script>
</body>

```



### 9.3删除节点

` node.removeChild(child)`
<!-- node.removeChild() 方法从 node节点中删除一个子节点，返回删除的节点。 -->

```html
    <button>删除</button>
    <ul>
        <li>熊大</li>
        <li>熊二</li>
        <li>光头强</li>
    </ul>
    <script>
        // 1.获取元素
        var ul = document.querySelector('ul');
        var btn = document.querySelector('button');

        // 3. 点击按钮依次删除里面的孩子
        btn.onclick = function() {
            if (ul.children.length == 0) {
                // 当li删完以后按钮禁用
                this.disabled = true;
            } else {
                ul.removeChild(ul.children[0]);
            }
        }
    </script>
```

###  9.4复制（克隆）节点

1. ` node.cloneNode();` 括号为空或者里面是false 浅拷贝 只复制标签不复制里面的内容
2. `node.cloneNode(true);`          括号为true 深拷贝 复制标签复制里面的内容


```html
    <ul>
        <li>1111</li>
        <li>2</li>
        <li>3</li>
    </ul>
    <script>
        var ul = document.querySelector('ul');
        // 拷贝第一个元素li
        var lili = ul.children[0].cloneNode(true);
        // 将拷贝的元素放到末尾
        ul.appendChild(lili);
    </script>
```



##  10.事件高级

### 10.1事件监听

#### addEventListener()（IE9以后支持）

#### attachEvent       （ie9以前的版本支持）

​	eventTarget.attachEvent()方法将指定的监听器注册到 eventTarget（目标对象） 上，当该对象触发指定的事件时，指定的回调函数就会被执行。



```html
<button>传统注册事件</button>
<button>方法监听注册事件</button>
<script>
    var btns = document.querySelectorAll('button');
    // 1. 传统方式注册事件
    btns[0].onclick = function() {
        alert('hi');
    }
    btns[0].onclick = function() {
            alert('hao a u');
        }
   // 2. 事件侦听注册事件 addEventListener 
   // (1) 里面的事件类型是字符串 必定加引号 而且不带on
   // (2) 同一个元素 同一个事件可以添加多个侦听器（事件处理程序）
    btns[1].addEventListener('click', function() {
        alert(22);
    })
    btns[1].addEventListener('click', function() {
            alert(33);
    })
    
</script>
```

###  10.2删除事件（解绑事件）


```html
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <script>
        var divs = document.querySelectorAll('div');
        divs[0].onclick = function() {
            alert(11);
            // 1. 传统方式删除事件
            divs[0].onclick = null;
        }
        // 2. removeEventListener 删除事件
        divs[1].addEventListener('click', fn) // 里面的fn 不需要调用加小括号
        function fn() {
            alert(22);
            divs[1].removeEventListener('click', fn);
        }
        // 3. detachEvent
        divs[2].attachEvent('onclick', fn1);

        function fn1() {
            alert(33);
            divs[2].detachEvent('onclick', fn1);
        }
    </script>
```

### 10.3事件对象的属性和方法



*e.target 和 this 的区别*

-  this 是事件绑定的元素（绑定这个事件处理函数的元素） 。

-  e.target 是事件触发的元素。


```html
    <div>123</div>
    <script>
        var div = document.querySelector('div');
        div.addEventListener('click', function(e) {
            // e.target 和 this指向的都是div
            console.log(e.target);
            console.log(this);

        });
    </script>
```

###  10.4阻止默认行为

> html中一些标签有默认行为，例如a标签被单击后，默认会进行页面跳转。

```html
    <a href="http://www.baidu.com">百度</a>
    <script>
        // 2. 阻止默认行为 让链接不跳转 
        var a = document.querySelector('a');
        a.addEventListener('click', function(e) {
             e.preventDefault(); //  dom 标准写法
        });


        // 3. 传统的注册方式
        a.onclick = function(e) {
            // 我们可以利用return false 也能阻止默认行为 没有兼容性问题
            return false;
        }
    </script>
```


###  10.5  阻止事件冒泡

`e.stopPropagation();`
事件冒泡本身的特性，会带来的坏处，也会带来的好处。



```html
    <div class="father">
        <div class="son">son儿子</div>
    </div>
    <script>
        var son = document.querySelector('.son');
		// 给son注册单击事件
        son.addEventListener('click', function(e) {
            alert('son');
            e.stopPropagation(); // stop 停止  Propagation 传播
            window.event.cancelBubble = true; // 非标准 cancel 取消 bubble 泡泡
        }, false);

        var father = document.querySelector('.father');
		// 给father注册单击事件
        father.addEventListener('click', function() {
            alert('father');
        }, false);
		// 给document注册单击事件
        document.addEventListener('click', function() {
            alert('document');
        })
    </script>
```


#### 10.5.1什么是事件委托


> 说白了就是，不给子元素注册事件，给父元素注册事件，把处理代码在父元素的事件中执行。



#### 10.5.2事件委托的原理

​	给父元素注册事件，利用事件冒泡，当子元素的事件触发，会冒泡到父元素，然后去控制相应的子元素。

#### 10.5.3事件委托的作用

- 我们只操作了一次 DOM ，提高了程序的性能。
- 动态新创建的子元素，也拥有事件。
- e.target 这个可以得到我们点击的对象
- e.target.nodeName == "大写标签名"  判断指定的冒泡事件

```html
  <ul>
        <li>知否知否，点我应有弹框在手！</li>
        <li>知否知否，点我应有弹框在手！</li>
        <li>知否知否，点我应有弹框在手！</li>
        <li>知否知否，点我应有弹框在手！</li>
        <a>知否知否，点我应有弹框在手！</a>
        <a>知否知否，点我应有弹框在手！</a>
    </ul>
    <script>
        // 事件委托的核心原理：给父节点添加侦听器， 利用事件冒泡影响每一个子节点
        var ul = document.querySelector('ul');
        ul.addEventListener('click', function(e) {
            // e.target 这个可以得到我们点击的对象
            // nodeName节点标签名
            if (e.target.nodeName == "LI")
                e.target.style.backgroundColor = 'pink';
        })
```


###  10.6鼠标事件对象


```html
    <script>
        // 鼠标事件对象 MouseEvent
        document.addEventListener('click', function(e) {
            // 1. client 鼠标在可视区的x和y坐标
            console.log(e.clientX);
            console.log(e.clientY);
            console.log('---------------------');

            // 2. page 鼠标在页面文档的x和y坐标
            console.log(e.pageX);
            console.log(e.pageY);
            console.log('---------------------');

        })
    </script>
```

###  10.7键盘事件

1. keyup 按键弹起的时候触发 
2. keydown 按键按下的时候触发  能识别功能键 比如 ctrl shift 左右箭头
3. keypress 按键按下的时候触发  不能识别功能键 比如 ctrl shift 左右箭头

```html
    <script>
        // 常用的键盘事件
        //1. keyup 按键弹起的时候触发 
        document.addEventListener('keyup', function() {
            console.log('我弹起了');
        })

        //3. keypress 按键按下的时候触发  不能识别功能键 比如 ctrl shift 左右箭头啊
        document.addEventListener('keypress', function() {
                console.log('我按下了press');
        })
        //2. keydown 按键按下的时候触发  能识别功能键 比如 ctrl shift 左右箭头啊
        document.addEventListener('keydown', function() {
                console.log('我按下了down');
        })
        // 4. 三个事件的执行顺序  keydown -- keypress -- keyup
    </script>
```


### 10.7键盘事件对象


**使用keyCode属性判断用户按下哪个键**

```html
    <script>
        // 键盘事件对象中的keyCode属性可以得到相应键的ASCII码值
        document.addEventListener('keyup', function(e) {
            // 我们可以利用keycode返回的ASCII码值来判断用户按下了那个键
            if (e.keyCode === 65) {
                alert('您按下的a键');
            } else {
                alert('您没有按下a键')
            }
        })
        // keypress区分大小写
        document.addEventListener('keypress', function(e) {
            console.log(e.keyCode);
        })
    </script>
```

#### 10.7.1模拟触发

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



## 11.本地储存 web storage

### 11.1window.sessionStorage

1. 生命周期为关闭浏览器窗口
2. 早同一页面下数据可以共享
3. 一键值对的形式存储使用

#### 存储数据

```js
sessionStorage.setItem('key', value);
```

#### 获取数据

```js
sessionStorage.getItem('key')
```

#### 删除数据

```js
sessionStorage.removeItem('key');
```

#### 删除所有数据

```js
sessionStorage.clear();
```



```js
<body>
    <input type="text">
    <button class="set">存储数据</button>
    <button class="get">获取数据</button>
    <button class="remove">删除数据</button>
    <button class="del">清空所有数据</button>
    <script>
        console.log(localStorage.getItem('username'));

        var ipt = document.querySelector('input');
        var set = document.querySelector('.set');
        var get = document.querySelector('.get');
        var remove = document.querySelector('.remove');
        var del = document.querySelector('.del');
        set.addEventListener('click', function() {
            // 当我们点击了之后，就可以把表单里面的值存储起来
            var val = ipt.value;
            sessionStorage.setItem('uname', val);
            sessionStorage.setItem('pwd', val);
        });
        get.addEventListener('click', function() {
            // 当我们点击了之后，就可以把表单里面的值获取过来
            console.log(sessionStorage.getItem('uname'));

        });
        remove.addEventListener('click', function() {
            // 删除数据
            sessionStorage.removeItem('uname');

        });
        del.addEventListener('click', function() {
            // 当我们点击了之后，清除所有的
            sessionStorage.clear();
        });
    </script>
</body>
```

### 11.2window.localStorage

1. 生命周期永久生效,除非手动删除否则关闭页面也会存在
2. 可以多个页面共享数据
3. 以键值对的形式存储使用

#### 存储数据

```js
localStorage.setItem('key', value);
```

#### 获取数据

```js
localStorage.getItem('key')
```

#### 删除数据

```js
localStorage.removeItem('key');
```

#### 删除所有数据

```js
localStorage.clear();
```



## 12.`cookie`

`document.cookie`属性既可以设置`cookie`，也可以获取`cookie`，其语法结构是：

```javascript
//获取
variable = document.cookie

//设置
document.cookie = '名=值;expires=生命周期;path=路径'

```

> `expires`参数需要使用格林尼治日期的表示形式，可通过`Date`对象的相关方法实现。
>
> `path`表示`cookie`生效的路径，假设写为`/a`则表示只在`a`及其子目录中被访问到
>
> 清理cookie时需要再行设置`cookie`，只不过`cookie`的生命周期为当前日期的向前推算。

### 





## 13.`Web Worker`

`JavaScript`语言采用单线程模型，也就是说所有任务只能在一个线程上完成，一次只做一件事。

如果现在在应用中存在大量的、繁琐的计算操作，如果都由主线程来完成的话，无疑会造成主线程的工作压力，而且也可能会造成线程阻塞。--- `Web Worker`

`Web Worker`的作用就是为`JavaScript`创建多线程的环境，然后将复杂的、繁琐的计算任务将由`Web Worker`线程来完成，此时主线程和`Web Worker`线程同时在运行，而且互不干扰。

**使用`Web Worker`时需要注意的事项**

· 同源策略，必须保证主线程与`Web Worker`线程同源

· `DOM`限制，因为主线程和`Web Worker`线程是两个独立的线程，主线程也称为渲染线程，其实现DOM的相关操作，那么也就意味着在`web worker`线程中不能进行任何的`DOM`操作。

· 通讯限制，主线程和`web worker`线程的通讯只能通过消息完成

· 文件限制，`web worker`线程不能访问本地文件，即采用`file://`协议浏览的文件，只能通过网络协议进行访问。

针对于密集型复杂的运算可以通过`web worker`实现，如递归操作。

## 14.主线程

### 创建`Worker`线程

```javascript
new Worker(脚本文件URL地址)

```

##  `postMessage()`方法

`postMessage()`方法用于向`worker`线程传递消息，其语法结构是：

```javascript
Worker.postMessage(value)

```

> `value`的数据类型可以为任意数据类型

### ·`message`事件

`message`事件在在监听到`worker`线程传递的消息后触发，其语法结构是：

```javascript
worker.addEventListener('message',(event)=>{
	//...
});

worker.onmessage=function(event){
	//...
});

```

`webworker.html`

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        #container {
            width: 600px;
            margin: 0 auto;
            text-align: center;
        }
    </style>
</head>

<body>
    <div id="container">
        <p>请输入数字:<input type="text" id="number"></p>
        <p><input type="button" value="计算" onclick="compute()"></p>
        <p><span id="result"></span></p>
    </div>
    <script>
        function compute() {
            //获取输入框的信息 
            let numberVal = document.getElementById('number').value;
            //创建Web worker线程
            let worker = new Worker('worker.js');
            //向worker线程发送消息
            worker.postMessage(numberVal);
            //监听worker的message事件,只要监听到该事件,则代表worker线程
            //已经完成了繁烦的计算任务,并且将结果返回给了主线程
            //主线程此时只需要接收该结果,并且一般情况下把结果以DOM的形式显示
            //在页面中即可
            worker.addEventListener('message', (event) => {
                document.getElementById('result').innerText = event.data;
            });
        }
    </script>
</body>

</html>
```

## 14.1`Worker`线程

### · `message`事件

`message`事件在监听到主线程传递的消息后触发，其语法结构是：

```
this.addEventListener('message',(event)=>{
	//...
});

this.onmessage=function(event){
	//...
});

```

> 此时的`event`参数代表的是`MessageEvent`事件对象，该事件对象代表接收数据的对象。它包含有：
>
> `data`属性，存储了传送者传递的消息(数据)

### · `postMessage()`方法

`postMessage()`方法用于实现`worker`线程向主线程发送消息，其语法结构是：

```javascript
this.postMessage(value)

```

## · `close()`方法

`close()`方法用于关闭`worker`线程，其语法结构是：

```javascript
this.close()

```

`	worker.js`

```js
this.addEventListener('message', (e) => {
    let numberVal = parseInt(e.data);
    let sum = 0;
    for (let n = 0; n <= numberVal; n++) {
        sum += n;
    }
    this.postMessage(sum)
});
```



##  15. 拖放

拖放(`Drag`)可以将任意的`HTML`元素从一个位置拖放到另外的一个位置，但为保证浏览器的兼容性，建议为拖放的文本元素（如`p`、`h1` 元素）添加`draggable="true"`属性

##  `DragEvent`接口

`DragEvent`接口表示拖放事件的接口，该接口继承自`MouseEvent`和`Event`接口。

## 事件类型

###  源对象

#### · `dragstart`事件

`dragstart`事件在源对象开始被拖放时触发，只会触发一次，其语法结构是：

```javascript
HTMLElement.addEventListener('dragstart',()=>{

});

HTMLElement.ondragstart = function(){

});

```

#### · `drag`事件

`drag`事件在源对象拖放过程中被触发，该事件可以触发无限次，其语法结构是：

```javascript
HTMLElement.addEventListener('drag',()=>{

});

HTMLElement.ondrag = function(){

});

```

#### · `dragend`事件

`dragend`事件在源对象释放时触发，可能在目标区内释放，也可能在目标区域外释放，其语法结构是：

```javascript
HTMLElement.addEventListener('dragend',()=>{

});

HTMLElement.ondragend = function(){

});

```

###  目标对象

#### · `dragenter`事件

`dragenter`事件在(源对象)进入目标对象范围时触发，该事件可以触发一次，其语法结构是：

```
HTMLElement.addEventListener('dragenter',()=>{

});

HTMLElement.ondragenter = function(){

});

```

#### · `dragover`事件

`dragover`事件在(源对象)在目标对象范围内悬停时触发，该事件可以触发无限次，其语法结构是：

```javascript
HTMLElement.addEventListener('dragover',(event)=>{
	event.preventDefault();
});

HTMLElement.ondragover = function(event){
	event.preventDefault();
});

```

>  在`dragover`事件中必须调用`event.preventDefault()`方法，否则`drop`不会触发！

#### · `dragleave`事件

`dragleave`事件在(源对象)拖离目标对象范围时触发，该事件只触发一次，其语法结构是：

```javascript
HTMLElement.addEventListener('dragleave',()=>{

});

HTMLElement.ondragleave = function(){

});

```

#### · `drop` 事件

`drop`事件(源对象)在目标对象范围内释放时触发，该事件只能触发一次，其语法结构是：

```javascript
HTMLElement.addEventListener('drop',()=>{

});

HTMLElement.ondrop = function(){

});

```

> 事件正常的触发顺序是：
>
> `dragstart` -> `drag` -> `dragenter` -> `dragover` -> `drop` -> `dragend`
>
> 任何拖放操作至少需要有`drop`和`dragover`事件



在拖放图片操作时，`Firefox`浏览器会自动在新的标签页打开该图片，为防止该种行为的产生，在 `dragover `事件中还应该存在`event.stopPropagation()`方法的调用，在实践使用时建议在**`drop`**及**`dragover`**上都存在以下两条语句：



> ```javascript
> //阻止默认行为
> event.preventDefault();
> //阻止事件冒泡
> event.stopPropagation();
> 
> ```

## `dataTransfer`属性

`DragEvent`事件的`dataTransfer`属性将返回`DataTransfer` 对象，其语法结构是：

```javascript
DataTransfer DragEvent.dataTransfer

```

## `DataTransfer`对象

`DataTransfer`对象用于保存拖放过程中的数据，它可以保存一项或多项数据

### · `setData()`

`setData()`方法用于为`DataTransfer`对象添加键/值对，其语法结构是：

```javascript
DataTransfer.setData("名称",值)

```

### · `getData()`

`getData()`方法用于获取已经在`DataTransfer`对象中保存的数据，其语法结构是:

```javascript
DataTransfer.getData("名称")

```

> 学习一下`FileList`对象，参考https://developer.mozilla.org/zh-CN/docs/Web/API/FileList

# 16.地理定位

地理定位允许用户向`WEB`提供他们的位置，基于隐私的考虑，报告地理位置之后需要用户授权。

地理定位需要通过`navigator`对象的`geolocation`属性实现，该属性将返回`Geolocation`对象。

```javascript
Geolocation    navigator.geolocation

```

## 16.1 `Geolocation`对象

### 16.1.1· `getCurrentPosition()`方法

`getCurrentPosition()`方法用于获取当前的位置，其语法结构是：

```javascript
Geolocation.getCurrentPosition(success[,error[,options]])

```

> `success`，指成功获取位置信息后的回调函数，返回`GeolocationPosition`对象作为唯一参数
>
> `error`获取位置失败的回调函数,其返回的是`GeolocationPositionError`对象作为唯一参数
>
> `options`是使用对象的形式对当前的地理定位进行设置

#### 16.1.1.1 `GeolocationPosition`对象(`success`)

表示获取到的**当前位置对象**,其包含属性有:

`timestamp`表示获取地理定位时的时间戳

`coords`返回`GeolocationCoordinates`对象

#####  16.1.1.1.1  `GeolocationCoordinates`对象

表示获取到的**当前位置相关信息**其属性有:

longitude经度

latitude 纬度

altitude 海拔

![](C:\Users\leibi\Desktop\web\笔记.md\images\GeolocationPosition.png)

#### 16.1.1.2 `GeolocationPositionError`对象(`error`)

表示获取到的**当前错误**其属性有:

code: 错误序号

message:错误文本信息

![](C:\Users\leibi\Desktop\web\笔记.md\images\GeolocationPositionError.png)

#### 16.1.1.3 `options`

timeout  多长时间返回地理位置定位

maxmumAge  多长时间去缓存获取地理定位

```js
  function getLocation() {
            let geo = navigator.geolocation;
            geo.getCurrentPosition(position => {
                let coords = position.coords;
                console.log(coords.longitude + ',' + coords.latitude);
                console.log(position);
            }, error => {
                console.log(error);
            }, {
                timeout: 5000,
                maxmumAge: 6000
            })
        }
```

