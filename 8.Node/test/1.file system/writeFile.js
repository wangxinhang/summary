var fs = require("fs")

fs.writeFile("./data/test1.txt", {
    flag: "a",
    encoding: "utf-8"
}, function (
    error, data
) {
    console.log(error)
})

//同步写法
function fsWrite(path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, {
            flag: "a",
            encoding: "utf-8"
        }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

async function ddd() {
    await fsWrite("./data/test2.txt", "写入第一句/n");
    await fsWrite("./data/test2.txt", "hello world!/n");
}
ddd()