const fs = require('fs');
const path = require('path');
//使用promise
function getFileContents(filename) {
    const promise = new Promise((resolve, reject) => {
        // 数据绝对路径
        const fullfilename = path.resolve(__dirname,'data', filename);
        fs.readFile(fullfilename,  (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(
                JSON.parse(data.toString())
            );
        })

    });
    return promise;

}

getFileContents('a.json').then((aData) =>{
    console.log('aData',aData);

    return getFileContents(JSON.stringify(aData.next));
}).then((bData) => {
    console.log('bData',bData);
})