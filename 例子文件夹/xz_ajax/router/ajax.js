const express = require('express');
const pool = require('../pool.js');
const r = express.Router();
r.get("/http_get", (req, res) => {
    var _uname = req.query.uname;
    var _upwd = req.query.upwd;
    var sql = "select * from xz_user where uname=? and upwd=?";
    pool.query(sql, [_uname, _upwd], (err, result) => {
        if (err) throw err;
        if (result.length > 0)
            res.send("1");
        else
            res.send("0");
    })
})
module.exports = r;