let events = require("events");
let fs = require("fs");

let ee = new events.EventEmitter();

fs.readFile("./test.txt", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        ee.emit("fileReadSuccess", data)
    }
})
ee.on("fileReadSuccess", (data) => {
    console.log(data.toString())
    console.log("先吃饭")

})
ee.on("fileReadSuccess", () => {
    console.log("再睡觉")

})