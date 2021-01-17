const express = require("express");
const ajax = require('./router/ajax.js');
const app = express();
app.listen(8080);
app.use(express.static('./public'));
app.use('/ajax', ajax);