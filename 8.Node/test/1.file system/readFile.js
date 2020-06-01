var fs = require("fs")

fs.readFile("./data/hello.txt", function (
    error, data
) {
    console.log(data.toString())
})

//同步写法
function fsRead(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, {
            flag: "r",
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
    let fileName = await fsRead("./data/text1.txt");
    const content = await fsRead("./data/" + fileName + ".txt");
    console.log(content)
}
ddd()