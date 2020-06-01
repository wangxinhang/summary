const mysql = require("mysql")
module.exports = {
    //数据库配置
    config: {
        host: "localhost",
        port: "3306",
        user: "root",
        password: "hang20460728",
        database: "test"
    },
    //采用mysql连接池连接的方式
    //连接池对象
    sqlConnect: function (sql, sqlArr, callBack) {
        let pool = mysql.createPool(this.config);
        pool.getConnection((err, conn) => {
            if (err) {
                console.log(err)
                return
            }
            //事件驱动回调
            conn.query(sql, sqlArr, callBack);
            //释放连接
            conn.release()
        })
    }
}