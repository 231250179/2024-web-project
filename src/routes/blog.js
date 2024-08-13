const {SuccessMoudel} = require("../moudle/responseMoudle");
const {getlist , getdetail,createNewBlog,updateBlog,deleteBlog,try_in,getfile,getCircle,try_new,createnewcircle,adding} = require("../controlers/blogs");




const handleBlogRoute = (req , res) => {
    //定义处理逻辑
    let have_log = 0;
    let user_name;
    const method = req.method;
    const id = req.query.id;


//用户登录专用菜单(这里是用来检查有没有账号的）
    if (req.path === '/blog/log_in' ) {
        if (method === 'POST'){
            const postdata = req.body;
            const name = postdata.name;
            const password = postdata.password;
            const feed_back = try_in(name,password);
            console.log(feed_back);
            if (feed_back.id === "Welcome") {
                have_log = 1;
                user_name = name;
            }
            console.log(user_name,have_log);

        }



    }
//没有用户的注册
    if (req.path === '/blog/new_user' && method === 'POST') {
        const postdata = req.body;
        const name = postdata.name;
        const password = postdata.password;
        const feed_back = try_new(name,password);




    }
//用户的个人界面（要在后面加入用户名和密码才可使用,否则会报错的）
    if (req.path === '/blog/user_only' && method === 'GET') {


        //这个数据是用来传值的，数值来自于登录的返回值
        const author = req.query.author || ' ';
        const keyword = req.query.password || ' ';
        const feed_back = try_in(author,keyword);
        console.log(feed_back);
        if (feed_back.id === "Welcome") {
            user_name = author;
        }
        console.log(user_name);
        const listDataPromise = getdetail(user_name);
        return listDataPromise.then((listData) => {
            return new SuccessMoudel(listData);
        });

    }
    if (method === 'POST' && req.path === '/blog/user_only' ) {
        const postdata = req.body;
        const title = postdata.title || '';
        const circle = postdata.circle_name || '';
        const user_name = req.query.author || ' ';
        const file = getfile(user_name,title,circle);

        return file.then((newBlogData) => {
            return new SuccessMoudel(newBlogData);
        })




    }
//针对某个圈文章的浏览 以及在某特定文章后面的评价浏览
    if (method === 'GET' && req.path === '/blog/circle_view') {
        const circle_name = req.query.circle_name || '';
        const filename = req.query.filename || '';
        const getcircle = getCircle(circle_name,filename);
        return getcircle.then((listData) => {
            return new SuccessMoudel(listData);
        });

    }
//针对看见的东西进行评论
    if (method === 'POST' && req.path === '/blog/circle_view' ) {
        const postdata = req.body;
        const circle_name = req.query.circle_name || '';
        const add_messages = adding(postdata,circle_name);
        return add_messages.then((newBlogData) => {
            return new SuccessMoudel(newBlogData);
        })
    }
//新创建的兴趣圈
    if (method === 'POST' && req.path === '/blog/create_circle') {
        const postData = req.body;
        const newBlogDataPromise = createnewcircle(postData);
        return newBlogDataPromise.then((newBlogData) => {
            return new SuccessMoudel(newBlogData);
        })

    }
//用户个人信息活跃度菜单(GET基本语法）
    if (method === 'GET' && req.path === '/blog/list') {


        const author = req.query.author || ' ';

        const listDataPromise = getlist(author);
        return listDataPromise.then((listData) => {
            return new SuccessMoudel(listData);
        });




    }
//新写文章（POST基本语法）
    if (method === 'POST' && req.path === '/blog/create_file') {
        const postData = req.body;
        const newBlogDataPromise = createNewBlog(postData);
        return newBlogDataPromise.then((newBlogData) => {
            return new SuccessMoudel(newBlogData);
        })

    }
//私下对文章的更改
    if (method === 'POST' && req.path === '/blog/update') {
        const postData = req.body;
        const UpdateBlogData = updateBlog(postData);

        return new SuccessMoudel(UpdateBlogData);
    }
//清除文章
    if (method === 'POST' && req.path === '/blog/delete') {
        const postData = req.body;
        const DeleteBlogData = deleteBlog(postData);
        return new SuccessMoudel(DeleteBlogData);
    }

}

module.exports = handleBlogRoute;
