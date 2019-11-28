function fun1(){
    return new Promise((resolve,rejects)=>{
        resolve('ok')   //成功
        rejects('err')   //失败
    })
}

function fun2(){
    return new Promise((resolve,rejects)=>{
        resolve('ok')   //成功
        rejects('err')   //失败
    })
}

fun1()
.then(()=>{
    return fun2()
})
.then(()=>{
    console.log('ok')
    throw new Error('手动终止链式')
})
.catch((err)=>{
    console.log(err)
})