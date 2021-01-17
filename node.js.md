## nodejs的运行方式

脚本模式 :  node 路径

交互模式:    node       (两次ctrl+c退出交模式)

## nodejs作用

web服务器后台

命令行工具 



##　全局对象

### global

**交互模式**下使用:   `global.a`     `global.fn()`  变量和函数都是全局global下的    类似js的window对象

**脚本文件**中所处在一个模块作用域下,里面的变量和函数都是局部的

### console

```nodejs
    	console.log(1); //打印输出
        console.info(2); //输出消息    console.info() 函数是 console.log() 的别名
        console.warn(3); //输出警告
        console.error(3); //输出错误
        
        console.time(' ')  开始计时
 		console.timeEnd(' ')  结束计时
```

```js

```





### process

process.arch  查看当前cpu的架构

process.platform  查看当前的操作系统

process.version 查看当前的nodejs版本号

process.pid 查看当前进程的编号

process.kill() 结束指定编号的进程

###　buffer缓冲器

Buffer.alloc(size[, fill[, encoding]])

- size {Number}
- fill {Value} 默认：undefined
- encoding {String} 默认：utf8



```js
const buf = Buffer.alloc(5);

console.log(buf);
// 打印: <Buffer 00 00 00 00 00> 
```

##  定时器

window 对象给我们提供了 2 个非常好用的方法-定时器。

- setTimeout() 

- setInterval()  

#### setTimeout() 炸弹定时器    (单次)

#### setInterval() 闹钟定时器   (重复)

> window.setTimeout(调用函数,延时时间)
> window可以省略
> 单位ms

```js
/*time1和*time2的时间同时记时*/
        //写法1:
        var time1 = setTimeout(function() {
                console.log('时间到');
            }, 2000) //延时2s

        //写法2:
        function fun() {
            console.log('写法2');
        }
        var time2 = setTimeout(fun, 3000); //延时3s
```

###　setImmediate()立即执行定时器

* 先执行主函数,再执行事件队列里面的定时器

  * clearsetImmediate()	清除定时器

  #### process.nextTick()  

  排到事件队列最前面

```js
console.log(2);

setImmediate(() => {
    console.log(1);
});
process.nextTick(() => {
    console.log(4);

})
console.log(3);

/*
2341
*/
```



## 模块

* require('路径') 用于引入一个模块，得到的是导出的对象

  - |          | 以路径开头                                                   | 不以路径开                                                   |
    | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
    | 文件模块 | require('./circle.js')  用于引入自定义模块                   | require('querystring')用于引入官方提供的核心模块             |
    | 目录模块 | require(./02_ran)   首先会到目录下寻找package.json文件中main对应的文件，如果找不到会寻找index.js | require('04_ran') 会到当前目录下的node_modules目录中寻找该目录，如果找不到会一直往上一级目录的node_modules中寻找；用于引入第三方模块 |

    

* module 当前模块的对象

* module.exports 导出的对象，默认是一个空对象，如果要导出内容，只需要把内容添加到对象中

  * 即可以用exports导出,也可以用module.exports 导出的对象本质是一样的 

    - exports只能通过使用 . 的方式来向外暴露内部变量

      ```js
      exports.xxx=xxx
      ```

      

    -  module.exports 即可以通过用 . 的方式,也可以直接赋值

      ```js
      moudule.expors.xxx=xxxx
      
      或
      
      module.expors={
      
      xxx:xxx,
      
      xxx:xxx
      
      }
      ```

      

* __filename 当前模块的绝对路径和模块名称(当前文件的路径)

* __dirname 当前模块的绝对路径(当前文件夹路径)

```js
//circle.js
//周长
function getLength(r) {
    return 2 * Math.PI * r;
}
//面积
function getArea(r) {
    return Math.PI * Math.pow(r, 2);
}

//把这两个函数添加到导出对象中
let obj = {
    getLength: getLength,
    getArea: getArea
};
module.exports = obj;
```

```js
//main.js
//引入circle.js
let circle = require('./circle.js');
//调用
console.log(circle);
//调用对象的方法
console.log(circle.getLength(5).toFixed(2));
console.log(circle.getArea(5).toFixed(2));
```

# querystring（查询字符串）

`querystring` 模块提供用于解析和格式化 URL 查询字符串的实用工具。 它可以使用以下方式访问：

> 使用查询字符串模块下的方法，将查询字符串解析为对象

`querystring.parse()`

```js
const querystring = require('querystring');
```

```js
//引入核心模块querystring
const querystring = require('querystring');
//声明变量保存一组查询字符串
let str = 'keyword = thinkpad & enc = utf - 8 & pvid = 20';
//获取传递的数据dell和4999
//使用查询字符串模块下的方法，将查询字符串解析为对象
let obj = querystring.parse(str);
console.log(obj);
console.log(obj.kw, obj.price);
```

### url

http://codeboy.com:9999/products_detail.html?lid=1
协议 域名(IP地址) 端口 文件在服务器的路径 查询字符串

使用遗留的 API 解析 URL 字符串：

```js
//练习：解析以下URL,获取URL中查询字符串部分
//https://www.tmooc.cn:443/web.html?cid=2006&cname=nodejs
//提示：解析URL

const url = require('url');
const querystring = require('querystring');
let str1 = 'https://www.tmooc.cn:443/web.html?cid=2006&cname=nodejs';
let obj1 = url.parse(str1);
console.log(obj1.query);
let obj2 = querystring.parse(obj1.query);
console.log(obj2);

```

## 同步/异步

同步:会阻止后续代码的执行,获取结果是通过返回值

异步:不会阻止后续代码的执行,获取结果是通过回调函数



## 文件系统模块

### 查看文件状态

### 同步方法

fs.statSync(路径)     `查看文件状态`(同步方法)

isFile()判断是否为文件

isDirectory() 判断是否为目录



```js
const fs = require('fs');
// 查看文件状态
let result = fs.statSync('./text.js');
console.log(result);
// 判断是否为文件
console.log(result.isFile());
// 判断是否为目录
console.log(result.isDirectory());
console.log("程序结束");
```

![](images\statSync.png)

### 异步方法

fs.stat(路径,回调函数)  `查看文件状态`(异步方法)

- 回调函数 :

  err 可能产生的错误

  rusult 参看结果

  - isFile()判断是否为文件
  - isDirectory() 判断是否为目录

```js
const fs = require('fs');
fs.stat('./text.js', (err, result) => {
    if (err) {
        throw err;
    }
    console.log(result);
});

console.log("程序结束");
```



![](images\stat.png)



##  创建目录

### 异步方法

```js
const fs = require("fs");

// 创建目录 异步
fs.mkdir('./mydir', (err) => {
    if (err) {
        throw err;
    }
    console.log('目录创建成功');
});
console.log('执行结束');
```



### 同步方法

```js
const fs = require("fs");

// 同步
 fs.mkdirSync('./mydir1');
```



## 移除目录

**只能删除空文件夹**

###　异步

```js
const fs = require("fs");
// 移除目录
fs.rmdir('./mydir1', (err) => {
    if (err) throw err;
})
```

### 同步

```js
fs.rmdirSync('./mydir');
```

## 文件

由于该方法属于fs模块，使用前需要引入fs模块（var fs= require(“fs”)

### 写入文件

```js

//覆盖写入
//1.文件不存在,会先创建再在写入
//2.若存在,会覆盖文件再写入
fs.writeFile(filename, 文件内容, [callback(err,data)])

//追加写入
//同步
const fs = require('fs');
fs.appendFile('./读写文件.txt', '写入的数据2', (err) => {
    if (err) throw err;
})
//异步
fs.appendFileSync('./读写文件.html', '写入的数据3');
```

 ）

### 读取文件

```js
fs.readFile(filename, [encoding], [callback(err,data)])

```

```js
//异步
fs.readFile('./data.txt', (err, data) => {
    if (err) throw err;
    //读取的格式为buffer格式,所以要String
    console.log(String(data));
})
```



**接收参数**:

* filename  文件路径
* options   option对象，包含 encoding，编码格式，该项是可选的。
* callback   回调，传递2个参数 异常err 和 文件内容 data



## 删除文件

```js
//异步
fs.unlink('./data.txt', (err) => {
    if (err) throw err;
})

//同步
fs.unlinkSync('./data.txt');
```

## 拷贝文件

**异步**

```js
fs.copyFile('要复制的文件','目标地址及文件名',回调函数)
```

```js
fs.copyFile('./data.txt', './copydata.txt', (err) => {
    if (err) throw err;
})
```

**同步**

```js
fs.copyFileSync('要复制的文件','目标地址及文件名');
```

## 检测文件是否存在  

```js
fs.existsSync('路径');
```

```js
var a = fs.existsSync('./copydata.txt');
if (a) {
    console.log('文件存在');
} else {
    console.log('文件不存在');
}
```

## 流

**流**是为了解决大文件的操作，如果一次性读取占用的内存空间很大；如果使用流只需要很小空间就可以读取大文件，形式是分段的，每次读取一段。

### 创建一个可读取的流对象

```js
const fs = require('fs');
let i = 0;
//创建一个可读取的流对象
let rs = fs.createReadStream('./copydata.txt');
//获取流入到内存的数据
//事件:一旦有数据流入,获取该段数据
rs.on('data', (chunk) => {
        //chunk 流入的分段数据
        console.log(chunk);
        i++;
    })
    //事件:一旦读取结束,就会执行回调函数
rs.on('end', () => {
    console.log(i);
})
```

> on用于添加事件 
>
> > data是一个事件名称:数据流入事件;(固定用法)
> >
> > end 结束的事件名称(固定用法)

### 通过流拷贝文件

```js

// 创建读取的流
let rs = fs.createReadStream('./1.zip');
// 创建写入的流
let ws = fs.createWriteStream('./2.zip');
// 把读取的流通过管道添加到写入流
rs.pipe(ws);
```

## http协议

客户端浏览器和web服务器之间的通信协议

> 通用头信息

 Request URL: 请求的URL,浏览器端请求的内容

 Request Method: 请求的方法  get获取，得到 post传递，发送

 StatusCode: 响应的状态码

 1**：正在响应，还没有结束

2**：成功的响应

3**：响应的重定向，会执行跳转

4**：客户端请求错误

5**：服务器端错误

> 响应(response)头信息

  Content-Type: 响应内容类型   响应html-> text/html

  Location: 跳转的URL

> 请求(request)头信息

> 请求主体

  用于向服务器传递数据

### http模块

> 创建web服务器 

```js
//引入http模块
const http = require('http');
//创建web服务器
const app = http.createServer();
//设置端口
app.listen(8080);
//事件：一旦有请求，自动执行回调函数
//request 请求的事件名称，固定用法
app.on('request', (req, res) => {
    //req 请求的对象
    //res 响应的对象
    //设置响应的状态码
     res.writeHead(404);
    //设置响应的状态码跳转
    res.writeHead(302, {
            Location: 'https://www.baidu.com/'	
        })
        //设置响应到浏览器中的内容
     res.write('这是jianbing');
    //结束并发送响应
    res.end();
})
```

> 请求自己电脑服务器
> ip
> http://127.0.0.1:8080
> 域名
> http://localhost:8080
> //服务器端根据浏览器端的请求作出响应



练习：创建web服务器，设置端口，接收浏览器请求，根据请求的URL作出响应

  /list   响应  ‘this is product list’

  /index  响应  ‘<h2>这是首页</h2>’

  /    响应文件1.html (先同步读取文件，把读取到的文件作为响应的内容)

  /study  跳转  http://www.tmooc.cn

  其它   响应状态码404  内容 not found



```js
const http = require('http');
const fs = require('fs');
const { fstat } = require('fs');
const app = http.createServer();
app.listen(8080);
app.on('request', (req, res) => {
    if (req.url === '/list') {
        res.write('tihs is prouuce list')
    } else if (req.url === '/index') {
        // 设置响应的内容类型
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        });
        res.write('这是首页');
    } else if (req.url === '/') {
        let data = fs.readFileSync('./1.html');
        // 将buffer隐式转换为字符串
        res.write(data);
    } else if (req.url === '/study') {
        res.writeHead(302, {
            Location: 'http://www.tmooc.cn'
        });
    } else {
        res.writeHead(404);
        res.write('not found');
    }
    res.end();
})
```



##  定时器

window 对象给我们提供了 2 个非常好用的方法-定时器。

- setTimeout() 

- setInterval()  

#### setTimeout() 炸弹定时器    (单次)

#### setInterval() 闹钟定时器   (重复)

> window.setTimeout(调用函数,延时时间)
> window可以省略
> 单位ms

```js
/*time1和*time2的时间同时记时*/
        //写法1:
        var time1 = setTimeout(function() {
                console.log('时间到');
            }, 2000) //延时2s

        //写法2:
        function fun() {
            console.log('写法2');
        }
        var time2 = setTimeout(fun, 3000); //延时3s
```

###　setImmediate()立即执行定时器

* 先执行主函数,再执行事件队列里面的定时器

  * clearsetImmediate()	清除定时器

  #### process.nextTick()  

  排到事件队列最前面

```js
console.log(2);

setImmediate(() => {
    console.log(1);
});
process.nextTick(() => {
    console.log(4);

})
console.log(3);

/*
2341
*/
```

## express 模块

第三方的模块（包）

 基于Node.js平台，快速、开放、极简的WEB开发框架

 www.expressjs.com.cn

 下载安装  npm install express

### 创建web服务器

```js
  // 引入express模块
const express = require('express');
// 创建web服务器
const app = express();
// 设置端口
app.listen(8080);
```

> res.send() 设置响应的内容并发送
>
> res.sendFile() 设置响应的文件并发送，文件需要使用绝对路径 __dirname
>
> res.redirect()  设置响应的重定向(跳转)

### 路由

 用来接受请求，以及做出响应

可以处理特定的请求，包括**请求的方法、请求的URL、回调函数**。

当浏览器发出的请求匹配请求的方法和请求的URL就会自动触发该路由，执行回调函数。

```js
// 引入express模块
const express = require('express');
// 创建web服务器
const app = express();
// 设置端口
app.listen(8080);

//路由
app.get('/login', (req, res) => {
    // 设置响应请求的内容并发送
    res.send('这是登陆页面');
})
```



### 跳转

 res.redirect(地址');

```js
const express = require('express');
const app = express();
app.listen(8080);
// 跳转
app.get('/login', (req, res) => {
    res.redirect('https://www.baidu.com/');
})
```



### 响应文件

```js
const express = require('express');
const app = express();
app.listen(8080);
//响应文件
app.get('/file', (req, res) => {
    res.sendFile(__dirname + '/1.html');
});
```

​	

##### 路由例子

添加获取登录网页的路由（请求方法:get，请求URL: /login），响应login.html，点击提交，再次发送请求（请求方法:post，请求URL:/mylogin），响应’登录成功’

```JS
const express = require('express');
//引入查询字符串模块
const querystring = require('querystring');
const app = express();
app.listen(8080);

//请求搜索的页面

//路由：请求方法 get  请求URL /search
app.get('/search', (req, res) => {
    res.sendFile(__dirname + '/search.html');
});

//请求方法 get  请求URL  /mysearch
app.get('/mysearch', (req, res) => {
    //获取查询字符串传递的数据
    console.log(req.query);
    console.log(req.query.keyword);
    res.send('搜索成功');
});



//响应登录的网页
//请求方法:get  请求URL: /login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});
//根据表单提交来创解决对应的路由
//请求方法:post  请求URL: /mylogin
app.post('/mylogin', (req, res) => {
    //获取post请求的数据，传递的方式通过流
    //流:使用事件的方式获取，一旦有数据流入，通过回调函数获取
    req.on('data', (chunk) => {
        let str = String(chunk);
        let obj = querystring.parse(str);
        console.log(obj);
    });
    res.send('登录成功');
});

//练习：创建查看包的使用说明的路由
//请求的方法:get  请求的URL: /package  响应'这是包的详情介绍'

//路由传参
app.get('/package/:pname', (req, res) => {
    //获取路由参数的数据
    console.log(req.params);
    res.send('这是包的详情' + req.params.pname);
});


//练习：添加购物车的路由（请求方法：get 请求URL：/shopping），使用路由传参传递商品的编号lid和数量num，在路由中获取数据，响应‘添加成功’
app.get('/shopping/:lid/:num', (req, res) => {
    console.log(req.params);
    res.send('添加成功');
});
```

```search.html
<h2>产品搜索</h2>
<!--
 form 表单标签，用于提交（发送请求）
   method  设置请求的方法
   action  设置请求的URL
  name 设置名称，用于保存用户输入的值
-->
<form method="get" action="/mysearch">
  <input type="text" name="keyword">
  <input type="submit">
</form>
```

```login.html
<h2>用户登录</h2>
<form method="post" action="/mylogin">
  用户<input type="text" name="uname"><br>
  密码<input type="text" name="upwd"><br>
  <input type="submit">
</form>
```

### 路由器

不同模块下的URL可能会出现相同

所有的路由都是在服务器下，无法进行团队的模块化开发

 为了解决以上两个问题，把同一个模块下的路由放到一起，最后把路由器挂载到服务器下

| const r=express.Router(); //创建路由器                       |
| ------------------------------------------------------------ |
| app.use(  添加的前缀, 引入的路由器 )   **//web服务器 引入路由器并挂载** |

```js
//app.js
const express=require('express');
const ru=require('./user.js');
//创建web服务器
const app=express();
//设置端口
app.listen(8080);
//把引入的路由器挂载到服务器，路由器中的路由就会成为服务器的一部分
//挂载的同时，可以给所有URL添加统一的前缀
//参数1：添加的前缀
//参数2：引入的路由器
//访问形式  /user/list
app.use('/user',ru);
```

```js
//user.js
const express=require('express');
//使用express创建路由器对象
const r=express.Router();
r.get('/list',(req,res)=>{
  res.send('这是用户列表');
});
module.exports=r;
```

### 中间件

浏览器想web服务器发送请求,中间件可以拦截到对路由的请求,也可以做出相应

中间件分为应用及中间件、路由级中间件、内置中间件、第三方中间件、错误处理中间件

 #### 应用级中间件

 当拦截 到请求后，自动执行回调函数； 

 ```js
 app.use(  URL, (req,res,next)=>{ 
     
     next()   //是一个函数，表示往后执行其它的路由或者中间件  }  )  
 ```

```js
const express = require('express');
const app = express();
app.listen(8080);

// 中间件拦截URl
// use(要拦截的URL,回调,往后执行其他的中间件或路由)
app.use('/list', (req, res, next) => {
    if (req.query.uname !== 'root') {
        res.send('请输入管理员账户')
    } else {
        //执行app.get路由
        next();
    }
})

app.get('/list', (req, res) => {
    res.send('user')
})
```

**练习：创建购物车路由(get /shopping)，假设要传递商品的价格shopping，响应‘商品价格：xxx元’；添加打折的中间件，将所有商品的价格打8折。中间件不需要响应，只是打折**

```js
const express = require('express');
const app = express();
app.listen(8080);


app.use('/shopping', (req, res, next) => {
    //获取到价格，然后打折
    console.log(req.query);
    req.query.price *= 0.8; //隐式转为了数值
    next();
});

app.get('/shopping', (req, res) => {
    res.send(`商品的价格:${req.query.price}元`);
})
```

#### 路由级中间件

 路由器的使用

 #### 内置中间件

 只有一个中间件：**托管静态资源**

 如果浏览器端请求静态资源(html，css，js，图像...)，不需要使用路由响应文件，而是让它自动到指定目录去找。

```js
 app.use( express.static('目录路径') )

```

```js
const express = require('express');
const app = express();
app.listen(8080);
//托管静态资源到public目录
app.use(express.static('./public'));

app.post('/mylogin', (req, res) => {
    //获取post请求的数据

    req.on('data', (chunk) => {
         console.log(chunk);       //buffer
        let str = String(chunk); //转为字符串
        console.log(str);          

    });

    res.send('登录成功');
});
```

![](images\流123.png)

```js
const express = require('express');
const querystring = require('querystring');
const app = express();
app.listen(8080);
//托管静态资源到public目录
app.use(express.static('./public'));

app.post('/mylogin', (req, res) => {
    //获取post请求的数据

    req.on('data', (chunk) => {
        let str = String(chunk);
        let obj = querystring.parse(str);  //转为对象
        console.log(obj);
    });

    res.send('登录成功');
});
```

![](images\流对象.png)

 #### 第三方中间件

```js
const express = require('express');
// 引入第三方中间件
const bodyParser = require('body-parser');
const app = express();
app.listen(8080);
// urlencoded将post请求的数据解析为对象
app.use(bodyParser.urlencoded({
    extended: false
}));


app.post('/mylogin', (req, res) => {
    console.log(req.body);
})
```

![](images\流对象.png)





## mysql模块

### 连接数据库

**普通链接 mysql.createConnection**

```js
const mysql = require('mysql');
// 创建连接对象
const c = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'tedu' //use tedu
});
c.connect();//测试连接
c.query('select * from emp', (err, result) => {
    if (err) throw err;
    console.log(result);
})
```

****

**createPool链接**

```js
const mysql = require('mysql');
//  创建连接池对象
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'tedu', //use tedu
    connectionLimit: '20' //设置连接池大小
});

pool.query('select * from emp', (err, result) => {
    if (err) throw err;
    console.log(result);
})
```

**防止SQL注入：使用占位符(?)，将所有SQL语句中的值进行过滤，过滤后会替换占位符。**

```js
pool.query('select * from emp where eid=?', ['2 or 1=1'], (err, result) => {
    if (err) throw err;
    console.log(result);
})
```

//练习：往数据表emp中插入一条数据，所有的值都要进行过滤 

```js
pool.query('INSERT INTO emp VALUES(?,?,?,?,?,?)', [null, '然哥', 0, '1977-5-29', 33000, 20], (err, result) => {
    if (err) throw err;
    console.log(result);
});
```



**将对象形式的数据插入到数据表中**

```js
let obj = {
    eid: null,
    ename: 'lei',
    salary: 1234,
    deptId: 20,
    sex: 0,
    birthday: '1998-11-26'
}
pool.query('insert emp set ?', [obj], (err, result) => {
    if (err) throw err;
    console.log(result);
})
```

### [xz原生路由项目](例子文件夹\xznode原生)

