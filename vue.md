

# 1.vue

## 如何使用vue

- 将vue.js文件下载到项目本地，引入到网页中使用
  - 开发版
    - 未压缩:包含注释,代码格式以及见名知意的变量名
    - 包含完备的错误提示
  - 生产版
    - 不含注释,代码格式以及简化了变量名
    - 去掉了友好的错误提示
- 使用脚手架项目



## mvvm

MVVM是Model-View-ViewModel的简写，即模型-视图-视图模型。

- Modal：模型，指的是后端传递的数据。
- View：视图，指的是所看到的页面。
- ViewModal：视图模型，mvvm模式的核心，它是连接view和model的桥梁。主要用来处理业务逻辑

**MVVM适用场景**： 适合数据驱动的场景，数据操作比较多的场景



#### MVC

MVC 是 Model View Controller 的缩写

- Model：模型层，是应用程序中用于处理应用程序数据逻辑的部分。通常模型对象负责在数据库中存取数据。
- View：视图层，用户界面渲染逻辑，通常视图是依据模型数据创建的。
- Controller：控制器，数据模型和视图之间通信的桥梁，通常控制器负责从事图读取数据，控制用户输入，并向模型发送数据。

**MVC的应用**：主要用于中大型项目的分层开发。



 **Vue框架是如何实现MVVM设计模式: Vue的绑定原理**

​     (1). 引入<script src="js/vue.js">时，其实就是在内存中添加一种新的类型Vue

​     (2). 今后只要希望自动监控页面上的一个区域，都要创建Vue类型的子对象: new Vue()

​     (3). new Vue()第一件事将data引入new Vue()中保存: 

​    	 a. data对象被引入new Vue()之后，new Vue()会为data对象中每个变量添加访问器属性，并且隐藏实际变量。

​    	 b. 结果，今后只要在new Vue()中试图修改data中的变量，其实修改的都不是原变量，都是访问器属性.

​     	c. 访问器属性既有保护作用，又起到监视变量变化的作用。而且，new Vue()真的在每个变量的访问器属性的set()中植入了一个通知函数。

   	  d. 结果: 今后在new Vue()内只要一修改变量，都会自动调用变量的访问器属性的set()函数，就会自动触发通知函数，发出通知！



new Vue()然后将methods对象中每个事件处理函数，都引入new Vue()内部保存。但是，**new Vue()会先打散methods对象**，再将methods中的函数分别引入new Vue()中。结果，methods中的函数，最终直接隶属于new Vue()。最后，已经没有methods了！所以，methods中的事件处理函数，**只要访问data中的变量，都要加this**.。而且，**访问的也不是data中的原变量，都是访问器属性**而已。



 **Vue的绑定原理总结:**

访问器属性  +  虚拟DOM树

## 挂载点el

作用范围:   el选中的元素以及内部的后代元素或者dom元素
不能使用HTML和body标签



## 指令

为HTML元素上添加新功能

### v-text 类似innerText

{{}}     差值语法  interpolation

```html
  <div id="app">
        <h2 v-text="message"></h2>
        <h2>{{message}}</h2>
    </div>
    <script src="../vue.min.js"></script>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                message: "hello",//data对象中的变量名和html中变量一致
            }
        })
    </script>


```


```js
<body>
    <div id="app">
        <h3>用户名:{{uname}}</h3>
        <h3>性别:{{sex==1?"男":"女"}}</h3>
        <h3>小计:${{(price*count).toFixed(2)}}</h3>
        <h3>下单时间:{{new Date(orderTime).toLocaleString}}</h3>
        <h3>周{{week[new Date().getDay()]}}</h3>
    </div>
    </div>
    <script>
        new Vue({
            el: "#app",
            data: {
                uname: "biaobiao",
                sex: 1,
                price: 10000.15,
                count: 5,
                orderTime: 1600228004389,
                week: ["日", "一", "二", "三", "四", "五", "六"]
            }
        })
    </script>
</body>
```

### v-html 类似于innerHTML

```html
     <div id="app">
            <p v-html="content"></p> //百度链接
            <p v-text="content"></p> //链接文本
        </div>
        <script src="../vue.min.js"></script>
        <script>
            var app = new Vue({
                el: "#app",
                data: {
                    content: "<a href='http://www.baidu.com'>百度</a>"
                }
            })
        </script>
```

总结:v-html的指令的作用是:设置元素的innerHTML
     内容中有html的结构会被解析为标签

​     v-text指令无论内容是什么,只会解析为文本



###　v-cloak

(1). 问题: 在网络有延迟的情况下，new Vue()执行稍微晚。导致用户短暂看到界面上的{{}}

(2). 解决: 只要希望在网络有延迟的情况下，防止用户短暂看到{{}}，都可用: v-cloak

- 在当前页面中添加一段css代码与v-cloak配合
  - [v-cloak]{ display:none }

解决'闪动'问题

原理:先隐藏,替换好值以后显示

```js
    <style>
        [v-cloak] {
            display: none
        }
    </style>
</head>

<body>
    <div id="app">
        <h3 v-cloak>用户名:{{uname}}</h3>
        <h3 v-cloak>积分:{{score}}</h3>
    </div>
    <script>
        setTimeout(function() {
            new Vue({
                el: "#app",
                data: {
                    uname: "dingding",
                    score: 1000
                }
            })
        }, 2000)
    </script>
</body>
```

### v-once

​     (1). 什么是: 限制只在首次加载时动态绑定一次内容，之后即使变量更新，也不会更新页面 的特殊指令

​     (2). 何时: 如果一个元素内容只需要在首次加载时，绑定一次。之后几乎不需要修改，都应该v-once

​     (3). 如何: <元素 v-once>{{变量}}</元素>

​	(4). 问题: 每次变量修改时，都要遍历虚拟DOM树。虚拟DOM树中的受监控的元素个数越多，遍历就会越慢。如果可以**减少虚拟DOM树中的受监控的元素个数**，则遍历就会加快，就会提高页面加载的效率。

​	(5). 解决: 将那些只在首次加载时绑定一次，之后操作过程中几乎不会改变的元素，都标记上v-once。——优化

```jS
<body>
  <div id="app">
    <!--只需要在首次加载时，绑定一次即可-->
    <h3 v-once>上线时间: {{now.toLocaleString()}}</h3>
    <!--需要反复修改，实时同步-->
    <h3>当前系统时间: {{now.toLocaleString()}}</h3>
  </div>
  <script>
    var vm=new Vue({
      el:"#app",
      data:{
        now:new Date()
      }
    });
    setInterval(function(){
      vm.now=new Date();
    },1000)
  </script>
</body>
```

### v-pre

​     (1). 什么是：专门保护元素内容中的{{}}不被new Vue()编译

​     (2). 何时：如果今后凑巧在内容正文中有一对儿{{}}，不是用作绑定语法。仅仅是希望原样显示。

​     (3). 如何: <元素 v-pre>....{{...}}...</元素>

​     (4). 示例: 使用v-pre保护内容中的{{}}不被编译

```js
<body>
  <div id="app">
    <h3 v-pre>Vue框架中都是使用"{{变量名}}"方式标记页面中可能发生变化的位置</h3>
  </div>
  <script>
    new Vue({
      el:"#app"
    })
  </script>
</body>
</html>
//花括号中的以原样显示
运行结果: Vue框架中都是使用"{{变量名}}"方式标记页面中可能发生变化的位置
```



### v-bind

如果元素的属性值可能随程序发生变化是,不能用{{}}标记,要用`v-bind  或者  :  `代替

<元素  v-bind : 属性名="变量或js表达式">

<元素  :  属性名="变量或js表达式＂>

注意:    一旦使用  : 绑定属性值,则＂＂号中不加｛｛｝｝，＂＂就替代了{{}}的作用,可以直接在" "号中写变量或js表达式

```js
<body>
    <div class="app">
        <input :type="type_text">
    </div>
    <script>
        var app = new Vue({
            el: ".app",
            data: {
                // type_text: "password"
                // type_text: "text"
                type_text: "checkbox"
            }
        })
    </script>
</body>
```



### v-on 是用于绑定事件

 v-on:click

 @dblclick

```html
<body>
    <div id="app">
        <input type="button" value="v-on的使用" v-on:click="doIt">
        <input type="button" value="v-on的使用" @dblclick="doIt">
    </div>
    <script src="../vue.min.js"></script>
    <script>
        var app = new Vue({
            el: "#app",
            methods: {
                doIt: function() {
                    alert("it");
                }
            }
        })
    </script>
</body>
```

事件传参:

```js
 <元素 @事件名="处理函数(实参值, ... , ...)"
	 methods:{
		处理函数(形参,...,...){

		}

```



#### v-on和v-text联用

```html
<body>
    <div id="app">
        <h2 @click="changeFood">{{ food }}</h2>
    </div>
    <script src="../vue.min.js"></script>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                food: "fish",
            },
            methods: {
                changeFood: function() {
                    alert(this.food);
                }
            }
        })
    </script>
</body>
```

#### vue中获得事件对象

<元素 @事件="处理函数">

​         强调: 此时，一定不要加()，因为空的()表示什么参数都不传的意思！连事件对象也不传！

```js
<body>
    <div id="app">
        <div style="width:200px; height:100px;   background-color:#afa" id="d1" @click="say">d1</div>
        <div style=" width:200px; height:100px; background-color:#aaf" id="d2" @click="say">d2</div>
    </div>
    <script>
        new Vue({
            el: "#app",
            methods: {
                say(e) {
                    console.log(`x:${e.offsetX},y:${e.offsetY} 疼!`);
                }
            }
        })
    </script>
</body>
```

##### 既获得事件对象，又能传入其它自定义实参值

```js
<元素 @事件名="处理函数($event, 实参值,...)"
		methods:{
			处理函数(e, 形参,...){

			}
		}

```

```js
<body>
    <div id="app">
        <div style="width:200px; height:100px;   background-color:#afa" id="d1" @click="say($event,'h1')">d1</div>
        <div style=" width:200px; height:100px; background-color:#aaf" id="d2" @click="say($event,'h2')">d2</div>
    </div>
    <script>
        new Vue({
            el: "#app",
            methods: {
                say(e, i) {
                    console.log(`${i}:x:${e.offsetX},y:${e.offsetY}`);
                }
            }
        })
    </script>
</body>
```



#### 加减按钮案例

```vue
<body>
    <div id="app">
        <button @click="minus">-</button>
        <span>{{n}}</span>
        <button @click="add">+</button>
    </div>
    <script>
        var vm = new Vue({
            el: "#app",
            data: {
                n: 0
            },
            methods: {
                minus() {
                    //因为new Vue()下的一切同属于一个new Vue对象内部,所以methods中的方法访问data中的变量,也必须加this
                    if (this.n > 0) {
                        this.n--
                    }
                },
                add() {
                    this.n++
                }
            }
        })
    </script>
</body>
```

### v-show 和v-if

**相同点：v-if与v-show都可以动态控制dom元素显示隐藏**

**不同点：v-if显示隐藏是将dom元素整个添加或删除，而v-show隐藏则是为该元素添加css--display:none，dom元素还在。**



```html
<body>
    <!-- 查看F12看结果 -->
    <div id='itany'>
        <p v-show="see">{{msg}}</p>  
        <h1 v-if="see">{{msg}}</h1>
        <!-- 隐藏 -->
        <h2 v-if="nosee">{{msg}}</h2>   <!--直接被移除-->
        <h2 v-show="nosee">{{msg}}</h2> <!--display:none-->
    </div>
    <script src="../vue.min.js"></script>
    <script>
        varitany = new Vue({
            el: '#itany',
            data: {
                msg: 'hello vue',
                see: true,
                nosee: false
            }
        })
    </script>
</body>
```

####　v-if    v-else

二选一   显示\隐藏   将dom元素整个添加或删除

 v-else **限制**：前一兄弟元素必须有 `v-if` 或 `v-else-if`。

```js

<body>
    <div id="app">
        <h3 v-if="isLogin">Welcome dingding, <a href="javascript:;" @click="logout">注销</a></h3>
        <!-- v-if和v-else之间不能有别的元素 -->
        <h3 v-else><a href="javascript:;" @click="login">登录</a> </h3>
    </div>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                isLogin: false
            },
            methods: {
                login() {
                    this.isLogin = true
                },
                logout() {
                    this.isLogin = false
                }
            }
        })
    </script>
</body>
```

多选一   显示\隐藏   将dom元素整个添加或删除

#### v-else-if

```js
<body>
    <div class="app">
        <div v-if="type === 'A'">
            A
        </div>
        <div v-else-if="type === 'B'">
            B
        </div>
        <div v-else-if="type === 'C'">
            C
        </div>
        <div v-else>
            Not A/B/C
        </div>
    </div>
    <script>
        var app = new Vue({
            el: ".app",
            data: {
                type: "B"
            }
        })
    </script>
</body>
```

### v-for

专门用于根据数组内容反复生成多个相同结构的元素的特殊指令

今后只要需要根据数组内容在页面上连续生成多个相同结构的元素时都用v-for。

`<元素 v-for="(当前元素值, 当前位置) of 数组">`

```js
<body>
    <div class="app">
        <ul>
            <li v-for="(t,i) of item" :key="i">下标:{{i}} 内容: {{t}}</li>
        </ul>
    </div>
    <script>
        var vm = new Vue({
            el: ".app",
            data: {
                item: ["A", "B", "C"]
            }
        })
    </script>
</body>
```

####　key

 每次修改数组元素时，v-for因为无法区分每个HTML元素副本，所以被迫删掉整个列表，创建整个列表。——效率极低

**凡是使用v-for，都要同时绑定一个:key属性**

`<元素 v-for="(当前元素值, 当前位置) of 数组" :key="当前位置">`

 :key是在内存中**为每个HTML元素副本添加一个唯一标识**！如果每个HTML元素副本都有唯一标识，则每次修改数组元素时，v-for只需要找到受影响的那一个HTML元素副本，修改即可。其余不受影响的HTML元素副本保持不变！——效率高！

#### v-for遍历对象属性:

vue中  `v-for of `统一了js中的`for of`和`for in`，即可遍历索引数组，又可遍历对象。

```js

<body>
    <div class="app">
        <ul>
            <!-- 属性值   属性名 -->
            <li v-for="(value,key) of lilei" :key="key">
                {{key}}:{{value}}
            </li>
        </ul>
    </div>
    <script>
        new Vue({
            el: ".app",
            data: {
                lilei: {
                    uname: "lilei",
                    age: 15
                }
            }
        })
    </script>

</body>
```

#### v-for 生成1-n的数字: 

`<元素 v-for="i of 整数">`

从1开始，数到   of   后的整数为止。每数一个数，就会创建这个元素的一个副本。并且将本次数的数保存到of前的变量i中

```js

<body>
    <div id="app">
        <span v-for="i of pageCount" :key="i">{{i}}</span>
    </div>
    <script>
        new Vue({
            el: "#app",
            data: {
                pageCount: 5
            }
        })
    </script>
</body>
```





### v-model 双向数据绑定

- v-bind 只能进行单项绑定，**只能将程序中的变化，自动更新到页面上**，无法实现数据的双向绑定

​     (从Model->View)

- v-model 可以进行双向绑定 **既能将程序中的变化自动更新到页面上;又能将页面上发生的变化更新回程序中的变量中**： 注意： v-model 只能使用在 **表单**元素中

- 简写  :属性可以去掉

  ```js
  <表单元素 v-model="变量">
  ```

  

(从View->Model)     (从View->Model)

```html

<body>
    <div id="app">
        <input v-model:value="keyword">
        <button @click="search">百度一下</button>
    </div>
    <script>
        var vm = new Vue({
            el: "#app",
            data: {
                keyword: "" //开局用户没有输入任何关键词
            },
            methods: {
                search() {
                    console.log(`查找 ${this.keyword} 相关的内容...`)
                }
            }
        })
    </script>
</body>

```

#### 双向绑定原理

**: v-model其实就是自动给元素绑定oninput或onchange事件。**

​     (1). oninput事件是用户只要在文本框中输入新内容就会立刻触发

​     (2). onchange事件是用户切换选择select元素或单选按钮或复选框时自动触发！

​     	`示例: 使用@input/@change事件模拟实现双向绑定: `

```js

<body>
    <div id="app">
        <input type="text" :value="keyword" @input="input">
            //或者改为@change是同样效果
        <button @click="search">搜索</button>
    </div>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                keyword: "",
            },
            methods: {
                input(e) {
                    var val = e.target.value;
                    this.keyword = val;
                },
                search() {
                    console.log(`查找${this.keyword}相关内容`);
                }
            }
        })
    </script>
</body>
```

#### 不同类型的表单元素，双向绑定原理不同: 

##### 双向数据绑定-文本框或文本域:

​     a. 特点: 都是一个框，用户在框内输入文字。每次用户修改框内的文字时，都会修改元素的value属性。

​     b. 双向绑定时: 

```js
 <input v-model:value="变量"> 
 <textarea v-model:value="变量"></textarea>
```

##### 双向数据绑定-单选按钮

​     a. 特点: value是写死的固定的备选值！用户在不同radio之前切换选中状态时，其实改变的是radio的checked属性值！

​     b. 所以，想用双向绑定获得当前选中的radio的值，应该绑定checked属性: 

​     <input type="radio" value="固定值" v-model:checked="变量">

​         1). 从Model->View时: v-model会用当前变量的值和当前input的value属性值做比较。

​         i. 如果变量的值==当前input的value属性值，则当前radio选中！。

​         ii. 如果变量的值!=当前input的value属性值，则当前radio不选中！

​         2). 从View->Model时: 如果当前radio被选中，v-model才将input的value属性值自动更新回data中的变量里。

```js
body>

    <div id="app">
        <label for="">
            <input type="radio" name="sex" value="1" v-model:checked="sex">男
        </label>
        <label for="">
            <input type="radio" name="sex" value="0" v-model:checked="sex">女 
        </label>
        <h3>您选的性别是:{{sex==1?"男":"女"}}</h3>
        <script>
            new Vue({
                el: "#app",
                data: {
                    sex: 1
                }
            })
        </script>
    </div>
</body>

```

##### 双向数据绑定-select

1). 首屏加载时，Model->View，先获得v-model绑定的变量的值。用变量的值和每个option的value值做比较。哪个option的value值等于变量的值，则选中哪个option。

 2). 当用户切换选择了不同的option时，option先将自己的value交给select的value。v-model再把select的新value，自动更新回data中的变量中。

```js
<body>
    <div id="app">
        <select v-model:value="src">
            <option value="img/bj.jpg">北京</option>
            <option value="img/sh.jpg">上海</option>
            <option value="img/hz.jpg">杭州</option>
        </select><br>
        <img :src="src" alt="">
    </div>
    <script>
        new Vue({
            el: "#app",
            data: {
                src: "img/bj.jpg"
            }
        })
    </script>
   
</body>
```

##### 双向数据绑定-checkbox

```js

<body>
    <div id="app">
        用户名: <input type="text" :disabled="isAgree==false"><br> 密码: <input type="text" :disabled="isAgree==false"><br>
        <input type="checkbox" v-model:checked="isAgree">同意<br>
        <button :disabled="isAgree==false">注册</button>
    </div>
    <script>
        new Vue({
            el: "#app",
            data: {
                isAgree: false
            }
        })
    </script>
</body>
```



## 绑定样式

###  绑定内联样式:

1. 将整个style属性，看做一个大的字符串，用一个变量绑定。

   ```js
   	<元素 :style="{ css属性名1: 变量1, css属性名2:变量2,... }">
   		data:{
   			变量1: 属性值1, 
   			变量2: 属性值2
   		}
   
   ```

   ```js
   <style>
           .d1 {
               position: fixed;
               left: 50%;
               width: 100px;
               height: 100px;
               background: #000;
           }
       </style>
       <script src="js/vue.js"></script>
   </head>
   
   <body>
       <div class="app">
           <!-- {left: left ,top:top} -->
           <div class="d1" :style="{left ,top}"></div>
       </div>
       <script>
           var app = new Vue({
               el: ".app",
               data: {
                   top: "50%",
                   left: "30%"
               }
           })
       </script>
   </body>
   
   ```

   2. `:style="变量"，在data中将变量定义为一个对象`

      对象的形式可以定义多个样式

   ```js
       <style>
           .d1 {
               position: fixed;
               left: 50%;
               width: 100px;
               height: 100px;
               background: #000;
           }
       </style>
       <script src="js/vue.js"></script>
   </head>
   
   <body>
       <div class="app">
           <div class="d1" :style="div_style"></div>
           <div class="d1" :style="div_style2"></div>
       </div>
       <script>
           var app = new Vue({
               el: ".app",
               data: {
                   div_style: {
                       top: "50%",
                       left: "30%"
                   },
                   div_style2: {
                       background: "#0ff"
                   }
               }
           })
       </script>
   </body>
   ```


### 绑定class

绑定单个元素

```js
<元素 :class="{ class名1:变量1, class名2:变量2,... }"
		data:{
			变量1:true或false, //开关，是否启用一个class
			变量2:true 或false //开关，是否启用一个class
		}

```



用有名称的对象来绑定多个元素:

```js
<元素1 :class="变量1">
		<元素2 :class="变量2">
		data:{
			变量1: {
				class1:true或false, 
				... : ...
			},
			变量2:{
				class1:true或false, 
				... : ...
			}
		}

```



```js
    <style>
        .span-cls {
            padding: 5px 10px;
        }
        
        .success {
            background-color: lightGreen;
            border: 1px solid green;
            color: green;
        }
        
        .fail {
            background-color: pink;
            border: 1px solid red;
            color: red;
        }
    </style>
</head>

<body>
    <div id="app">
        手机号: <input type="text" v-model="phone" @blur="vali_phone">
        <span :class="phone_class">{{phone_class.msg}}</span><br> 身份证: <input type="text" v-model="pid" @blur="vali_pid">
        <span :class="pid_class">{{pid_class.msg}}</span>
    </div>
    <script>
        new Vue({
            el: "#app",
            data: {
                phone: "",
                pid: "",
                phone_class: { 
                    success: false,
                    fail: false,
                    msg: ""
                },
                pid_class: {
                    success: false,
                    fail: false,
                    msg: ""
                }
            },
            methods: {
                vali_phone() {
                    var reg = /^1[3-9]\d{9}$/;
                    if (reg.test(this.phone)) {
                        this.phone_class = {
                            success: true,
                            fail: false,
                            msg: "手机号正确"
                        }
                    } else {
                        this.phone_class = {
                            success: false,
                            fail: true,
                            msg: "手机号不正确"
                        }
                    }
                },
                vali_pid() {
                    var reg = /^\d{15}(\d\d[0-9Xx])$/;
                    if (reg.test(this.pid)) {
                        this.pid_class = {
                            success: true,
                            fail: false,
                            msg: "身份证号正确"
                        }
                    } else {
                        this.pid_class = {
                            success: false,
                            fail: true,
                            msg: "身份证号不正确"
                        }
                    }
                }
            }
        })
    </script>

</body>
```

## 自定义指令

 回调函数: 会在当前标有这个自定义指令的元素被添加到页面上之后，自动调用该回调函数。
 当自动调用回调函数时，会自动将当前带有自定义指令的元素对象传入inserted函数内

```js
      Vue.directive("指令名", {
         inserted(当前dom元素对象){
         //对当前DOM元素对象执行一些初始化操作
        }
     })
```

强调: 

​     i. 定义指令名时，一定不要加v-前缀

​     ii. 如果指令名包含多个英文单词，比如my focus，应该-分割多个英文单词，比如my-focus，不应该用驼峰命名



```js
<body>
  <div id="app">
      使用新指令时加前缀 "v-" 
    <input type="text" v-my-focus><button>百度一下</button>
  </div>
  <script>
    //向vue大家庭中添加一个名为my-focus的自定义指令
    Vue.directive("my-focus",{
      //希望当带有这个指令的元素被添加到页面上时，自动调用inserted函数
      inserted(domElem){
        //在函数内，让当前DOM元素自动获得焦点
        domElem.focus();
      }
    })

    new Vue({
      el:"#app"
    })
  </script>
</body>
```



### computed


```js
<元素>{{计算属性}}</元素>
new Vue({
  el:"#app",
  data:{...},
  methods:{...},
  computed:{
    计算属性名(){
      计算过程
      return 计算结果
    }
  }
})

```

 **computed中的计算属性与methods中的函数有什么差别: **

​     (1). methods中普通函数的计算结果不会被缓存，导致反复计算——效率低

​     (2). computed中的计算属性值会被缓存，反复使用，不会反复计算——效率高

```js
<body>
    <div class="app">
        {{str}}{{str}}{{str1()}}{{str1()}}
    </div>
    <script src="./vue.js"></script>
    <script>
        let app = new Vue({
            el: '.app',
            data() {
                return {
                    msg: 'hello'
                }
            },
            methods: {
                str1: function() {
                    console.log("methods"); //调用两次输出两次
                    return this.msg.split('').reverse().join('')
                }
            },
            computed: {
                str: function() {
                    console.log("computed"); //调用两次输出一次
                    return this.msg.split('').reverse().join('')
                }
            }
        })
    </script>
</body>
```



**如何选择: **

​     (1). 如果一个操作更倾向做一件事儿，而不太关心返回的结果时——优先选择methods

​     (2). 如果一个操作更倾向于使用操作的返回值时，而不太关心过程——优先选择computed。



## 过滤 filter

对变量的原始值进行加工后再显示出来的函数

今后只要变量的原始值不能直接给人看，需要加工后才能给人看时，都要用过滤器

```js
<元素>{{变量 | 过滤器名称}}</元素>
Vue.filter("过滤器名称", function(变量的原始值){
	  return 加工后的新值
	})

```



```js
<body>
    <div id="app">
        <h3>{{sex1 | sexFilter}}</h3>
        <h3>{{sex2 | sexFilter}}</h3>
    </div>
    <script>
        // 过滤
        Vue.filter("sexFilter", function(val) {
            return val == 1 ? "男" : "女";
        })
        new Vue({
            el: "#app",
            data: {
                sex1: 0,
                sex2: 1
            }
        })
    </script>

</body>
/*
女
男
*/
```



### 带参数的filter

  **使用过滤器时: **

```js
 <元素>{{变量 | 过滤器名(实参值1, ..., ...)}}</元素>
```

​         1). 调用时，自定义的第一个实参值，要放在过滤器第一个实参值位置（实参值1），却是传给过滤器中第二个形参（自定义形参）的

​         2). 调用时，变量的原始值总是默认传给过滤器的第一个形参。

**带参过滤**

```js
Vue.filter("过滤器名",function(变量的原始值, 自定义形参, ...){  })
```

​         1). 第一个形参永远时变量的原始值

​         2). 自定义的其它形参必须从第二个位置开始写

   

```js

<body>
    <div id="app">
        <h3>{{sex1 | sexFilter("name")}}</h3>
        <h3>{{sex2 | sexFilter("name")}}</h3>
        <h3>{{sex1 | sexFilter("sex")}}</h3>
        <h3>{{sex2 | sexFilter("sex")}}</h3>
    </div>
    <script>
        // 过滤
        Vue.filter("sexFilter", function(val, oder) {
            if (oder == "name") {
                return val == 1 ? "李磊" : "韩美美";
            } else {
                return val == 1 ? "男" : "女";
            }

        })
        new Vue({
            el: "#app",
            data: {
                sex1: 0,
                sex2: 1
            }
        })
    </script>
</body>
/*
韩美美
李磊
女
男
*/
```

### 过滤器连用

```js
<body>
    <div id="app">
        <h3>{{sex1 | sexicon}}</h3>
        <h3>{{sex2 | sexicon}}</h3>
        <h3>{{sex1 | sexFilter("name") | sexicon}}</h3>
        <h3>{{sex2 | sexFilter("name") | sexicon}}</h3>
        <h3>{{sex1 | sexFilter("sex") | sexicon}}</h3>
        <h3>{{sex2 | sexFilter("sex") | sexicon}}</h3>
    </div>
    <script>
        // 过滤
        Vue.filter("sexFilter", function(val, oder) {
            if (oder == "name") {
                return val == 1 ? "李磊" : "韩美美";
            } else {
                return val == 1 ? "男" : "女";
            }
        })
        Vue.filter("sexicon", function(val) {
            if (val == 0) {
                return "♀";
            } else if (val == "1") {
                return "♂";
            } else if (val == "男" || val == "李磊") {
                return val + "♂";
            } else {
                return val + "♀"
            }
        })
        new Vue({
            el: "#app",
            data: {
                sex1: 0,
                sex2: 1
            }
        })
    </script>
/*
♀
♂
韩美美♀
李磊♂
女♀
男♂
*/
</body>
```

## 插槽 slot

**匿名插槽**

```html

<body>
    <div id="app">
        <!--插槽内没有值时,就用slot内默认设定的-->
        <button-counter>123</button-counter>       <!--123-->
        <button-counter></button-counter>         <!--abc-->
    </div>
    <script src="../vue.min.js"></script> 
    <script>
        Vue.component('button-counter', {
            template: `
            <slot>abc</slot>
            `,
        })
        new Vue({
            el: '#app',
        })
    </script>
</body>


```

**具名插槽**

```html
<body>

    <div id="app">
        <button-counter>
            <div slot="header">头部</div>
            <div slot="main">主体</div>
            <div slot="footer">尾部</div>
        </button-counter>
    </div>
    <script src="../vue.min.js"></script>
    <script>
        Vue.component('button-counter', {
            template: `
            <div>
                <header>
                    <slot name="header"></slot>
                </header>
                <main>
                    <slot name="main"></slot>
                </main>
                <footer>
                    <slot name="footer"></slot>
                </footer>
            </div>
            `,
        })
        new Vue({
            el: '#app',
        })
    </script>
</body>
```

![](images\vue\具名slot.png)	



## vue.set

```js
Vue.set( target, key, value )
target：要更改的数据源(可以是对象或者数组)
key：要更改的具体数据
value ：重新赋的值
```

Vue 不能检测出数据的改变，所以当我们需要动态改变数据的时候，Vue.set()完全可以满足我们的需求

[Vue—Vue.set的使用](https://www.jianshu.com/p/e6e8c45e7fd6)

## this.$nextTick()

1、在Vue生命周期的**`created()`钩子函数进行的DOM操作一定要放在`Vue.nextTick()`的回调函数**中。

2、**在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进`Vue.nextTick()`的回调函数中**

[Vue.js中this.$nextTick()的使用](https://www.cnblogs.com/jin-zhe/p/9985436.html)

## 生命周期

vue生命周期是指**vue实例对象**从**创建之初到销毁的过程**，vue所有功能的实现都是围绕其生命周期进行的，在生命周期的 **不同阶段** 调用**对应的钩子函数**实现**组件数据管理**和**DOM渲染**两大重要功能。



**created钩子每次加载完成后都可以重复执行；**

**而mounted钩子只在页面第一次加载后才调用出来，只要el被加载过，之后的重复加载该页面就不会调用该钩子了**

### vue的生命周期包括: 4个阶段

1. 创建**create**(对象)——必经阶段

   钩子:

   **beforeCreate()**

   **created()**

2. 挂载**mount**(页面内容)——必经阶段

   钩子:

   **beforeMount()**

   **mounted()** —— 因为此时既有data对象，又有虚拟DOM树，所以今后axios请求都要放在mounted()中才保险

3. 更新**update**——只有当data中的数据被改变时才触发

   钩子:

   **beforeUpdate**()

   **updated**()

4. 销毁阶段 **destroy**——只有主动调用$destroy()销毁当前new Vue()时才触发

   钩子:

   **beforeDestroy()**

   **destroyed**()
   
   ![](images\生命周期.jpg)

## axios

**封装请求模块**

安装axios

`npm i  -save  axios`



创建src/utils/request.js

```js
/**
 * 封装axios请求模块
 */
import axios from "axios"

const request = axios.create({
    baseURL: "http://ttapi.research.itcast.cn"
})

export default request
```

哪里使用哪里加载

```js
 async getBooks() {
      const { data: res } = await request.get("/books");
      this.books = res;
      console.log(this.books);
    },
```



axios: 第三方开发的，基于**Promise**技术的，专门发送http请求的一组函数库。

发送get请求: 

```js
axios.get("url",{params:{ 参数: 值, ... }}).then(result=>{
		//result.data中才是服务器端返回的数据
	})

```

不带参数(钩子)

```js
<body>
    <table id="data">
        <thead>
            <tr>
                <th>商品名称</th>
                <th>描述</th>
                <th>单价</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(p,i) of products" :key="i">
                <td>{{p.title}}</td>
                <td>{{p.details}}</td>
                <td>¥{{p.price.toFixed(2)}}</td>
            </tr>
        </tbody>
    </table>
    <script src="js/vue.js"></script>
    <script src="js/axios.min.js"></script>
    <script>
        new Vue({
            el: "#data",
            data: {
                products: []
            },
            mounted() {
                axios.defaults.baseURL = "http://xzserver.applinzi.com"
                axios.get(
                    "/index"
                ).then(result => {
                    this.products = result.data;
                })
            }
        })
    </script>
</body>
```

带参的axios(钩子)

```js
    <style>
        [v-cloak] {
            display: none
        }
    </style>
</head>

<body>
    <ul id="app">
        <li v-cloak>品名: {{title}}</li>
        <li v-cloak>描述: {{subtitle}}</li>
        <li v-cloak>单价: ¥{{price.toFixed(2)}}</li>
        <li v-cloak>服务承诺: {{promise}}</li>
    </ul>
    <script src="js/vue.js"></script>
    <script src="js/axios.min.js"></script>
    <script>
        new Vue({
            el: "#app",
            data: {
                title: "",
                subtitle: "",
                price: 0,
                promise: ""
            },
            mounted() {
                var search = location.search;
                //如果有查询字符串参数的话
                if (search !== "") {
                    console.log(search);
                    var lid = search.split("=")[1];
                    axios.get(
                        "http://xzserver.applinzi.com/details", {
                            params: {
                                lid
                            }
                        }
                    ).then(result => {
                        console.log(result.data);
                        this.title = result.data.product.title;
                        this.subtitle = result.data.product.subtitle;
                        this.price = result.data.product.price;
                        this.promise = result.data.product.promise
                    })
                }
            }
        })
    </script>
</body>
```

post

```js
<body>
  <div id="app">
    用户名:<input v-model="uname"><br />
    密码:<input type="password" v-model="upwd"><br />
    <button @click="login">登录</button>
  </div>
  <script>
    new Vue({
      el: "#app",
      data: {
        uname: "",
        upwd: ""
      },
      methods: {
        login() {
          axios.post(
            "http://xzserver.applinzi.com/users/signin",
            `uname=${this.uname}&upwd=${this.upwd}`
          ).then(result=>{
            if (result.data.ok == 1) {
              alert(`登录成功，欢迎${result.data.uname}`);
            } else {
              alert(`登录失败, ${result.data.msg}`)
            }
          })
        }
      }
    })
  </script>
</body>

```

## 组件component

组件: 包含专属的HTML+JS+CSS+数据的可重用的页面独立的功能区域。

今后只要在页面中发现反复使用的功能区域，都要创建为组件，再反复使用



**每个组件其实都是一个缩微版的new Vue()**

 **但是有template,data()两处和new Vue不同: **

```js
Vue.component("组件名",{
		template:`<唯一父元素包裹>
			组件的HTML片段
		</唯一父元素包裹>`,
		data(){ //可被反复调用
			//每次调用时都会新创建一个data对象
			return {//每次调用都会 new Object()
				变量:初始值
			}
		},
		/******同new Vue()的部分*******/
		methods:{ ... },
		computed:{ ... },
		钩子函数(){ ... },
		... ...
	})

```

组件其实就是一个可重用的自定义HTML标签而已！组件名就是自定义标签名！

 **原理:** 

1. 当new Vue()扫描页面时，发现了不认识的自定义HTML标签，就会回内存中Vue中找自定义组件。
2.  只要找到同名的组件，先用组件的template内容代替当前自定义标签的位置
3.  为这个区域创建一个缩微的new Vue()对象副本，并创建一个当前组件专属的data对象副本，包含专属的变量
4.  结果: 这个小的组件区域，就拥有了专属的HTML+数据+一个缩微版的new Vue()组件对象。

```js
<body>
    <div id="app">
        <my-counter></my-counter>
        <my-counter></my-counter>
        <my-counter></my-counter>
    </div>
    <script>
        //先定义一个自定义组件，可以修改数量
        Vue.component("my-counter", {
            template: `<div>
                  <button @click="minus">-</button>
                  <span>{{n}}</span>
                  <button @click="add">+</button>
                </div>`,
            data() {
                return {
                    n: 0
                }
            },
            methods: {
                add() {
                    this.n++;
                },
                minus() {
                    if (this.n > 0) {
                        this.n--
                    }
                }
            }
        })
        new Vue({
            el: "#app"
        })
    </script>
</body>
```

### 组件的使用

`index.html`

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/vue.js"></script>
    <script src="js/todo-add.js"></script>
    <script src="js/todo-item.js"></script>
    <script src="js/todo-list.js"></script>
    <script src="js/todo.js"></script>
    <!--父组件要写在子组件之后-->
</head>

<body>
    <div id="app">
        <todo></todo>
    </div>
    <script>
        new Vue({
            el: "#app"
        });
    </script>
</body>
```

`todo.js`

```js
Vue.component("todo",{
  template:`<div>
    <h1>待办事项列表</h1>
    <todo-add/>
    <todo-list :tasks="tasks"/>
  </div>`,
  data(){
    return {
      tasks:["吃饭", "睡觉", "打亮亮"]
    }
  },
  components:{
    todoAdd, todoList
  }
})
```

`todo-add`

```js
var todoAdd={
  template:`<div>
    <input><button>+</button>
  </div>`
};
```

`todo-list`

```js
var todoList = {
    props: ["tasks"], //接收tasks参数
    template: `<ul>
    <todo-item v-for="(t,i) of tasks" :key="i" :t="t" :i="i"></todo-item>
  </ul>`,
    components: {
        //规定todoItem组件只能用在todoList下
        todoItem
    }
};
```

`todo-item`

```js
var todoItem={
  template:`<li>
    {{i+1}} - {{t}} <a href="javascript:;">×</a>
  </li>`,
  props:[ "t", "i" ]
}
```

![](images\组件.png)



## Vue 组件之间传值

### 一、父组件向子组件传递数据

在vue中数据数是单向的---称为单向数据流

在父组件的标签中,用v-bind绑定传递的参数,在子组件中可以通过props接收

```js

<body>
    <div id="app">
        <child :fat='fat'></child>
    </div>

    <script src="../vue.min.js"></script>
    <script>
        Vue.component('child', {
            props: {
                fat: {
                    type: String,
                    required: true
                }
            },
            template: `<div>{{son}}  {{fat}}</div>`,
            data() {
                return {
                    son: '子组件参数'
                }
            }
        })
        new Vue({
            el: '#app',
            data() {
                return {
                    fat: "父组件参数"
                }
            }

        })
    </script>

</body>
```



 

### **二、子组件向父组件传递数据**

#### 使用slot插槽

**子组件有slot插槽，并在slot上绑定了text值,父组件通过slot-scope就可以拿到子组件slot上绑定的值(已废弃)**

参考[V-SLOT](https://blog.csdn.net/weixin_34357436/article/details/91435871)

1.子组件：

```html

<template>
  <div>
    <slot name="icon" :text="text"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "我是子组件",
    };
  },
};
</script>
```

2.父组件：

```html
<template>
  <div id="app">
    <child>
      <div slot="icon" slot-scope="props">
        {{ props.text }}
      </div>
    </child>
  </div>
</template>
```

在父组件中 通过slot 便能获取子组件的text值

##### v-slot

1.父组件  index.vue

```vue
 <template>
	<div>
		<ch>
      		<template v-slot:footer="title">
        	<div>{{ title.title }}</div>
      		</template>
    	</ch>
	</div>
</template>

<script>
import ch from "../../components/text";
export default {
  name: "login",
  components: { ch }
};
</script>
```

2.子组件  text.vue

```vue
<template>
  <div class="child">
    <slot name="footer" :title="title"> </slot>
  </div>
</template>
```

#### 使用ref属性

父组件中通过$refs便可以获取子组件传来的值。

```html

<body>
    <div id="app">
        <div>接收子组件传过来的参数:{{son}}</div>
        <child ref="increment"></child>
        <button @click="updat">子--->父</button>
    </div>


    <script src="../vue.min.js"></script>
    <script>
        Vue.component('child', {
            data() {
                return {
                    value: "子组件的值"
                }
            },
        })
        new Vue({
            el: '#app',
            data: {
                son: ""
            },
            methods: {
                updat() {
                    this.son = this.$refs.increment.value
                }
            }
        })
    </script>

</body>

```

#### 使用$.emit

**子--->父   派发事件**

```html

<body>
    <div id="app">

        <p>{{ total }}</p>
        <button-counter @increment="add"></button-counter>

    </div>
    <script src="../vue.min.js"></script>
    <script>
        Vue.component('button-counter', {
            template: '<button @click="handler">+</button>',
            methods: {
                handler: function() {
                    this.$emit('increment')
                }
            },
        })
        new Vue({
            el: '#app',
            data() {
                return {
                    total: 0
                }
            },
            methods: {
                add: function() {
                    this.total += 1
                }
            }
        })
    </script>
</body>
```

**子--->父传递数据   **

```html

<body>
    <div id="app">
        <div>接收子组件传过来的参数:{{son}}</div>
        <child @increment="updat"></child>
    </div>


    <script src="../vue.min.js"></script>
    <script>
        Vue.component('child', {
            template: `
            <div> 
              <button @click="select(value)">子--->父</button>
            </div>
        `,
            data() {
                return {
                    value: "子组件的值"
                }
            },

            methods: {
                select(val) {
                    this.$emit('increment', val); //select事件触发后，自动触发increment事件
                }
            }
        })
        new Vue({
            el: '#app',
            data: {
                son: ""
            },
            methods: {
                updat(val) {
                    this.son = val
                }
            }
        })
    </script>

</body>
```

### 三、组件间传递数据

兄弟组件间传递数据要vue一个新的实例  ,  连接着两个组件,  让各个兄弟共用同一个事件机制。

传递数据方    通过一个事件触发`bus.$emit`传递的数据。                 *bus是指*新创建的vue实例

接收数据方    通过`mounted(){}`触发`bus.$on` 接收传递过来的数据



```html

<body>
    <div id="app">
        <test1></test1>
        <test2></test2>
    </div>
    <script src="../vue.min.js"></script>
    <script>
        let vm = new Vue();
        Vue.component('test1', {
            data() {
                return {
                    a: 0
                }
            },
            template: `
                <div>
                    <p>1组件 {{a}}</p>
                    <p><button @click='handle'>点击</button></p>
                </div>
            `,
            methods: {
                handle() {
                    // 触发兄弟组件test2的事件
                    vm.$emit('test2-event', 1);
                }
            },
            mounted() {
                //监听兄弟组件test2的事件
                vm.$on('test1-event', (val) => {
                    this.a += val;
                });
            }
        });
        Vue.component('test2', {
            data() {
                return {
                    a: 0
                }
            },
            template: `
                <div>
                    <p>2组件 {{a}}</p>
                    <p><button @click='handle'>点击</button></p>
                </div>
            `,
            methods: {
                handle() {
                    // 触发兄弟组件test1的事件
                    vm.$emit('test1-event', 1);
                }
            },
            mounted() {
                //监听兄弟组件test1的事件
                vm.$on('test2-event', (val) => {
                    this.a += val;
                });
            }

        });
        new Vue({
            el: '#app',
        })
    </script>
</body>
```



## 脚手架

设置npm的默认仓库为国内的淘宝镜像，2种选一种: 

​         1). npm config set registry http://registry.npm.taobao.org

​          npm 配置 设置 仓库

​             执行完之后，确认是否设置成功: npm config get registry

​                     npm 配置 获得 仓库

​             看到返回淘宝镜像，说明成功！

​         2). 备选方案: 如果上一步出错！可选择这一步: 

​             npm i -g cnpm --registry=http://registry.npm.taobao.org

​             确认是否安装成功: cnpm -v

​             看到版本号说明成功！

​     用npm或cnpm安装反复生成脚手架项目的命令行工具：2种选一种

​         1). 用npm安装: npm  i  -g @vue/cli 

​           npm 安装 全局   command line interface

​             install global   命令  行 接口

​             //如果说FEXIST错误，可进入出错提示中的路径，默认为: 

​             C:\Users\登录操作系统的用户名\AppData\Roaming\npm\node_modules

​             删除@vue文件夹

​         2). 如果npm出错，可换成: cnpm i -g @vue/cli

​     验证vue/cli是否安装成功: vue -V

​         看到版本号说明安装成功！

到要创建项目的位置 地址栏 输入cmd

vue  create  项目名

![](images\vue脚手架.png)



右键单击package.json文件，选择在集成终端中打开,输入npm run serve



### package.json 配置

自动打开浏览器

```json
    "vue": {
        "devServer": {
            "port": 8080,
            "open": true
        }
    },
```



### 项目结构

![](images\脚手架结构.png)

public文件夹

 1). 图片img文件夹放在public文件夹下

 2). 第三方css的压缩版和第三方js的压缩版都放在public文件夹下

 3). 唯一完整的HTML文件index.html中，head中引入第三方的css和js



src/App.vue

 1). <template>下只包含公共的页头组件和<router-view>

 2). <style>下包含所有网页都要用到的公共css样式，比如css重置代码



src/main.js

 1). import引入App.vue，router，axios，以及其他全局组件

 2). 将全局组件对象转为真正的全局组件: Vue.component( "组件标签名", 全局组件对象 )

 3). 配置axios并放入原型对象中: 

​     axios.defaults.baseURL="服务器端基础路径"

  Vue.prototype.axios=axios;







为每个页面创建.vue组件文件，都放在src/views文件夹下。每个.vue文件中: 

a. <template>标签内，包含这个页面的HTML内容

b. <script>export default{ ... }</script>中包含组件对象的js内容。

c. <style>标签内包含仅这个页面组件内才使用的css

d. <template>中的HTML内容以及<script>export default{...}</script>中的js内容，和绑定，指令，函数，生命周期，axios请求等都一样。



路由字典和路由器对象，在src/router/index.js文件中

a. 仅import首页组件对象，不要过早引入其它页面组件

b. 路由字典中首页组件: { path:"/", component:首页组件对象}

c. 其余页面组件都做成懒加载: 

 {

  path: '/相对路径',

  component: () => import(/* webpackChunkName: "组件名" */ '../views/其它页面组件.vue')

 }





### 步骤

1. 导入css,js文件到public中,在index.html中引入

2. 在app.Vue中引入公共css

   > 方法一:在app.Vue<router-view/>之前放公共css
   >
   > 方法二:将公共css放入assets文件夹 中,然后在app.Vue的script中import "url"引入

3. 先写页面和样式  然后在router文件夹的index,js中引入

4. 配置axios    在终端输入npm i  -save  axios 然后 node_modules文件夹中会显示axios文件夹

   > 配置axios 对象并将axios对象放入所有组件的原型对象中     (在main,js中的new Vue之前导入)
   >
   > import axios from "axios"
   >
   > 配置基础路径: axios.defaults.baseURL = "http://xzserver.applinzi.com"
   >
   > 将axios对象放入Vue类型的原型对象中: Vue.prototype.axios = axios

5. 在index.vue中的script编写js

   > 1. 在data(){return {}}中定义变量准备接服务器端返回的结果
   >
   >    > ```js
   >    > data() {
   >    >     return {
   >    >         //此处是存放请求出来的变量,同上axios的做法
   >    >         //要求带值的参数定义一个初始值
   >    >       p1: { price: 0, href: "" },
   >    >       p2: { price: 0, href: "" },
   >    >       p3: { price: 0, href: "" },
   >    >       others: [],
   >    >     };
   >    >   },
   >    > ```
   >
   > 2. 在mounted()钩子函数中范式axios请求,将返回的结果都保存到data中对应的变量上
   >
   >    > ```js
   >    >   mounted() {
   >    >     this.axios.get("index").then((result) => {
   >    >       console.log(result.data);
   >    >         //这里该解构的结构,将返回的结果都保存到data中对应的变量上
   >    >     });
   >    >   },
   >    > ```

6. 在index.vue中的<template>中对相应位置{{}}绑定data中的变量

    只要希望在网络有延迟的情况下，防止用户短暂看到{{}}，都可用: v-cloak

   - 在app.vue页面中style添加一段css代码与v-cloak配合
     - [v-cloak]{ display:none }

### scoped 防止组件之间的冲突

style 中的scoped属性为不同组件内添加随机的自定义属性名,

为当前组件中所有自定义的选择器结尾添加属性选择器,以当前组件的自定义属性名为结尾,以此区分当前选择器只在当前组件内有效

### 懒加载: 

1.  问题: 如果在router/index.js中，<font color="red">开局就把所有页面组件都用import引入index.js中，后果是，脚手架会把所有import引入的.vue文件打包成一个巨大的app.js。在首屏加载时一次性下载！</font>——慢！
2. 解决: 用户首先要看到的首页必须下载，但是用户暂时不看的其他页面能不能先不要下载！或异步延迟下载！——懒加载！\
3. 优点: 一定可以极大提高首屏加载速度！
4.  如何: 2种:

 <font color="red">    (1). **异步延迟下载: 脚手架默认的方式**</font>



```js

const routes = [
    {
        path: '/details/:lid',
        name: 'detail',
        component: () =>
            import ( /* webpackChunkName: "detail" */ '../views/detail.vue'),
    }
]
```

​     优先下载首页的内容, 其他页面内容在底层通过异步方式慢慢下载-------------偷跑流量

  

 <font color="red"> (2)  在脚手架项目的根目录创建一个vue.config.js的文件: (对vue项目打包的配置)</font>

​    

 ```js
       module.exports={
            chainWebpack:config=>{
               config.plugins.delete("prefetch")
               //删除index.html开头的带有prefetch属性的link，不要异步下载暂时不需要的页面组件文件
            },
        }
 ```

​      在看首屏时，是不会异步下载懒加载的页面。除非用户访问了懒加载页面时，才临时下载懒加载页面的js文件。

 ## 跨域

**cors:**

优点:仅修改服务器端

缺点:必须知道客户端的具体ip地址

**jsonp:**

优点:不需要知道客户端的具体ip地址

缺点:需要客户端和服务器端都作出调整

**http-proxy:**

项目中内嵌的专门发送请求的js程序,这个程序可以用核心的http模块发送http请求,而不是ajax请求

优点:

1.由于发送的是http请求,不是ajax请求,所以不受浏览器的同源策略限制,没有跨域的问题

2.用http代理方式跨域,不需要服务器端做任何跨域处理



在根目录创建vue.config.js

```js
module.exports={
  devServer: {
    proxy: {
      '/api': {
        target: "http://ustbhuangyi.com/",
        changeOrigin: true,
        pathRewrite: {
          '^/api' : '' //将程序中的/api，替换为空字符串，再和target中的基础路径拼接起来作为发送到服务器的最终请求地址。
        }
      }
    }
  }
}

```

axios请求

```js
//get请求
export const  getRecommentList=()=>{
 return new Promise((resolve,reject)=>{
  let url='/api/music/api/getDiscList'
  axios.get(url)
  .then((data)=>{
   resolve(data)
  })
  .catch((err)=>{
    reject(err)
  })
 })
}
//post请求
export const  getRecommentList=()=>{
 return new Promise((resolve,reject)=>{
  let url='/api/music/api/getDiscList'
  let data={
    firstName: 'Fred',
    lastName: 'Flintstone'
    },
  axios.post(url,data)
  .then((data)=>{
   resolve(data)
  })
  .catch((err)=>{
    reject(err)
  })
 })
}
```







## 事件修饰符

.stop阻止冒泡

`<a @click.stop="handle"> </a>`

.prebent阻止默认行为 a链接的跳转

`<a @click.prevent="handle"> </a>`

once  事件值触发一次

`<a @click.onec="handle"> </a>`

# 2.组件库以及mint UI使用案例



### 组件库的分类

#### pc端组件库

- element UI
- AT-UI
- View UI

#### 移动端组件库

- mint UI  
- Vant UI
  - Vant Ueapp 小程序的UI
- Cube UI

### vant UI   rem适配

**postcss**

postcss是一处理css的处理工具,本身功能单一,他主要负责解析css代码,在交由插件来处理,

插件体系非常强大,例如:

- Autoprefixer 插件可以实现自动添加浏览器相关的声明前缀

- PossCSS Preset Env 插件可以让你使用最新的css语法特性并且向下兼容

- posscss_pxtorem 可以实现将px转为rem

vuecil中默认自带Autoprefixer插件



Vant 中的样式默认使用`px`作为单位，如果需要使用`rem`单位，推荐使用以下两个工具：

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 postcss 插件，用于将`px`转化为 `rem`

  - 安装依赖 `npm install postcss-pxtorem -D`

  - 在项目根目录中创建`postcss.config.js`文件

    ```js
    /** 
     *postcss的配置文件
     */
    module.exports = {
        // 配置要是用的相关插件
        plugins: {
            // // 用来兼容不同浏览器
            // autoprefixer: {
            //     // 写在这里控制台会有警告,因为在脚手架项目中package.json 文件里的 browserslist已经配置了兼容,所以要将browsers写到browserslist文件里
            //     browsers: ['Android >= 4.0', 'iOS >= 8'],
            // },
            //把px->rem
            'postcss-pxtorem': {
                //转换的根元素的基准值
                //根据 设计稿宽度 / 10  来设置 如375px/10
                //但是vant默认37.5,所以要将设计稿宽度设置为375px方便测量
                rootValue: 37.5,
                //需要转换的css属性,* 代表所有属性  例如'font-size'只转换字体大小属性
                propList: ['*'],
            },
        },
    };
    ```

    ```js
     /*package.json 文件里的 browserslist 字段 (或一个单独的 .browserslistrc 文件)，指定了项目的目标浏览器的范围。这个值会被 @babel/preset-env 和 Autoprefixer 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。*/	
    "browserslist": [
        //兼容到超过1%的用户使用的浏览器
           // "> 1%",
        //兼容到最后两个版本
           // "last 2 versions",
        //没死掉的浏览器
           // "not dead"
        "Android >= 4.0",
        "iOS >= 8"
        ]
    ```

    

- [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值

  - 安装依赖   `npm i -S amfe-flexible`
  - 在main.js中加载执行该模块`import 'amfe-flexible'`   自动设置rem基准值(html标签字体大小)

### mint UI

### 安 装

```
npm install --save mint-ui
```

### 使用

在`main.js`中

**导入mint UI**

```
import MintUI from 'mint-ui'
```

**导入样式文件**

```
import 'mint-ui/lib/style.min.css'
```

**注册为Vue的插件**

```
Vue.use(MintUI)
```



#### header组件

header组件用于实现顶部导航

```html
<mt-header title="标题">
</mt-header>
```





#### button组件

```html
改变颜色

<mt-button type="default">default</mt-button>
<mt-button type="primary">primary</mt-button>
<mt-button type="danger">danger</mt-button>
改变大小

<mt-button size="small">small</mt-button>
<mt-button size="large">large</mt-button>
<mt-button size="normal">normal</mt-button>
禁用按钮

<mt-button disabled>disabled</mt-button>
幽灵按钮

<mt-button plain>plain</mt-button>
带图标

<mt-button icon="back">back</mt-button>
<mt-button icon="more">更多</mt-button>

自定义图标
<mt-button>
  <img src="../assets/100x100.png" height="20" width="20" slot="icon">
  带自定义图标
</mt-button>
```

#### field组件 文本框

| 参数         | 说明                                           | 类型    | 可选值                                                       | 默认值 |
| ------------ | ---------------------------------------------- | ------- | ------------------------------------------------------------ | ------ |
| type         | 输入框类型                                     | String  | text, number, email, url, tel, date, datetime, password, textarea | text   |
| label        | 标签                                           | String  |                                                              |        |
| value        | 绑定表单输入值                                 | String  |                                                              |        |
| rows         | 类型为 textarea 时可指定高度（显示行数）       | Number  |                                                              |        |
| placeholder  | 占位内容                                       | String  |                                                              |        |
| disableClear | 禁用 clear 按钮                                | Booean  |                                                              | false  |
| readonly     | 只读                                           | Boolean |                                                              | false  |
| disabled     | 禁用                                           | Boolean |                                                              | false  |
| state        | 校验状态                                       | String  | error, 错误   success, 成功warning警告                       |        |
| attr         | 设置原生属性，例如 `:attr="{ maxlength: 10 }"` | Object  |                                                              |        |

```html
<template>
  <div>
    <mt-field
      type="text"
      :attr="{ maxlength: 10 }"
      lable="用户名"
      placeholder="用户名"
    >
    </mt-field>
    <mt-field
      type="password"
      :attr="{ maxlength: 10, autocomplete: 'off' }"
      lable="密码"
      placeholder="密码 "
      state="success"
    >
      <!-- autocomplete: off 关闭自动填充 -->
    </mt-field>
  </div>
</template>
```



#### Toast - 简短的消息提示框

| 参数      | 说明                                     | 类型   | 可选值                  | 默认值   |
| --------- | ---------------------------------------- | ------ | ----------------------- | -------- |
| message   | 文本内容                                 | String |                         |          |
| position  | Toast 的位置                             | String | 'top' 'bottom' 'middle' | 'middle' |
| duration  | 持续时间（毫秒），若为 -1 则不会自动关闭 | Number |                         | 3000     |
| className | Toast 的类名。可以为其添加样式           | String |                         |          |
| iconClass | icon 图标的类名                          | String |                         |          |

```js

//简捷方式
this.$toast("提示内容")
//标准方式
this.$toast({
    message:"提示内容",
    position:"位置(top|middle|bottom)",
    duration:"显示时长(3000ms)",
    iconClass:"字体图标CSS类名称"
})
```

**在`Mint UI` 中，`<mt-field>`组件获取/失去焦点的语法结构是：**

```html
<mt-field 
      @blur.native.capture="函数名称" 
      @focus.native.capture="函数名称">
</mt-field>

```

#### navbar /  tabbar组件  选项卡

`Navbar / tabbar`组件用于实现 顶部 / 底部 选项卡，其语法结构是：

```html
<mt-navbar v-model="变量名称" fixed>
    <mt-tab-item id="当前选项卡的ID">
        ...
    </mt-tab-item>
    ...
</mt-navbar>

```

> `<mt-navbar>`绑定的变量值只能为`<mt-tab-item>`的`id`。
>
> `<mt-tab-item>`的`id`只需要在当前`<mt-navbar>`中保持唯一即可。
>
> `fixed`属性用于控制是否固定顶部选项卡，`boolean`类型
>
> 可以在`<mt-tab-item>`中嵌套图片，并且为图片设置`slot="icon"`属性的话，其将作为选项卡的图标显示。

```vue
<template>
  <div>
    <mt-header title="顶部导航"></mt-header>
    <mt-navbar v-model="active">
      <mt-tab-item id="1">
        HTML5
        <img src="../../assets/html5.png" slot="icon" />
      </mt-tab-item>
      <mt-tab-item id="2"> CSS3 </mt-tab-item>
      <mt-tab-item id="3">JavaScript</mt-tab-item>
      <mt-tab-item id="4">jQuery</mt-tab-item>
    </mt-navbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "1",
    };
  },
};
</script>
```

#### `TabContainer`组件  面板

`TabContainer`组件用于实现面板，其语法结构是：

```html
<mt-tab-container v-model="变量名称" swipeable>
    // swipeable  滑入效果 
    <mt-tab-container-item id="当前面板的ID">
        ...
    </mt-tab-container-item>
    ...
</mt-tab-container>

```

> `<mt-tab-container>`绑定的变量值只能为`<mt-tab-container-item>`的`id`。
>
> `<mt-tab-container-item>`的`id`只需要在当前`<mt-tab-container>`中保持唯一即可。



**与选项卡联用**

```vue
<template>
  <div>
    <mt-header title="顶部导航"></mt-header>
    <mt-navbar v-model="active">
      <mt-tab-item id="1"> HTML5 </mt-tab-item>
      <mt-tab-item id="2"> CSS3 </mt-tab-item>
      <mt-tab-item id="3">JavaScript</mt-tab-item>
      <mt-tab-item id="4">jQuery</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="1"> 1 </mt-tab-container-item>
      <mt-tab-container-item id="2"> 2 </mt-tab-container-item>
      <mt-tab-container-item id="3"> 3 </mt-tab-container-item>
      <mt-tab-container-item id="4"> 4 </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "1",
    };
  },
};
</script>
```

#### 关于底部选项卡的链接

1. 直接在`<mt-tab-item>`中用href属性跳转   

   最终webpack会将me-tab-item打包为a标签 

2. 第二种：因为在  中一定进行了双向数据绑定，所以可以通过监听该变量值，然后再通过 router 进行路由的跳转，示例代码如下：

   ```vue
     watch: {
       tab(val) {
         if (val == "index") {
           this.$router.push("/").catch((e) => {});
         }
         if (val == "me") {
           this.$router.push("/me").catch((e) => {});
         }
       },
     },
   ```

   之所以在 router.push() 方法后添加 catch() 原因是：导航被复制(其实是 Vue.js 本身的原因 所造成的)，解决方案是添加 catch() 即可，错误代码提示如下：

   ![](images\error.png)

###  

### 发送`HTTP`请求到`WEB`服务器

1.既然要发送`HTTP`请求，请问要通过什么技术来发送呢？-- `axios`

A、安装

```shell
npm install --save axios

```

B、配置 -- `main.js`完成配置

```javascript
//导入模块
import axios from 'axios';
//配置服务器的基础地址,代表已经确定了WEB服务器的地址及端口号
axios.defaults.baseURL = 'http://127.0.0.1:3000';
//原生链扩展属性 
Vue.prototype.axios = axios;

```

C、发送请求 --- 请问在什么时候发送异步的请求呢?  -- 引申出`Vue`生命周期的钩子函数

此时`Home.vue`中的示例代码如下：

```javascript
mounted(){
    //this.axios.get(URL地址,请求参数).then(res=>{
    //现在一切问题的根源在于 -- 不存在服务器，也就不存在服务器的API接口
    //});
}

```

###  `WEB`服务器接收并且处理请求，然后响应信息

承接上述的问题 -- 现在一切问题的根源在于 -- 不存在服务器，也就不存在服务器的`API`接口

既然请求类型为`HTTP`请求，那么也代表必须要存在`HTTP`服务器 -- 也就是我们常说的`WEB`服务器，所以现在要安装`Express`框架并且进行相关的配置，示例代码如下：

A.安装

```shell
npm install --save express

```

B.使用 -- 在 `app.js`中完成

```javascript
const express = require('express');
const server = express();
server.listen(3000,()=>{
  console.log('server is running...');
});

```

C.启动，在终端输入

```shell
node app.js

```

此时服务器的运行效果如下图所示：

![](images\a1.png)

但目前还没有相关的`API`接口供用户来调用，所以：

A. 在服务器上封装 `GET` 类型的 `API`接口，示例代码如下：

```javascript
// 获取所有文章分类的接口
server.get('/category',(req,res)=>{
  res.send('OK');
});

```

B. 重新启动`Node`服务器

停止的快捷键 `ctrl+c`  

启动`Node`服务器的命令 `node app.js`

C.修改`Home.vue`中的`mounted`的异步请求信息，此时修改的信息由原来的

```javascript
mounted(){
    //this.axios.get(URL地址,请求参数).then(res=>{
    //现在一切问题的根源在于 -- 不存在服务器，也就不存在服务器的API接口
    //});
}

```

修改为：

```javascript
this.axios.get('/category').then(res=>{

});

```

此时脚手架(客户端)的运行结果如下图所示：

![跨域错误](images\跨域错误.png)

此时错误产生的原因是：跨域  --- 因为客户端的端口号为 `8080`，而服务器的端口号为 `3000`,所以就产生了跨域！**目前首要的问题是先解决跨域，然后才可能看到服务器响应的信息。**

**解决跨域  --- `CORS`模块实现**

A.服务器安装`cors`模块

```shell
npm install --save cors

```

B.配置 -- `app.js`实现

```javascript
const cors = require('cors');

server.use(cors({
  origin:['http://127.0.0.1:8080','http://localhost:8080']
}));

```

C.重新启动`Node`服务器

此时客户端的运行结果如下图所示：

![](images\a2.png)



**此时已代表整个的请求过程是完成畅通的！！！**

**而真的目的是要获取数据库中文章分类表的数据！！！**,所以需要重新修改`/category`接口，以完成实际的业务需要！原来的接口代码如下：

```javascript
// 获取所有文章分类的接口
server.get('/category',(req,res)=>{
  res.send('OK');
});

```

现要修改如下：

数据库现在已经存在，但是想在`Node`中访问数据库的话，还需要要通过`MySQL`模块，所以：

A.在服务器安装`MySQL`模块

```shell
npm install --save mysql	

```

B.配置`MySQL`并且创建`MySQL`连接池，示例代码如下：

```javascript
const mysql = require('mysql');
const pool = mysql.createPool({
  //MySQL数据库服务器的地址
  host:'127.0.0.1',
  //端口号
  port:3306,
  //数据库用户的用户名
  user:'root',
  //数据库用户的密码
  password:'',
  //数据库名称
  database:'xzqa',
  //最大连接数据
  connectionLimit:10
});

```

C.重新修改`/category` 接口，通过连接池获取数据后，返回给客户端

```javascript
// 获取所有文章分类的接口
server.get('/category',(req,res)=>{
  //查找文章分类表中的所有数据
  let sql = 'SELECT id,category_name FROM xzqa_category';
  //通过MySQL连接池执行SQL语句
  pool.query(sql,(err,results)=>{
    if(err) throw err;
    res.send({message:'查询成功',code:1,results:results});
  });
});

```

此时客户端的运行结果如下图所示：

![](images\a3.png)

**此时代表服务器已经返回客户端期望的数据了！！！**

###  接收并且输出数据

在`Home.vue`的`data`中声明属性，如`category`用于存储服务器返回的文章分类信息，其默认为空数组。示例代码如下：

```javascript
data(){
	return {
		//存储服务器返回的文章分类信息
		category:[]
	}
}

```

现在可以修改`mounted()`钩子函数，以接收服务器返回的数据，代码由原来的

```javascript
this.axios.get('/category').then(res=>{

});


```

改为：

```javascript
this.axios.get('/category').then(res=>{
	this.category = res.data.results;
});

```

目前 已经将服务器返回的数据赋予变量`category`，现在就可以通过`v-for`指令来动态决定顶部选项卡的数量及显示内容了，示例代码如下：

```HTML
<mt-navbar v-model="active">
    <mt-tab-item 
                 :id="item.id.toString()" 
                 v-for="(item,index) of category"
                 :key="index">
        {{item.category_name}}
    </mt-tab-item>    
</mt-navbar>

```

## 面板数据的初始化

1.在`Home.vue`中还需要再在`mounted()`钩子函数中发送请求，以获取数据

2.在服务器端获取数据时一定带有条件。

3.由2类推出在发送请求时一定带有参数，该参数会提交到服务器作为查询条件使用

A.在`Home.vue`中还需要再在`mounted()`钩子函数中发送请求，示例代码如下：

```javascript
mounted(){
    //暂时在服务器上不存在/lists的接口
	this.axios.get('/lists').then(res=>{
		
	})
}

```

B.现在在服务器上不需要获取全部的文章数据，而且只是获取一部分数据，该部分数据由文章的类型来决定，此时`SQL`语句的示例代码如下：

```mysql
//category_id标识的是哪一个分类
SELECT id,subject FROM xzqa_article WHERE category_id = 客户端默认的分类的ID;

```

而客户端默认的分类`ID`是不固定的，所以需要客户端明确告诉服务器，此时服务器即可进行查询操作了。客户端只能在请求时以请求参数的形式告知服务器，所以客户端的请求代码由原来的：

```javascript
mounted(){
    //暂时在服务器上不存在/lists的接口
	this.axios.get('/lists').then(res=>{
		
	})
}

```

修改为：

```javascript

mounted(){
    //暂时在服务器上不存在/lists的接口
    //active变量在Home.vue中用于存储默认被选定的分类ID
	this.axios.get('/lists?cid=' + this.active).then(res=>{
		
	})
}

```

此时客户端的运行如果如下图所示：

![](images\a4.png)

现在出现`404`的原因是因为：服务器上不存在`/lists`的接口，所以：

C.修改`app.js`，以添加`/lists`的`GET`类型的接口，示例代码如下：

```javascript
server.get('/lists',(req,res)=>{
  //接收客户端传递的URL参数
  let cid = req.query.cid;
  //现以接收到cid为条件进行文章信息的查找
  let sql = 'SELECT id,subject,description,image FROM xzqa_article WHERE category_id = ?';
  //执行SQL查询
  pool.query(sql,[cid],(err,results)=>{
    if(err) throw err;
    res.send({message:'查询成功',code:1,results:results});
  })
});

```

现在需要重新启动`Node`服务器，此时客户端的运行结果如下图所示：

![](images\a5.png)

D.在`Home.vue`中的`data`内声明属性 -- 如 `articles`用于存储服务器返回的文章数据，示例代码如下：

```javascript
data(){
	return {
		articles:[]
	}
}

```

还需要再行修改`mounted()`钩子函数中获取文章数据的代码，因为需要接收数据并且赋予`articles`变量，此时的示例代码由原来的

```javascript
mounted(){
    //暂时在服务器上不存在/lists的接口
    //active变量在Home.vue中用于存储默认被选定的分类ID
	this.axios.get('/lists?cid=' + this.active).then(res=>{
		
	})
}

```

改为：

```javascript
mounted(){
    //暂时在服务器上不存在/lists的接口
    //active变量在Home.vue中用于存储默认被选定的分类ID
	this.axios.get('/lists?cid=' + this.active).then(res=>{
		this.articles = res.data.results;
	})
}


```

最后只需要通过`v-for`指令循环输出文章即可，示例代码如下：

```html
<div 
     class="article"
     v-for="(article,index) of articles"
     :key="index">
    <!-- 标题链接开始 -->
    <div class="article-subject">
        {{article.subject}}
    </div>
    <!-- 标题链接结束 -->
    <!-- 缩略图及简介开始 -->
    <div class="article-wrapper">
        <div class="article-image">
            <img src="../assets/articles/123.jpg" alt="">
        </div>
        <div class="article-desc">
            {{article.description}}         
        </div>
    </div>
    <!-- 缩略图及简介结束 -->
</div>
<!-- 单一文章信息结束 -->


```

# 首页缩略图的显示

如果图片存储在`assets`目录下且为动态图片的话，此时就需要通过`require`语句来进行动态加载操作。

```javascript
// 获取默认文章分类下的文章数据
this.axios.get('/lists?cid=' + this.active).then(res=>{
    //将服务器返回的数据存储临时变量中
    let data = res.data.results;
    //遍历data数组来实现图片的动态加载
    data.forEach(item=>{        
        if(item.image != null){
            //图片动态加载后进行属性的重新赋值
            item.image = require('../assets/articles/' + item.image);         
        }
        //将动态处理的文章信息添加到数组的未尾
        // (现在不管有没有图片,文章的信息已经全部添加到articles数组中)
        this.articles.push(item);
    });
});

```

> 

# 切换顶部选项卡时的业务

A.切换选项卡时才获取数据 -- 如何证明进行切换了呢?

既然顶部选项卡已经进行了双向数据绑定，那么只需要监听该变量即可，如果该变量发生了变化，则代表顶部选项卡发生了变化，就可以向`WEB`服务器进行数据获取操作了！

![](images\a6.png)

所以只需要通过`watch`监听`active`变量的值即可，示例代码如下：

```javascript
watch:{
    active(){
		
    }
}

```

B.要获取当前分类下的数据

因为之前已经存在获取默认分类下包含的文件数据的`API`接口，现在只需要再次调用即可，并且一定按接口的规范（如请求方式，请求参数的数量及名称等）进行调用，示例代码如下：

```javascript
watch:{
    active(){
		this.axios.get('/lists?cid=' + this.active).then(res=>{
          this.articles = res.data.results;
      	});
    }
}

```

按照常理说现在就需要在对应的面板中进行数据的输出了，但实际上只需要一个面板存在即可，因为只要用户在浏览时数据发生了变化，用户就会感觉面板在发生，所以之前的`mt-tab-container-item`中只需要保留一个即可。此时的结构示例如下：



```html
<mt-tab-container v-model="active">
    <mt-tab-container-item id="1">
        <!-- 单一文章信息开始 -->
        <div>
            ...
        </div>
        <!-- 单一文章信息结束 -->
    </mt-tab-container-item>
</mt-tab-container>

```

现在的问题是：在切换顶部选项卡时面板根本不发生变化 --- 因为现在只有一个面板！！！ 

现在只需要让面板的`id`动态与所绑定变量的值相同即可。所以代码修改为：

```html
<mt-tab-container v-model="active">
    <mt-tab-container-item :id="active.toString()">
        <!-- 单一文章信息开始 -->
        <div>
            ...
        </div>
        <!-- 单一文章信息结束 -->
    </mt-tab-container-item>
</mt-tab-container>

```

C.因为数据表中某些文章信息中不包含的图片信息，可能会导致页面显示效果不好，截图如下：

![image-20200929120000454](images\a7.png)

所以在输出图片时仍需通过`v-if`指令进行判断操作，示例代码如下：

```html
 <!-- 缩略图及简介开始 -->
<div class="article-wrapper">
    <div class="article-image" v-if="article.image != null">
        <img :src="article.image" alt="">
    </div>
    <div class="article-desc">
        {{article.description}}         
    </div>
</div>
<!-- 缩略图及简介结束 -->


```

# 图片的懒加载

`Mint UI`的`Lazy load`指令

`Lazy Load`用于实现图片的懒加载，其语法结构是：

```html
<img v-lazy="图片的URL地址">

```

现在只需要将`Home.vue`中相关的文章列表的图片采用懒加载指令即可，示例代码如下：

```html

<!-- 缩略图及简介开始 -->
<div class="article-wrapper">
    <div class="article-image" v-if="article.image != null">
        <img v-lazy="article.image" alt="">
    </div>
    <div class="article-desc">
        {{article.description}}         
    </div>
</div>
<!-- 缩略图及简介结束 -->

```

# 分页数据的实现

## 技术概述

利用`MySQL`数据库进行分页显示数据时，实质上是利用了`SELECT`语句的`LIMIT` 子句来实现的。

`SELECT`语句的语法结构是：

```mysql
SELECT ... LIMIT [offset,]row_count

```

> `offset`，指从第几条记录开始返回，注意：A.从0开始编号 B.与`id`没有任何关系
>
> 如果省略从参数的话，则从第0条开始返回()
>
> `offset`参数在分页时存在标准的计算公式，为：
>
> ```text
> (页码-1) * 每页显示记录数
> 
> ```
>
> `row_count`，用于指定返回多少条记录(必须为大于等于`1`的正整数)
>
> ```mysql
> SELECT id,subject FROM xzqa_article WHERE id % 7 = 0 LIMIT 5;
> 
> ```
>
> 此时的运行效果是：

![image-20200929142516672](images\a8.png)



```mysql
SELECT id,subject FROM xzqa_article WHERE id % 7 = 0 LIMIT 2,2;

```

此时的运行效果是：

![image-20200929142559526](images\a9.png)

## 初始情况下的显示部分数据

初始情况下的显示部分数据要显示部分数据，此时客户端需要明确告知服务器要**获取第几页的数据**，这时服务器才根据客户端的需要进行计算后得到部分数据以返回给客户端。

**此时也就代表客户端在发送请求时，除了要带有原来的参数外，还需要再添加一个请求参数，该参数是告知服务器要获取第几页的数据的页码！！！**

所以要修改`mounted`钩子函数中的 `/lists`请求，由原来的:

``` javascript
// 获取默认文章分类下的文章数据
this.axios.get('/lists?cid=' + this.active).then(res=>{
    //...
});

```

要修改为：

```javascript
// 获取默认文章分类下的文章数据
// cid参数表示文章类型的ID
// page参数表示页码
// 这两个参数可以理解为：现在要从服务器获取某一类(cid)的第几页(page)的文章数据
this.axios.get('/lists?cid=' + this.active + '&page=1').then(res=>{
    //...
});

```

此时客户端的运行结果如下图所示：

![image-20200929144943318](images\a10.png)

现在已 经证明请求正常发送了，但是服务器根本没有接收

所以现在要修改`app.js`中`/lists`接口

第一步：修改后的截图如下

![image-20200929153959705](images\a11.png)

 `SELECT * FROM 表名 LIMIT start,count;`

 **start: 开始查询的值  count: 每页的数据量  **

**start = (当前页码-1)*每页数据量**

第二步：重新启动`Node`服务器

但是如果切换顶部选项卡时，此时的运行效果如下图所示：

![](images\a12.png)

## 切换顶部选项卡时显示部分数据

在切换切换顶部选项卡曾经进行过监听操作，此时分析如下:

>  现在在监听时仍然调用 /lists接口，而现在的/lists接口必须具备
>  两个参数 cid 和 page ,而现在只传递了 cid,所以服务器代码无法运行。
>  所以，也必须同等传递两个参数 cid 和 page

```javascript
//监听顶部选项卡
active(){
    //清除之前可保存的文章数据
    this.articles= [];
    
    this.axios.get('/lists?page=1&cid=' + this.active).then(res=>{
        //将服务器返回的数据存储临时变量中
        let data = res.data.results;
        //遍历data数组来实现图片的动态加载
        data.forEach(item=>{
            if( item.image != null){
                //图片动态加载后进行属性的重新赋值
                item.image = require('../assets/articles/' + item.image);
            }
            //将动态处理的文章信息添加到数组的未尾
            // (现在不管有没有图片,文章的信息已经全部添加到articles数组中)
            this.articles.push(item);
        });
    });
},

```

到目前为止，初始情况及切换顶部选项卡时都可以显示部分数据了，但实际的数据中远远多于显示的数据，应该是用户向下滚动时继续加载第二页，第三页...的数据

## 无限滚动+分页

`Mint UI`的无限滚动指令，其语法结构是：

```html
<HTML元素
    infinite-scroll-distance="阈值"
    v-infinite-scroll="方法名称"
    infinite-scroll-disabled="变量">
    
</HTML元素>

```

> `infinite-scroll-distance`属性用于指定距离底部还有多少个像素时触发滚动方法
>
> `v-infinite-scroll`属性用于指定触发的方法名称
>
> `infinite-scroll-disabled`属性用于保证在执行完上一次的滚动方法之前，既使再次进行滚动范围也不再触发触发方法。

# 首页存在的缺陷

A.初始情况下竟然发送了两次的请求

![image-20200930090740606](images\a13.png)

B.当向下滚动时，如果超过了总页数，仍然会继续发送请求

![image-20200930090836897](images\a14.png)

### 初始情况下竟然发送了两次的请求

只需要通过无限滚动指令的一个属性实现即可。

```html
<HTML元素
    infinite-scroll-distance="阈值"
    v-infinite-scroll="方法名称"
    infinite-scroll-disabled="变量"
    infinite-scroll-immediate-check="true">
    ...
</HTML元素>

```

> `infinite-scroll-immediate-check`用于控制是否立即检测以执行滚动方法，布尔类型

## 当向下滚动时，如果超过了总页数，仍然会继续发送请求

 现在应该在当前页码小于等于总页数时，向服务器发送请求，其他时候不再发送请求了，于是`loadMore()`函数的示例代码如下：

```javascript
loadMore(){
	this.page++;
	if(this.page<=总页数){
		//发送AXIOS请求
	}
}

```

**现在的问题是：怎么获知总页数呢？** -- 总页数一定是在服务器上计算出并且返回给客户端的

**此时也就代表需要修改`app.js`中的`/lists`接口的代码了!**

`MySQL`数据库中计算总页数的标准公式为：

```javascript
Math.ceil(总记录数/每页显示的记录数)

```

**目前还存在另外的一个问题：如何获取总记录数呢？** **-- 聚合函数**

- `COUNT`,计数
- `SUM`，求和
- `AVG`，平均值
- `MAX`，最大值
- `MIN`，最小值

> 特点：
>
> 1.有且只有一个返回值
>
> 2.聚合函数可以出现在`HAVING`子句中

此时`/lists`接口修改为：

```javascript

server.get('/lists',(req,res)=>{
    //接收客户端传递的URL参数中的cid  -- 文章分类ID
    let cid = req.query.cid;
    //接收客户端传递的URL参数中的page -- 页码
    let page = req.query.page;
    //存储每页显示的记录数(其实pagesize就是一个纯变量,与分页没有任何关系)
    let pagesize = 15;
    //根据MySQL分页的标准计算公式计算出offset参数值,并且带入到SQL语句中
    let offset = (page - 1) * pagesize;
    //现以接收到cid为条件进行文章信息的查找,此时的pagesize才是真正的返回多少条记录呢
    let sql = 'SELECT id,subject,description,image FROM xzqa_article WHERE category_id = ? LIMIT ' + offset + ',' + pagesize;
    //存储总记录数
    let rowcount;
    //存储总页数
    let pagecount;
    //执行SQL查询
    pool.query(sql,[cid],(err,result)=>{
        if(err) throw err;
        /////////////////   
        //1.获取记录数
        sql = 'SELECT COUNT(id) AS count FROM xzqa_article WHERE category_id=?';
        pool.query(sql,[cid],(err,results)=>{
            if(err) throw err;    
            rowcount = results[0].count;
            //2.计算总页数
            pagecount = Math.ceil(rowcount / pagesize);
            //返回原来的查询记录的数据及总页数信息
            res.send({message:'查询成功',code:1,results:result,pagecount:pagecount});   
        });
        /////////////////

    })
});

```

此时客户端的运行结果如下图所示：

![image-20200930110039579](images\a15.png)

现在就需要在`Home.vue`的`data`中声明一个变量，如`pagecount`，用于存储服务器返回的总页数，并且同时在`mounted`、`active`及`loadMore`中分进行进行赋值操作。

> 其实在`loadMore`中根本没有必要为`pagecount`进行赋值操作，但之所以添加的原因是：为便于自定义函数的提取工作。	

现在已然获取到了总页数，那么之前的判断就可以正常执行了，所以`Home.vue`中的`loadMore`的分支语句就可以执行了。

现在纵观`mounted`、`action`及`loadMore`这三个函数中都相同相同的代码，所以最好的解决方案是：封装为自定义函数，然后三次调用即可。

自定义函数的代码如下：

```javascript
loadData(cid,page){
    //此时的真正作用是：现在已经触发了滚动方法,既使现在再次进行
    //滚动范围也不再触发滚动方法了    
    this.busy = true;
    //向服务器发送请求，以获取当前分类下的第几页的数据
    this.axios.get('/lists?cid=' + cid + '&page=' + page).then(res=>{
        let data = res.data.results;    
        //将服务器返回的总页数赋值给pagecount变量
        this.pagecount = res.data.pagecount;    
        data.forEach(item=>{
            if(item.image != null){
                item.image = require('../assets/articles/' + item.image);
            }
            this.articles.push(item);
        })
        //真正的作用是：上一次的请求已经处理完成了
        //如果现在再次进行滚动范围，则仍然要触发滚动方法
        this.busy = false;
    });


```



## 加载提示框

`Mint UI`中的`Indicator`组件用于实现加载提示框，其语法结构是：

```javascript
//显示加载提示框
this.$indicator.open("提示内容")


this.$indicator.open({
    text:"提示内容",
    spinnerType:"加载图标类型"
})

//关闭加载提示框
this.$indicator.close()

```

> `spinnerType`包括有：
>
> - `snake`，蛇形
> - `double-bounce`,双弹跳
> - `triple-bound`，三弹跳
> - `fading-circle`，渐消圆

### 详情页面的实现

第一步：在创建`src`目录下创建`Article.vue`，然后在`router/index.js`中导入页面组件并且设置路由信息

第二步：修改`Home.vue`为标题和缩略图添加`router-link`，以链接到`article`路由

第三步：要获取用户当前浏览的文章信息，并且显示在页面中

**分析过程:**

在`Article.vue`中要显示某一篇特定文章的相关信息，也就代表其需要从数据库中查找特定的记录才行，也就意味着`SQL`语句中一定需要带有查询条件，而且该条件必须且只能确定唯一一条记录才行，再类推一下，在整个数据表中可以唯 一存在的就是数据表的主键字段！

现在也就是说必须在`Article.vue`中获取到用户刚刚点击的那篇文章的`ID`，然后再以此为条件进行查询即可。

### 第一步：修改`Home.vue`

修改`Home.vue`中的链接，示例代码如下：

```html
<router-link :to="`/article/${article.id}`">
	...     
</router-link>

```

### 第二步：修改`router/index.js`

修改`router/index.js`中关于`article`的路由如下:

```javascript
{
    path: '/article/:id',    
	component: Article
}

```

![image-20200930145936398](images\a16.png)

### 第三步：修改`Article.vue`

在`Article.vue`中`mounted`钩子函数中要获取地址栏中的`id`参数值，并且将此参数值传递到`WEB`服务器的相关接口中，示例代码如下：

```javascript
mounted(){
	//1.获取地址栏中的ID
    let id = this.$route.params.id;
    //2.发送异步的请求到WEB服务器
    this.axios.get('/article?id=' + id).then(res=>{
        //....
    })
}


```

客户端此时的运行效果如下图所示：

![image-20200930153541003](images\a17.png)

因为现在服务器根本不存在`/article`的接口，所以：

### 第四步：修改`app.js`

A.添加名称为`/article`的`GET`类型的`API`接口，示例代码如下：

```javascript
server.get('/article',(req,res)=>{
 let id = req.query.id;
});


```

B.现在需要通过多表的关联实现数据的查找操作，所以在`/article` 接口中需要添加以下代码：

```javascript
//SQL查询 -- 多表(内)连接
let sql = 'SELECT r.id,subject,content,created_at,nickname,avatar,article_number FROM xzqa_author AS u INNER JOIN xzqa_article  AS r ON  author_id = u.id WHERE r.id=?';
//执行SQL语句
pool.query(sql,[id],(err,results)=>{
    if(err) throw err;
    //因为results返回的数据形态为 [{...}]，而现在只包含一条记录
    //所以直接返回对象的即可，故可写为 results[0],返回 { ... }
    res.send({message:'查询成功',code:1,result:results[0]});
});

```

C.重新启动`Node`服务器

此时客户端的运行结果如下图所示：

![image-20200930165010405](images\a18.png)	

现在就需要在客户端接收并且显示服务器返回的数据了！

### 第五步：客户端接收并且显示数据

在`Article.vue`的`data`中声明`info`的对象类型的变量，示例代码如下:

```javascript
data(){
	return {
		//存储文章的相关信息
		info:{}
	}
}

```

然后将服务器返回的结果赋值给`info`变量，示例代码如下：

```javascript
 this.axios.get('/article?id=' + id).then(res=>{
	this.info = res.data.result;
 });

```

现在只需要在`Article.vue`中进行输出即可，注意两个坑：

A.正文内容的坑

![image-20200930170120526](images\a19.png)

现在在正文中存在大量的`HTML`标签，这些`HTML`标签在被`Vue`渲染时会进行编译，其中的所有的`HTML`标签都被认为是普通的字符进行输出，而不认为是`HTML`标签，也就产生不了对应的效果 --- 如何解决呢? --- `v-html` 指令

所以以上的输出语句需要修改为：

```html
<div class="rich-content" v-html="info.content">
</div>

```

此时的运行效果如下图所示：

![image-20200930171215128](images\a20.png)

但此时的样式不会生效，因为 `v-html`指令的中的内容没有经过`Vue`进行渲染处理，解决方案是使用全局的样式，示例代码如下：

```html
<style>
.rich-content p,.rich-content li{
    padding: 5px 0;
    line-height: 1.7;
}
.rich-content img{
    max-width:100%;
}
</style>

```

> `v-html`指令可参考：https://cn.vuejs.org/v2/api/#v-html

B.日期时间的"坑"

项目中关于日期时间的存储在数据库有两种方式:

A.在数据库中以`date`或`datetime`数据类型存储的

B.在数据库中以整数数字的形式存储的，该存储值为时间戳(`timestamp`，也称为`Unix`纪元，指从`1970-01-01 00:00:00`到现在经历的秒数)

如果为时间戳存储的话，在页面显示正常可读的日期时间格式就成了一个问题?

--- `Moment`的日期时间库来实现

# 3.`Moment`

`Moment`是`JavaScript`的日期时间库。

 `npm`安装

```shell
npm install --save moment

```

浏览器安装

```html
<script src="Moment.js文件URL地址"></script>

```

> https://cdnjs.com/libraries/moment.js

脚手架中使用`Moment`

在` main.js`书写以代码

```javascript
import moment from 'moment';
Vue.prototype.moment = moment;

```

`unix()`方法

`unix()`方法用于将时间戳转换为`Moment`对象，其语法结构是：

```
moment.unix(时间戳)

```

`format()`方法

`format()`方法用于格式化日期时间，其语法结构是：

```
moment.format('格式')

```

> 格式参照：http://momentjs.cn/docs/#/displaying/format/



## · `Badge`组件

`Badge`组件用于实现徽章，其语法结构是：

```html
<mt-badge 
	type="徽章类型(primary|warning|error)"
    size="徽章尺寸(small|normal|large)">
    ...
</mt-badge>

```

## · `Swipe`组件

`swipe`组件用于实现轮播图，其语法结构是：

```html
<mt-swipe 
    :showIndicators="是否显示指示标志"
    :auto="显示的时长(毫秒)"
    :speed="切换的时长(毫秒)"
    :continuous="是否循环播放">
	<mt-swipe-item>...</mt-swipe-item>
    ...
</mt-swipe>

```

> 必须为`swipe`或者容器元素设置明确的高度

# 用户注册的业务实现

A.客户端向服务器发送请求，并且将相关数据提交给服务器

用户注册的时的客户端检测业务已经实现，现在需要进行服务器业务的实现了。

此时需要将收集的客户端信息以`POST`方式提交到`WEB`服务器，示例代码如下：

```javascript
handle(){
	//已经代表服务器上必须存在POST方式的、名称为register的接口  
    //同时还需要将相关的信息(如用户名、密码等)提交到register接口
	this.axios.post('/register','username=123&password=456').then(res=>{
       //.... 
    });
}

```

而用户名和密码应该为用户输入的信息，所以上述代码需要修改为：

```javascript
handle(){
	//已经代表服务器上必须存在POST方式的、名称为register的接口  
    //同时还需要将相关的信息(如用户名、密码等)提交到register接口
	this.axios.post('/register','username=' + this.username + '&password=' + this.password).then(res=>{
       //.... 
    });
}


```

此时客户端的运行结果如下图所示：

![](images\image-20201009111330154.png)

现在的问题在于：在服务器上不存在`POST`类型的`/register`接口，所以：

第二步：在服务器上创建`POST`类型的`/register`接口，示例代码如下：

```javascript
//用户注册的接口
server.post('/register',(req,res)=>{
	//...
});

```

第三步：在`/register`接口中接收用户提交的数据

现在在`/register`接口中接收用户以`POST`方式提交的数据，所以需要`body-parser`中间件，故：

A.安装 `body-parser`

```shell
npm install --save body-parser

```

B.配置`body-parser`中间件  --  在`app.js`中实现

```javascript
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({
  extended:false
}));

```

C.修改`/register`接口，以接收客户端提交的数据，示例代码如下：

```javascript
server.post('/register',(req,res)=>{
  //接收用户以POST方式提交的数据
  let username = req.body.username;
  let password = req.body.password;  
  //在xzqa_author数据表中username字段要保证记录的唯一性
  //所以先需要检测用户名是否已经存在，
  //如果不存在，则将获取到的相关信息写入到xzqa_author(作者)表
  //否则要产生合理的错误提示给客户端
});



```



# 用户登录的业务实现

用户登录的客户端业务已经实现了，现在需要服务器端的业务处理了。

第一步：客户端的业务实现后，向服务器发送请求，并且在请求时提交相关的信息

在请求时，需要将相关的信息提交到服务器，此时仍然可以通过原始的字符串拼接形式来实现，如

```javascript
this.axios.post('/login','username=' + this.username + '&password=' + this.password).then(res=>{
	//...
})

```

如果拼接的字符串数据量比较少可以用此种方式，但是如果数据量比较大，且结构比较复杂，最好使用`QS`模块实现，此时的示例代码如下：

```javascript
let obj = {
    username:this.username,
    password:this.password
};

this.axios.post('/login',this.qs.stringify(obj)).then(res=>{
   //...
})

```

此时客户端的运行结果如下图所示：

![image-20201009170043642](images\a21.png)

第二步：修改`app.js`，以添加`POST`类型的`/login`接口，示例代码如下：

```javascript
//用户登录的接口
server.post('/login',(req,res)=>{
  //获取用户输入的用户名和密码信息
  let username = req.body.username;
  let password = md5(req.body.password);  
  //现在要以输入的用户名和密码为条件进行查找
  let sql = 'SELECT id,username,nickname,avatar FROM xzqa_author WHERE username=? AND password=?';
  pool.query(sql,[username,password],(error,results)=>{
    if(error) throw error;
    //如果找到，则代表用户登录成功
    if(results.length == 1){
      res.send({message:'登录成功',code:1,info:results[0]})
    } else { //否则代表用户登录失败
      res.send({message:'登录失败',code:0})
    }
  });
});

```

> 在上 述过程中，密码没有采用`MySQL`中的`MD5`函数加密，而采用了`MD5`模块来实现的。

第三步：客户端接收服务器返回的数据并且根据返回的数据实现不同的业务,示例代码如下：

```javascript
this.axios.post('/login',this.qs.stringify(obj)).then(res=>{
    //用户登录成功
    if(res.data.code == 1){
        //后续可能需要调整
        this.$router.push('/');
    } else {
        this.$messagebox("登录提示","用户名或密码错误");
    }
})

```

#### `QS(QueryString)`

##### 安装

```
npm install --save qs

```

##### 配置

```javascript
import qs from 'qs';

Vue.prototype.qs = qs;

```

##### 使用

·  `parse()`

`parse()`方法用于将请求字符串转换成对象形态，其语法结构是：

```
qs.parse("字符串")

```

案例如：

```javascript
let str = "username=Tom&password=123&love[0]=AA&love[1]=BB&love[2]=CC";
//将请求字符串形态转换成数组或对象
console.log(this.qs.parse(str));
//返回的结果是
{
    username:'Tom',
    password:'123',
    love:['AA','BB','CC']
}

```

· `stringify()`

`stringify()`方法用于将对象转换成请求字符串，其语法结构是：

```javascript
qs.stringify(object)

```

案例如：

```javascript
obj = {
	id:1,
	username:'Tom',
	friends:['Rose','Frank','David']
}
qs.stringify(obj);
//转换后的结果是：
"id=1&username=Tom&firends[0]=Rose&firends[1]=Frank&firends[2]=David"

```

> 友情提示：`encodeURI()`和`decodeURI()`函数

#### `MD5`模块

##### 安装及配置

```shell
npm install --save md5

```

```javascript
const md5 = require('md5');

```

##### 使用

```
md5("字符串")

```

# `Vuex`

##  什么是`Vuex`?

vuex是一个专门为vue构建的状态管理工具，主要是解决多组建状态共享的问题。强调的是集中式管理（组件与组件之间的关系变成了组建跟仓库之间的关系）。

**vuex的核心包括**：state（存放状态）、mutations（同步的更改状态）、actions（发送异步请求拿到数据）、getters（根据之前的状态发布新的状态）、modules（模块划分）

state发布一条新的数据，在getters里面更具状态派发新的状态，actions发送异步请求获取数据，然后再mutations里面同步的更新数据

使用场景：购物车的数据共享，登入注册

------

**vuex的原理：**

vuex实现了一个单项数据流，在全局又有一个state存放数据，当组建要更改state中的数据时，必须通过Mutation进行，mutation同时提供了订阅者模式供外部插件调用获取state数据的更新。而当所有异步操作（常见于调用后台接口异步获取更新数据）或批量的同步操作需要走Action，但Action也是无法直接修改state的，还是需要通过mutation来修改state的数据。最后根据state的变化，渲染到视图上。

------

**vuex的优点**

1.解决了非父子组件的消息传递（将数据存放在state中）

2.减少了AJAX请求次数，有些情景可以直接从内存中的state获取

**vuex的缺点**

1.刷新浏览器，vuex中的state会重新变为初始状态



##  安装

方法1 : 在安装`Vue`脚手架项目时选择了`Vuex`特性

方法2：通过`npm`安装

```shell
npm install --save vuex

```

## 使用

> `Vuex`的状态建议存储在`src/store`目录内

`src/store/index.js`文件结构如下：

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
//Vuex是作为Vue的插件出现的
Vue.use(Vuex);
export default new Vuex.Store({
    //物品
    state:{
        
    },
    //记账员
    getters:{
        
    },
    //搬运工
    mutations:{
        
    },
    //拉货的小汽车
    actions:{
        
    },
    modules:{
        
    }
});


```

## vuex属性

### · `state`

`state`定义了应用状态的数据结构，其数据类型可以为`string`、`number`、` boolean`、`array`、`object`等，示例代码如下：

```
state:{

}


```



```js
{{this.$store.state.xxx}}

```

### · `getters`

`Vuex`允许在`store`定义`getters`（可以认为是`store`的计算属性），`getters`的返回值会被缓存起来，只有当依赖的值发生变化时，才重新计算，所以执行效率会比较高，其语法结构是：

<font color="red">要是用state的数据时,可以在getters里先处理,再返回</font>

```javascript
getters:{
	方法名称([state]){
		//...
	}
}

```

```javascript
{{this.$store.getters.xxx}}

```

### · `mutations`

mutation：提交更新数据的方法，必须是同步的(如果需要异步使用action)。

　　 回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数，提交载荷作为第二个参数。

```javascript
mutations:{
	方法名称([state[,payload]]){
        
    }
}

```





```javascript
this.$store.commit('方法名称'[,payload])

```

### · `actions`

`actions`的作用与`Mutations`相类似，但是最大的区别在于：

**`mutations`不能产生异步操作，而`actions`可以产生异步操作**

`actions`的语法结构是：

```javascript
actions:{
	方法名称([context[,payload]]){
		//...
	}
}

```

> `context`参数代表当前`store`中的所有已有的`state`、`getters`及`mutations`等。

**调用actons**

```js
this.$store.dispatch('方法名称'[,payload])
```

### `Vuex`中的辅助函数

为什么需要辅助函数?

A.将在页面组件中书写的大量的语句代码变得简短

B.可以为`Vuex`的`state`、`getters`、`mutations`、`actions`赋予别名

- `mapState()`
- `mapGetters()`
- `mapMutations()`
- `mapActions()`

####  使用辅助函数

- `mapState()`函数

  ```javascript
  import {mapState} from 'vuex';
  
  ```

  `mapState()`函数用于为组件页面创建计算属性以返回`Vuex` 中`store`内的`state`，也就是说，其把`vuex`中的`state`来作为当前页面组件的**计算属性**来使用，其语法结构是：

  ```javascript
  //计算属性
  computed:{
  	...mapState(数组|对象)
  }
  
  ```

  示例代码如下：

  ```javascript
  import {mapState} from 'vuex';
  computed:{
      ...mapState([
          'username',
          'age',
          'sex',
          'salary',
          'products'
      ])
  }
  
  ```

  在页面组件中使用时直接进行相关的访问即可，示例代码如下：

  ```html
  姓名:{{username}}
  
  ```

  示例代码如下：

  ```javascript
  import {mapState} from 'vuex';
  computed:{
      ...mapState({
          extension:'extends'
      })
  }
  
  ```

- `mapGetters()`函数

  ```javascript
  import {mapGetters} from 'vuex';
  
  ```

  `mapGetters()`函数是为组件创建计算属性以返回`Vuex`中`getters`的返回值，其语法结构是：

  ```
  computed:{
  	...mapGetters("数组|对象")
  }
  
  ```

  示例代码如下：

  ```javascript
  import {mapGetters} from 'vuex';
  computed:{
      //以数组形式访问getters
      //...mapGetters(['getCounts'])
      //以对象形式访问getters
      ...mapGetters({
          productNum:'getCounts'
      })
  }
  
  ```

- `mapMutations()`函数

  ```javascript
  import {mapMutations} from 'vuex';
  
  ```

  `mapMutations()`函数用于为页面组件创建组件内的方法以提交`mutation`，也就是说，其把`Vuex`中的`mutations`内的方法作为当前页面组件的方法来使用，其语法结构是：

  ```
  methods:{
  	...mapMutations(数组|对象)
  }
  
  ```

  示例代码如下：

  ```javascript
  import {mapMutations} from 'vuex';
  methods:{
      ...mapMutations({
          plus:'increment',
          minus:'decrement'
      }),
          inc(){
          //提交Mutations
          //this.$store.commit('increment');
          this.plus();
      },
          dec(){
              //提交Mutations
              //this.$store.commit('decrement');
              this.minus();
          }
  }
  
  ```

  ```javascript
  import {mapMutations} from 'vuex';
   methods:{
      ...mapMutations(['addProduct']),
      add(){
        //构建对象,之所以要构建如下结构的对象,是因为在Mutations
        //中payload参数要添加到products数组的未尾，而products中包含的
        //对象如下，所以为了正常的可以进行遍历输出，故构建如下结构的对象 
        let obj = {
          productName:this.productName,
          salePrice:this.salePrice
        }
        //提交Mutations      
        //this.$store.commit('addProduct',obj);
        this.addProduct(obj);
        //路由跳转
        this.$router.push('/access1');
      }
    }
  
  
  ```

  `mapActions()`函数

- ```javascript
  import {mapActions} from 'vuex';
  
  
  ```

  `mapAtions()`函数用于为页面组件创建组件内的方法以分发`action`，也就是说，其把`Vuex`中的`actions`内的方法作为当前页面组件的方法来使用，其语法结构是：

  ```javascript
  ...mapActions(数组|对象)
  
  ```





## FastClick

移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件，这是为了检查用户是否在做双击。为了能够立即响应用户的点击事件，才有了FastClick。

```undefined
npm install fastclick --save
```

main.js

```js
import FastClick from 'fastclick'
FastClick.attach(document.body)

```

​	