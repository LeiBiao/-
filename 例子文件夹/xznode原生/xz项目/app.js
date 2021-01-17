const experss = require('express');
const ru = require('./routes/user.js');
// console.log(routes); 测试是否引入路由
// 引入body-Parser
const bodyParser = require('body-parser');

const app = experss();
app.listen(8080);

// 托管静态资源
app.use(experss.static('./public'));
// 在路由器之前,应用bodyParser,讲post请求的数据解析成对象
app.use(bodyParser.urlencoded({
    extended: false
}));



// 路由挂载到web   前缀
app.use('/user', ru);