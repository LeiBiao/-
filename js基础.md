## 输出

```
<script>
    // 输入
    prompt('holle world');
    // 弹出警示框
    alert('你好 世界');
    // 控制台输出
    console.log('你好 js');
</script>
```
## 变量命名规范

规则：

- 由字母(A-Za-z)、数字(0-9)、下划线(_)、美元符号( $ )组成，如：usrAge, num01, _name
- 严格区分大小写。
- 不能 以数字开头。
- 不能 是关键字、保留字。
- 变量名必须有意义。
- 遵守驼峰命名法。首字母小写，后面单词的首字母需要大写。myFirstName

- 数据类型
JavaScript 是一种弱类型或者说动态语言。这意味着不用提前声明变量的类型，在程序运行过程中，类型会被自动确定


## 函数

 ### 判断是否为NaN
isNaN();
* 隐式转换先会自动调用Number()
* 不是数值就会返回true

​    **任何数与NaN比较都为false**   !=   !==  为true

 ### length获取字符串长度

    var a = 'abcd efg';
        console.log(a.length);



###　typeof检测数据类型

   ```js
 var a = 123;
    console.log(typeof a);
   ```

### 转换为字符串

- 对象.toString()
  
- String()

- 隐式转换:利用+号拼接字符串
  

### 转换为数字型
- parseInt() ; 转换为整形

  **常用于将小数或者字符串转换为整形 ; 如果字符开头是非数字结果为NaN ;  其他类型返回NaN**

  <img src="images\parseInt.png" style="zoom: 33%;" />

- parseFloat(); 转换为浮点型

  ![](images\parseFloat.png)

- Number();  转换为数字型

### 执行字符串中的表达式

eval()

```js
console.log(eval('1+2'));//3
```



### 声明函数
function 函数名(){
    //函数体
}

`小结：`

-  函数可以带参数也可以不带参数
-  声明函数的时候，函数名括号里面的是形参，形参的默认值为 undefined
-  调用函数的时候，函数名括号里面的是实参
-  形参的个数可以和实参个数不匹配，但是结果不可预计，我们尽量要匹配
-  未赋值的形参undefined

#### arguments  重载

- 当不确定有多少个参数传递的时候，可以用 arguments 来获取。
- arguments展示形式是一个伪数组，因此可以进行遍历
- arguments实际上它是当前函数的一个内置对象。所有函数都内置了一个 arguments 对象，
- arguments 对象中存储了传递的所有实参
- 在箭头函数中禁止使用arguments    (可用Es6  ...   收集数组代替)
```
        function fn() {
            console.log(arguments);
        }
        fn(1, 2, 3, 4);
```

![image-20200512115109312](images\image-20200512115109312.png)

### 使用匿名函数创建函数-函数表达式

```js
var fun=function(){
    console.log(1);
}
fun();  //1
console.log(fun);
/*
ƒ () {
            console.log(1);
        }
*/
```

### 预解析

- 预解析：在当前作用域下, JS 代码执行之前，浏览器会默认把带有 var 和 function 声明的变量在内存中进行提前声明或者定义，预解析也叫做变量、函数提升。  

**变量提升**

```js
   function fn() {
            //var b
            console.log(b); //undefined
            var b = 2;
        }
        fn();
```

**函数提升**

`例子1`

***函数表达式这种是提升变量的声明***

* 必须先创建再调用

```html
 <script>
        fun();       
        var  fun  =   function()  {       
            console.log(10);      
        }
    </script>
    <!-- 结果：报错
    
        代码执行分析：
        
        var fun; 
         fun(); 
        fun = function() {
             console.log(10);
        }  
-->

```



`例子2`

***声明函数可以提升函数***

* 可以先调用后创建

```html
<script>
        function  fn() {        
            console.log(a);      //  function  a() { 1 };        
            var  a  =  "hello";        
            function  a() {
                1
            };        
            console.log(a);      //"hello"
            a  =  "world";      
            function  a() {
                2
            }      
            console.log(a)       //"world"
                    
        }
        fn();
    </script>

    <!--  function fn(){

            var a;
    
            function a(){1};
    
            function a(){2};
    
            console.log(a);     //f2
    
            a = "hello";
    
            console.log(a);     //"hello"
    
            a = "world";
    
            console.log(a)      //"world"
    
        }
    
        fn(); -->
```

### 立即执行函数

+ 不必为函数命名，避免了污染全局变量

+ 立即执行函数内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量

+ 封装变量

```js
(function(){
    
})()
```

https://www.jianshu.com/p/b10b6e93ddec      **看该页面的面试题**

###　回调函数

```js
   function run(fun) {
            fun();     //这里的fun()相当于fn();
            console.log(1);
        };

        function fn() {
            console.log(2);
        }
        run(fn); //2 1
```

## 全局变量 

如果直接赋值没加 var 那么当场全局变量; 

##  递归

```js
  function fn(n) {
            if (n === 1) {   //结束条件
                return 1;
            }
            return n + fn(n - 1);
        }
        console.log(fn(6));
```

![image-20200513104254012](images\image-20200513104254012.png)

## 对象
**利用对象字面量创建对象{}**

```js
 //创建对象
        var dog = {
            name: 'koko',
            type: 'alsj',
            age: 5,
            color: 'red',
            bark: function() {
                console.log('wang');
            },
            show: function() {    //创建方法
                console.log('show');
            }
        }

//调用
        console.log(dog.name);
        console.log(dog['name']); 

        console.log(dog.type);
        console.log(dog['type']);

        dog.bark();    //使用方法
        dog.show();
```

**添加,更改属性**

```js
  var shop = {
            uname: "笔记本",
            price: 65,
            color: 'red',
            pai: "华为"
        }
        shop.price = 1;
        shop.size = 12;
        console.log(shop);
```

**添加方法**

```js
shop.age=function{
    
}
```





**利用new object 创建对象**

```js
        var obj = new Object(); //创建一个空的对象
        obj.name = 'lei';
        obj.age = 18;
        obj.sayHi = function() {
            console.log('hi');           //创建方法
        }

        //调用
        console.log(obj.name);
        console.log(obj['age']);
        obj.sayHi();
```
**构造函数**

```js
function 构造函数名(){
    this.属性=值;
    this.方法=function(){
		方法体;
	}

}
```



`构造函数名首字母大写 `

```js
//构造函数
    function Fun(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;

        this.sing = function(song) { //方法
            console.log(song)
        }
    }
<!-- 调用 -->
    var arr = new Fun('lei', 99, 'lan') 
    console.log(arr.name);
    console.log(arr['sex']);
    arr.sing('实参');         //调用方法
```

### 检测属性是否存在

console.log(对象.属性名===undefined)  					  存在false   不存在true

console.log(对象.hasOwnProperty('属性名'))   			存在true   不存在false

console.log（‘属性名’ in 对象）； 								存在true   不存在false



### 删除属性

delete 对象名.属性名



**原始类型和应用类型数据储存**

* 原始类型数据直接存储在栈内存中
* 引用类型数据存储在堆内存中,自动生成一个地址存在栈内存中
* null可以用来销毁引用类型数据,如果引用类型数据不被任何地址指向则自动销毁

 **new关键字的作用**

  1. 在构造函数代码开始执行之前，创建一个空对象
  2. 修改this的指向，把this指向创建出来的空对象
  3. 执行函数的代码
  4. 在函数完成之后，返回this---即创建出来的对象

## 遍历对象
### for(变量 in 对象)

`for in循环`

```js
    var obj = {
        name: 'lei',
        age: 11,
        sex: '男'
    }
    for (var k in obj) {
        console.log(k); // 输出变量得到属性名
        console.log(obj[k]); //输出obj[k]得到属性值
    }
```
**这里[]里不加' '号, 加"号就成了属性名**


 ## 内置对象

### Math

 <!-- Math 不是一个构造器。Math 的所有属性与方法都是静态的。 -->
 Math.floor()          //向下取整
 Math.ceil()          //向上取整
 Math.round()          //四舍五入  -3.5结果-3
 Math.abs()            //绝对值
 Math.max()              //最大值
Math.random()           //输出一个[0,1)的随机数

<!-- 两个数之间的随机整数 -->

```js
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}
console.log(getRandom(1,10));
```
Math.random()给我们返回一个在0-1范围内的随机数。

但我们不想要一个随机的小数；我们想要一个任意随机数。我们可以通过我们的Math.random()的结果乘以任意数值区间得到它。举个例子，如果我们想要一个在0-10之间的随机数，我们需要乘以10，然后结果中的0.4会变成4。如果我们想要一个7-11的随机数，即(7,8,9,10,11)。

这个结果我们可以通过Math.random() * (max - min + 1)来得到它。

我们不仅仅想要一个小数，我们想要一个整数。Math.floor()用来砍掉小数后的数值，让3.14159变成了3。

这就是我们通过 `Math.floor(Math.random() * (max - min + 1))`.得到的。

现在我们得到了一个从0开始到我们定义的任意范围的数据。我们想要一个介于7-11的数值，但是现在只得到了0-5。为了把它变成7-10，我们只需要把任意我们得到的值加上7。7是我们的最小值。

然后就得到了 `Math.floor(Math.random() * (max - min + 1)) + min`

### 获取数组随机下标

```js
Math.floor(Math.random()*arr.length);
```





![math](images\math.png)







### Date 

```js
var date = new Date();
 console.log(date);

// 参数常用写法字 符串型 '2020-4-12 15:15'  数字型2020,4,12(月份+1)  0-11 12个月
var date = new Date('2020-4-12 15:15');
console.log(date);
```

`var date = new Date();`
// 获取当前年份
`var year = date.getFullYear();`
//获取当前月份
`var mon = date.getMonth() + 1;`
//获取当前日期
`var datas = date.getDate();`
//星期
`var day = date.getDay();`
var days = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];


console.log(year + '年' + mon + '月' + datas + '日' + '\t' + days[day]);

// 获取小时
`var hour = date.getHours();`
//获取分钟
`var min = date.getMinutes();`
//获取秒
`var sec = date.getSeconds();`
console.log(hour + '时' + min + '分' + sec + '秒');
<!-- 时间戳 -->
`var date = +new Date();`
<!-- html5 -->
`console.log(Date.now());`

#### 倒计时效果
        // 倒计时效果
        // 1.核心算法：输入的时间减去现在的时间就是剩余的时间，即倒计时 ，但是不能拿着时分秒相减，比如 05 分减去25分，结果会是负数的。
        // 2.用时间戳来做。用户输入时间总的毫秒数减去现在时间的总的毫秒数，得到的就是剩余时间的毫秒数。
        // 3.把剩余时间总的毫秒数转换为天、时、分、秒 （时间戳转换为时分秒）
        // 转换公式如下： 
        //  d = parseInt(总秒数/ 60/60 /24);    //  计算天数
        //  h = parseInt(总秒数/ 60/60 %24)   //   计算小时
        //  m = parseInt(总秒数 /60 %60 );     //   计算分数
        //  s = parseInt(总秒数%60);            //   计算当前秒数



```js
function countDown(time) {
    var nowTime = +new Date(); // 返回的是当前时间总的毫秒数
    var inputTime = +new Date(time); // 返回的是用户输入时间总的毫秒数
    var times = (inputTime - nowTime) / 1000; // times是剩余时间总的秒数 
    var d = parseInt(times / 60 / 60 / 24); // 天
    d = d < 10 ? '0' + d : d;
    var h = parseInt(times / 60 / 60 % 24); //时
    h = h < 10 ? '0' + h : h;
    var m = parseInt(times / 60 % 60); // 分
    m = m < 10 ? '0' + m : m;
    var s = parseInt(times % 60); // 当前的秒
    s = s < 10 ? '0' + s : s;
    return d + '天' + h + '时' + m + '分' + s + '秒';
}
console.log(countDown('2019-5-1 18:00:00'));
var date = new Date();
console.log(date);
```

##### 练习：声明变量保存一个员工的入职时间2020/6/15，假设合同期为3年，计算出合同的到期时间；打印出两个日期时间的本地字符串

```js
//入职时间
var d1=new Date('2020/6/14');
//到期时间：拷贝一份入职时间
var d2=new Date(d1);
//设置年份为当前年份基础之上加3
d2.setFullYear( d2.getFullYear()+3 );
//拷贝一份到期时间作为续签时间，提前一月续签，如果是周末提前到周五
var d3=new Date(d2);
d3.setMonth( d3.getMonth()-1 );
//判断是否为周末
var day=d3.getDay();
//console.log(day);
if(day===6){//提前1天
  d3.setDate( d3.getDate()-1 );
}else if(day===0){//提前2天
  d3.setDate( d3.getDate()-2 );
}
console.log( d1.toLocaleString() );
console.log( d2.toLocaleString() );
console.log( d3.toLocaleString() );

```





### 保留小数点后n位

toFixed();

```js
 var s = 1.12235645
        console.log(s.toFixed(2));//1.12
```



## 数组

### Array()

```js
var arr = new Array(1, 2, 3, 4, 5, 6)
```

```js
 
var arr = new Array();
        arr[0] = 'a'
        arr[1] = 'j'
        arr[2] = 'c'
        arr[3] = 'd'
        console.log(arr);
```
### join()转换字符串后字符分割

```js
var arr = [45, 56, 28, 26, 281, 20, 618, 251];
        document.write(arr.join('.'));//45.56.28.26.281.20.618.251
```



### Array.isArray()用于判断一个对象是否为数组，isArray() 是 HTML5 中提供的方法

```js
var arr = [1, 23];
var obj = {};
console.log(Array.isArray(arr));   // true
console.log(Array.isArray(obj));   // false
```

### concat(arr1,arr2)拼接数组

```js
        var array = [];
        var arr = [45, 56, 28, 26, 281, 20, 618, 251];
        var brr = [1];
        document.write(array.concat(arr, brr))
```



### slice()数组/字符串截取

**slice()**

```js
var arr = [1,2,3,4,5,6,7];
        console.log(arr,arr.slice(1, 3));//[)索引是半开半闭区间  原数组不会改变
// [1, 2, 3, 4, 5, 6, 7]    
// [2, 3]
```

也可以将伪数组转数组

```js
var str="1234";
console.log(Array.prototype.slice.call(str))
// ["1", "2", "3", "4"]
```

```js
function text(){ 
    console.log(Array.prototype.slice.call(arguments))
};

text(1,2,3,4)
// [1, 2, 3, 4]
```



### 添加数组元素的方法

push();  						 数组**尾部**添加元素

unshift()					    数组**头部**添加元素

*返回值为新数组长度*

```js
        // 添加数组元素
        var arr = [1, 2, 3];
        arr.push(4);      //数组尾部添加元素
        console.log(arr);


        arr.unshift(0);   //数组头部添加元素
        console.log(arr);
```
### 删除数组元素的方法

**删除数组中的元素**

```
数组名.splice(index,howmany,item1,.....,itemX)
```

![image-20200516104937459](images\image-20200516104937459.png)

```js
var arr = new Array(6)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"
arr[3] = "James"
arr[4] = "Adrew"
arr[5] = "Martin"

document.write(arr + "<br />")
arr.splice(2,0,"William")
document.write(arr + "<br />")

/*结果:
George,John,Thomas,James,Adrew,Martin
George,John,William,Thomas,James,Adrew,Martin*/


//当只有一个参数时 和 slice类似起到 截取的作用 但是会改变原数组
console.log(arr.splice(2))
//["Thomas", "James", "Adrew", "Martin"]
console.log(arr)
// ["George", "John"]

```



**返回值为删除的元素**

**pop();**

**shift() **	

```js
        // 删除数组元素
        var arr = ['m',1, 2, 'a'];
        arr.pop();                  //删除数组尾部元素
       // console.log(arr.pop());       输出尾部的元素 
        console.log(arr);

        arr.shift();                  //删除数组头部元素
        // console.log(arr.shift());    输出头部的元素 
        console.log(arr);

```

### 数组排序

#### 翻转数组

**reverse()**

```js
        var arr = [1, 2, 3];
        arr.reverse();  //翻转
        console.log(arr);
```
#### 冒泡

**sort()**

```js 
       // 冒泡
        var arr = [1, 2, 3, 9, 6, 4, 5];
        arr.sort(function(a, b) {
            return a - b; //升序    b-a降序
        });
        console.log(arr);
```

### 返回数组下标(索引)

**indexOf()**

**lastIndexOf()**

```js
  // 数组索引
        var arr = ['a', 'c', 'e', 'l'];
        console.log(arr.indexOf('e'));//2


```
### 数组转字符串

 ```js
 `toString()`
var arr = ['1', '2', '3'];
    console.log(arr.toString());//1,2,3
 ```

```js
`join(分隔符)`
var arr = ['1', '2', '3'];
console.log(arr.join('-'));  //1-2-3
```

## 数组扁平化

调用数组的toString方法，将数组变为字符串然后再用split分割还原为数组

```
function flatten(arr) {
    return arr.toString().split(',').map(function(item) {
        return Number(item);
    })
} 

```

```
function flatten(arr) {
    while(arr.some(item=>Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
```

```js
arr_flat = arr.flat(Infinity);
```

## 字符串

### 截取字符串

`substr();`

substr(起始位置,截取长度);

### 替换字符

`replace()`;

replac(被替换着字符,替换为的字符);

###　大小写转换

`toUpperCase();  转大写 `      
`toLowerCase();  转小写`

## 根据索引返回字符

`charAt(index)`

```js
        var str = 'andy';
        for (var i = 0; i < str.length; i++) {
            console.log(str.charAt(i));
        }
```
<!-- h5新增方法 -->
`str[index]`   


## 根据索引返回字符的ACSll码
`charCodeAt(index)`

## 字符串转数组
`split()`

 ```js
        var str = 'red,pink,blue';
        console.log(str.split(','));   //["red", "pink", "blue"]
 ```





