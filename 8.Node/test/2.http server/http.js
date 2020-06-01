var http = require("http")

var server = http.createServer()
// 注册一个request请求事件
server.on("request", function (request, response) {
    // request对象
    console.log("收到客户端请求了" + request.url)
    //respnse
    response.write("hello")
    response.end()
})
server.listen(3000, function () {
    console.log("服务已启动")
})