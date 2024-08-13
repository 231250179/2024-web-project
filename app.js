
const querystring = require("querystring");
const cors = require("cors");
const express = require("express");
const handleBlogRoute = require('./src/routes/blog');
const app = express();
//浏览器预设
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST'){
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json'){
            resolve({});
            return;
        }
        let postData = '';
        req.on('data', (chunk) => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            if (!postData){
                resolve({});
                return;
            }
            resolve(
                JSON.parse(postData)
            );
        })
    });
    return promise;
};
const serverHanderler = (req , res) => {
    res.setHeader("Content-Type", "application/json");
//    res.setHeader("Access-Control-Allow-Origin", "*");
//获取 path
    const url = req.url;
    req.path = url.split('?')[0];
//获取 query
    req.query = querystring.parse(url.split('?')[1]);
//cors处理跨域
    app.use(cors({
        origin: 'http://localhost:3080',
    }));
//处理Post数据
    getPostData(req).then((postData) => {
        req.body = postData;
        //路由
        const blogDataPromise = handleBlogRoute(req,res);

        if (blogDataPromise) {
            blogDataPromise.then((blogData) => {
                res.end(
                    JSON.stringify(blogData)
                );
            });
            return;
        }
        res.writeHead(404,{'Content-Type': 'text/plain'});
        res.write('404 Not Found');
        res.end();
    })
}
module.exports = serverHanderler;