// 创建路由器
const express = require('express');
const r = express.Router();
const pool = require('../pool.js');
// console.log(pool);测试pool是否被引入
// 用户注册
r.post('/reg', (req, res) => {
        // 获取post请求的数据
        let obj = req.body;
        console.log(obj);
        if (!obj.uname) {
            // 为空时
            res.send({ code: 401, msg: 'uname required' })
                // 阻止往后执行
            return;
        }
        if (!obj.upwd) {
            res.send({ code: 402, msg: 'upwd required' });
            return;
        }
        if (!obj.email) {
            res.send({ code: 403, msg: 'email required' });
            return;
        }
        if (!obj.phone) {
            res.send({ code: 404, msg: 'phone required' });
            return;
        }
        pool.query('insert into xz_user set ?', [obj], (err, result) => {
            if (err) throw err;
            console.log(result);
        })
        res.send({ code: 200, msg: 'reg suc' });
    })
    // 导出路由器对象

//用户登录

r.post('/login', (req, res) => {
    let obj = req.body;
    console.log(obj); //验证是否获取到数据

    // 判断数据是否为空
    if (!obj.uname) {
        res.send("code:401,msg:uname required");
        return;
    }

    if (!obj.upwd) {
        res.send("code:402,msg:upwd required");
        return;
    }

    // 查询是否用户名密码同时匹配
    pool.query('select * from xz_user where uname=? and upwd=?', [obj.uname, obj.upwd], (err, result) => {
        if (err) throw err;
        console.log(result);
        // 如果数据库没有该数据则为空对象
        if (result.length === 0) {
            res.send({ code: 301, msg: 'login err' })
        } else {
            res.send({ code: 200, msg: 'login suc' })
        }

    })
})


//修改用户
// get请求不能使用第三方中间件
r.get('/update', (req, res) => {
    let obj = req.query;
    console.log(obj);
    let i = 400;
    for (var k in obj) {
        i++;
        if (!obj[k]) {
            res.send({ code: i, msg: k + ' required' })
            return;
        }
    }
    pool.query('update xz_user set ? where uid=?', [obj, obj.uid], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.affectedRows === 0) { //影响大于一行说明操作成功
            res.send({ code: 301, msg: 'update err' });
        } else {
            res.send({ code: 200, msg: 'update suc' });
        }
    })
})


// 用户列表
r.get('/list', (req, res) => {
    let obj = req.query;
    console.log(obj);
    //4.2验证是否为空
    //如果页码为空，或者小于1，则页码为1
    if (!obj.pno || obj.pno < 1) {
        obj.pno = 1;
    }
    //如果每页大小为空，或者小于1，则大小为2
    if (!obj.count || obj.count < 1) {
        obj.count = 2;
    }
    console.log(obj);
    //将每页大小和当前页码转为整型
    let c = parseInt(obj.count); //每页大小
    let p = parseInt(obj.pno); //当前页码
    //计算开始查询的值
    let start = (p - 1) * c;
    //执行SQL命令
    pool.query('SELECT * FROM xz_user LIMIT ?,?', [start, c], (err, result) => {
        if (err) throw err;
        console.log(result);
        //查询到的是数组，把数组响应给浏览器端
        res.send(result);
    });
});


module.exports = r;