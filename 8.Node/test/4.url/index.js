const url = require("url")

let urlObj = url.parse("https://search.bilibili.com/all?keyword=node&from_source=nav_search_new")
// console.log(urlObj)


//axios 同一前端与node请求，需要安装
const axios = require("axios")
// console.log(axios)
axios.get("https://www.dytt8.net/index.htm").then((res) => {
    // console.log(res)
})

//爬虫技巧 cheerio
const cheerio = require("cheerio")
axios.get("https://www.doutula.com/").then((res) => {
    let $ = cheerio.load(res.data)
    $(".random_picture .pic-content a img.image_dta").each((index, item) => {
        console.log($(item).attr("data-original"))
    })
})