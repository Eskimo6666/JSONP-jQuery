var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('指定一个端口号鸭！\nnode server.js 8888 <-这样子的')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method


    console.log('包含查询字符串的路径\n' + pathWithQuery)

    if (path === '/') {
        var string = fs.readFileSync('./index.html', 'utf8')
        var amount = fs.readFileSync('./db', 'utf8')
        string = string.replace('&&amount&&', amount)
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(string)
        response.end()
    } else if (path === '/style.css') {
        var string = fs.readFileSync('./style.css', 'utf8')
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(string)
        response.end()
    } else if (path === '/main.js') {
        var string = fs.readFileSync('./main.js', 'utf8')
        response.setHeader('Content-Type', 'application/javascript;charset=utf-8')
        response.write(string)
        response.end()
    } else if (path === '/pay') {
        var amount = fs.readFileSync('./db', 'utf8')
        var newAmount = amount - 1
        if (Math.random() > 0.5) {
            fs.writeFileSync('./db', newAmount)
            response.setHeader('Content-Type','application/javascript')
            response.statusCode = 200
            response.write(`
                ${query.callback}.call(undefined, {
                    "success":true,
                    "left":${newAmount}
                })
                
            `)
        } else {
            response.write("alert('打钱失败')")
        }

        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write('找不到对应路径，需要自行修改')
        response.end()
    }
})

server.listen(port)
console.log('监听' + port + '成功\n请用在空中体720度然后用电饭煲打开 http://localhost:' + port)