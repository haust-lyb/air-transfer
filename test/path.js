var http = require("http")
var url = require('url')

http.createServer((request,response)=>{

    response.writeHead(200,{"Content-type":"text/html;charset='utf-8'"});
    response.write("<head><meta charset='utf-8'></head>")
    response.write(JSON.stringify(request));
    response.end("hello world")
}).listen(9090)