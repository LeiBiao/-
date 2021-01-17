## url

协议+主机名称+目录结构+资源名称   (不完整)

< scheme >://< user >: < pwd >@< host >:< port >/< path >;< params >?< query >#< flag >

>  scheme

 协议![](images\端口号.png)

>  < user >: < pwd >

用户名\密码            基本不用

>  host

主机名称

域名/ip

> port

端口号

> path

路径

> params 

参数

>  query 

查询字符串

> flag

锚点

## http

超文本传输协议

## web请求

把域名转为ip的过程叫做DNS解析

DNS服务器会是任意一台服务器

![](images\请求与相应.png)

## 报文

* 请求报文(request\):浏览器发给服务器的文件块
  * 请求起始行
    * 请求方法(http原生)
      * get 明文传参 ,上限2kb,查询字符串,向服务器要数据的时候用
      * post 隐式传参 给服务器传递数据的时候用
      * put 往服务器上放资源的时候用
      * delete 从服务器删除资源的时候
      * option 预请求
      
    * 请求方法(Restful API 接口)
      * get 做查询模块的时候使用,没有请求主体

      * post 做新增模块的时候使用 ,没有请求主体
      * put 做修改模块的时候使用,没有请求主体
      * delete 做删除模块的我时候使用,没有请求主体

    * http/1.1

    * 请求的url
  * 请求头信息
    * host：告诉服务器，要请求哪一台主机
    * connection：告诉服务器，请开启持久链接
    * user-agent：浏览器信息
    * accept-encoding：浏览器支持接收的压缩类型
    * accept-langguage：浏览器可以接收的自然语言的类型
    * regerer：告诉服务器，请求来自哪个页面
  * 请求主体 formdata
* 响应报文(response):服务器发给浏览器的文件块
  * 响应起始行
  
      1**：正在响应，还没有结束
  
     2**：成功的响应
  
     3**：响应的重定向，会执行跳转
  
     4**：客户端请求错误
  
     5**：服务器端错误
  
  * 响应头信息
  
    ![](images\相应头信息.png)
  
  * 响应主体
  
    发送给浏览器的代码或文件



## 缓存

1.减少冗余的数据传输,节省流量

2.节省服务器带宽

3.降低对的服务器的资源的消耗和运行要求

4.降低了由于远距离传输而造成的加载延迟



## http优化

###　链接性能优化

* 减少链接创建次数(开启持久链接)
* 减少请求次数(缓存)
* 提高服务器端的运行速度
* 减少响应数据的长度

### https

ssl:为数据通信提供安全保障支持

![](images\https.png)

## ajax

使用js的提供的异步对象,异步的向服务器发送请求

并接收响应回来的数据

过程:              创建异步对象 > 创建请求>  发送请求 >  接收响应  (0  1 不显示)

注:将接收响应写在发送请求之前可以把4次响应全部显示   ( 0 1 2 3 4)

```html
 // 创建异步对象
      var xhr = new XMLHttpRequest();
      
// 接收响应,创建监听器
        xhr.onreadystatechange = function() {
        	if (xhr.readyState == 4 && xhr.status == 200) {
        		// 接收数据
        		var r = xhr.responseText;
        		console.log(r);
        	}
        }
      
   // 创建请求,打开链接
   //请求方法\请求接口url\是否异步
   	  xhr.open("GET", "http://127.0.0.1:8080/ajax/first", true)
   //发送请求
      xhr.send();
```

![](images\ajax_send.png)

![](images\ajax接收.png)



###　[ajax项目实例](E:\大学\web\练习\笔记.md\例子文件夹\xz_ajax)

![](images\ajax项目.png)

### 原生http的get带参方法

```js
r.get("/http_get", (res, req) => {
    // 接收网页url输入的数据
    var _uname = res.query.uname;
    var _upwd = res.query.upwd;
    var sql = "select * from xz_user where uname=? and upwd=?";
    pool.query(sql, [_uname, _upwd], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            req.send("1");
        } else {
            req.send("0");
        }
    })

})
```

### restful规则接口

| get查询                 | post新增         | put修改         | delete删除              |
| ----------------------- | ---------------- | --------------- | ----------------------- |
| 没有请求主体            | 有请求主体       | 有请求主体      | 没有请求主体            |
| req.params.uname;       | req.body.uname   | req.body.uname  | req.params.uname;       |
| /res_login/:uname&:upwd | /ajax/post_login | /ajax/put_login | /res_login/:uname&:upwd |



get

```js
r.get("/res_login/:uname&:upwd", (req, res) => {
    var _uname = req.params.uname;
    var _upwd = req.params.upwd;
    var sql = "select * from xz_user where uname=? and upwd=?";
    pool.query(sql, [_uname, _upwd], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    })
})
```

```html

<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <input type="text" id="uname"><br>
    <input type="text" id="upwd"><br>
    <button>ajax</button>
    <div></div>
    <script>
        var btn = document.querySelector("button");
        var d1 = document.querySelector("div");
        btn.onclick = function() {
            var _uname = uname.value;
            var _upwd = upwd.value;
            //判断非空
            if (!_uname) {
                alert("请输入用户名");
                return;
            }
            if (!_upwd) {
                alert("请输入密码");
                return;
            }

            // 创建异步对象
            var xhr = new XMLHttpRequest();
            //创建监听,接收响应
            xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200)
                        var r = xhr.responseText;
                    r == 1 ? d1.innerHTML = "成功" : d1.innerHTML = "失败";
                }
                // 创建请求 
            xhr.open("get", `/ajax/res_login/${_uname}&${_upwd}`, true);
            // 发送请求
            xhr.send();
        }
    </script>
</body>

</html>
```

delete

```js
  // 修改
r.delete("/res_get_del/:uid", (req, res) => {
    var _uid = req.params.uid;
    res.send(_uid);
    var sql = "delete from xz_user where uid=?";
    pool.query(sql, [_uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    })
})
```

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <input type="text" name="" id="uid">
    <button>del</button>
    <div></div>
    <script>
        var btn = document.querySelector("button");
        var d1 = document.querySelector("div");
        btn.onclick = function() {
            var _uid = uid.value;
            if (!_uid) {
                alert("请输入要删除的id");
                return;
            }
            // 创建异步对象
            var xhr = new XMLHttpRequest();
            //创建监听,接收响应
            xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var r = xhr.responseText;
                        if (r == 1) {
                            d1.innerHTML = "成功";
                        } else {
                            d1.innerHTML = "失败";
                        }
                    }

                }
                // 创建请求
            xhr.open("delete", `/ajax/res_get_del/${_uid}`, true);
            // 发送请求
            xhr.send();
        }
    </script>
</body>

</html>
```

post

```js
  // restful-post方法
r.post("/post_login", (req, res) => {
    var _uname = req.body.uname;
    var _upwd = req.body.upwd;
    console.log(_uname, _upwd);
    var sql = "select * from xz_user where uname=? and upwd=?";
    pool.query(sql, [_uname, _upwd], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send("1");
        } else {
            res.send('0');
        }
    })
})
```

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        function login() {
            var _uname = uname.value;
            var _upwd = upwd.value;
            //判断非空
            if (!_uname) {
                alert("请输入用户名");
                return;
            }
            if (!_upwd) {
                alert("请输入密码");
                return;
            }
            // 创建异步对象
            var xhr = new XMLHttpRequest();
            //创建监听,接收响应
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200)
                    var r = xhr.responseText;
                r == 1 ? d1.innerHTML = "成功" : d1.innerHTML = "失败";
            }
            xhr.open("post", "/ajax/post_login", true)
                //发送请求
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var formdata = `uname=${_uname}&upwd=${_upwd}`;
            xhr.send(formdata);
        }
    </script>
</head>

<body>
    <input type="text" name="" id="uname">
    <input type="text" name="" id="upwd">
    <button onclick="login()">登陆</button>
    <div id="d1"></div>
</body>

</html>
```



url验证:

```js
http://127.0.0.1:8080/ajax/res_login/leilei&123123
```

> 后台数据在传输时自动转换成string
>
> xhr.responseText保存的值是一个string
>
> 以js对象的格式,显示出来的字符串是json串
>
> 吧json转换成obj,称为json解析