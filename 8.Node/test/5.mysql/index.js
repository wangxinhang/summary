const mysql = require("mysql")

const option = {
    host: "localhost",
    // port:"3306"
    user: "root",
    password: "hang20460728",
    database: "test"
}

const con = mysql.createConnection(option);

con.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("数据库连接成功！")
    }
})

//执行查询语句
let strSql = "select * from user"
con.query(strSql, (err, results, fields) => {
    if (err) {
        console.log(err)
    } else {
        console.log(results)
        console.log(fields)
    }
})