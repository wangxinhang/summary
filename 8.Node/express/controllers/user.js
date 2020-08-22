var dbconf = require("../util/dbconf")
//获取用户列表
getUserList = (req, res) => {
    let sql = `select * from user`
    let sqlArr = []
    let callBack = (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                list: data
            })
        }
    }
    dbconf.sqlConnect(sql, sqlArr, callBack)
}
//获取用户详情
getUserById = (req, res) => {
    let {
        id
    } = req.query
    let sql = `select * from user where id = ?`
    let sqlArr = [id]
    let callBack = (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    }
    dbconf.sqlConnect(sql, sqlArr, callBack)
}
module.exports = {
    getUserList,
    getUserById
};