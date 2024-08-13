const mysql = require("mysql");

const { sql_config } = require('../config/mySQL_surround')

const connection = mysql.createConnection(sql_config)
//开始连接
connection.connect();
//执行指令,这里的命令要用字符串
//const sql = 'select * from users';
//function runSQL (sql){
  //  connection.query(sql, (err, result) => {
    //    if (err) {
    //        console.error(err);
    //        return;
    //    }
    //    console.log(result);
    //    const data = result;
    //    console.log(data[0].name);
//
  //  })
//}

//runSQL(sql);

function exeSQL (sql){
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    })
    return promise;
}
module.exports = {
    exeSQL
}