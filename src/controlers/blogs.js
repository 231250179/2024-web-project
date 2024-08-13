const {exeSQL} = require('../mySQL_work/link.js')






const getlist = (author) => {//在这里可以看见此用户的文章
    let sql = `select title,circle_name from artical where `;
    if (author !== ' '){
        sql += `author='${author}' `;
    }else {
        sql += `1=1 `;
    }

    console.log(sql);
    console.log( 'well',exeSQL(sql));
    return exeSQL(sql);

}
const getdetail = (id) => {
    let sql = `select title,circle_name from artical where author='${id}' `;

    return exeSQL(sql).then(rows => {
        console.log(rows);
        return rows;
    });




}

//创建博客方法
const createNewBlog = (postData = {} ) => {
    //
    console.log("postData",postData);
    const title = postData.title;
    const author = postData.name;
    const context = postData.context;
    const circle_name = postData.circle_name;
    const createAt = postData.create_time;
    const checking = `select * from circle where circle_name='${circle_name}' `;
    let jud1 = 0;
    if (exeSQL(checking) !== "Promise { <pending> }") {
        jud1 =1;
    }
    if (author === ''){
        jud1 = 2;
    }

    if (jud1 === 1){
        const sql = `insert into artical values ("${title}", "${author}",${createAt},"${circle_name}" ,'${context}')`;
        return  exeSQL(sql).then(insertResult => {

            console.log(insertResult);
            return {
                id: "new pages insert in it"
            }
        })
    }else if(jud1 === 0){
        const sql = `select * from circle`;
        return  exeSQL(sql).then(insertResult => {

            console.log(insertResult);
            return {
                id: "we can't find the right circle"
            }
        })

    }else {

        const sql = `select name from users`;
        return  exeSQL(sql).then(insertResult => {
            console.log(insertResult);
            return {
                id: "please make sure you have log_in"
            }
        })
    }



}

//书写文章的函数
const updateBlog = (blogData) => {
    console.log(blogData);
    return {
        id: 2
    }
}

//删除文章的方法
const deleteBlog = (blogId) => {
    console.log(blogId);
    return {
        id: 3
    }
}

const try_in = (name,password) => {
    let sql = `select * from users where `;
    if (name !== ' '){
        sql += `name='${name}' `;
    }
    if (password !== ' ') {
        sql += `and password=${password}`;
    }
    console.log(sql);
    console.log(exeSQL(sql));

    if (exeSQL(sql) !== 'Promise { <pending> }'){
        return {
            id: "Welcome"
        }
    }else {
        return {
            id: "sorry we can't find the user"
        }
    }
}

const try_new = (name,password) => {
    let sql = `select * from users where name='${name}'`;
    let jud1 = 0;
    if (exeSQL(sql) !== "Promise { <pending> }"){
        jud1 = 1;
    }
    if(jud1 === 0){
        const sql = `insert into users values ("${name}", "${password}")`;
        return  exeSQL(sql).then(insertResult => {

            console.log(insertResult);
            return {
                id: "now you can use the circle to work"
            }
        })
    }else {
        return {
            id : "sorry your name have to change"
        }
    }



}



const getfile = (user_name,title,circle) =>{
    let sql = `select title,author,context from artical where author='${user_name}'  `;
    if (title !== ''){
        sql += `and title='${title}' `;
    }
    if (circle !== ''){
        sql += `and circle_name='${circle}' `;
    }
    console.log(sql);
    return  exeSQL(sql).then(insertResult => {

        console.log(insertResult);
        return {
            id: 1
        }
    })


}

const getCircle = (circle_name,file_name) =>{
    if (file_name === ''){
        let sql = `select title,author,context,create_time from artical where circle_name = '${circle_name}' `;
        return  exeSQL(sql);
    }else {
        let sql = `select title,author,context from artical where circle_name='${circle_name}' and title='${file_name}' `;
        let sql1 = `select * from messages where title='${file_name}'and circle_name='${circle_name}'`;

        return exeSQL(sql1);
    }

}

const createnewcircle = (postdata = {}) =>{
    const circle_name = postdata.circle_name;
    const checking = `select * from circle where circle_name='${circle_name}' `;
    let jud1 = 0;
    if (exeSQL(checking) !== "Promise { <pending> }") {
        jud1 =1;
    }
    if (jud1 === 1){
        const sql = `insert into circle values ("${circle_name}")`;
        return  exeSQL(sql).then(insertResult => {
            console.log(insertResult);
            return {
                id: "new circle have created"
            }
        })
    }

}

const adding = (postdata = {},circle_name) =>{
    const name = postdata.name || '';
    const argument = postdata.argument;
    const title = postdata.title;
    let sql = `insert into users values ("${name}", "${argument}","${circle_name}","${title}")`;
    return  exeSQL(sql).then(insertResult => {
        console.log(insertResult);
        return {
            id: "new messages have added"
        }
    })
}


module.exports = {
    getlist,
    getdetail,
    createNewBlog,
    updateBlog,
    deleteBlog,
    try_in,
    getfile,
    getCircle,
    try_new,
    createnewcircle,
    adding
}
