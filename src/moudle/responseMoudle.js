class BaseMoudle {
    constructor(data , message) {
        if (typeof(data) === 'string') {
            this.message = data;
            data = null;
            message = null;
        }
        if (data){
            this.data = data;
        }
        if (message){
            this.message = message;
        }


    }

}

//数据获取成功
class SuccessMoudel extends BaseMoudle {
    constructor(data , message) {
        super(data,message);
        this.errno = 0;
    }
}


//数据获取失败
class ErrorMoudel extends BaseMoudle {
    constructor(data , message) {
        super(data,message);
        this.errno = -1;
    }
}

module.exports = {
    SuccessMoudel,
    ErrorMoudel
}