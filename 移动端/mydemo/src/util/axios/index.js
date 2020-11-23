import http from './axios'

//封装接口
// 封装前台轮播图获取接口
export function getBanner(){
    return http.get('/getbanner')
}
//封装获取商品信息(首页)
export function getIndexGoods(){
    return http.get('/getindexgoods')
}

//封装一个获取分类树形结构
export function getCateTree(){
    return http.get('/getcatetree')
}

//封装一个getgoods获取商品分类
export function getGoods(params){
    return http.get('/getgoods',{
        params
    })
}

//获取一个商品信息
export function getGoodsInfo(params){
    return http.get('/getgoodsinfo',{
        params
    })
}

//获取登录接口
export function getLogin(data){
    return http.post('/login',data)
}

//获取一个商品信息
export function getRegister(data){
    return http.post('/register',data)
}

//购物车列表
export function getCartList(params){
    return http.get('/cartlist',{
        params
    })
}


//购物车添加
export function getCartAdd(data){
    return http.post('/cartadd',data)
}

//购物车删除
export function getCartDelete(data){
    return http.post('/cartdelete',data)
}