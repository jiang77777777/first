//引入核心库
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//调用vuex插件
Vue.use(Vuex)

//引入封装好modules模块
import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import banner from './modules/banner'
import member from './modules/member'
import seck from './modules/seck'

//导出实例化的仓库
export default new Vuex.Store({
    state: {
        // userInfo:null
        //如果本地存储有值，把字符串数据转化成对象使用
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
    },
    getters: {
        //返回一个state的userInfo
        getUserInfo(state) {
            return state.userInfo
        }
    },
    mutations: {
        //修改userInfo的state
        CHANGE_USER(state, payload) {
            state.userInfo = payload
                //如果这个payload有值 我们就存到本地存储否则就删除本地存储
            if (payload) {
                sessionStorage.setItem('userInfo', JSON.stringify(payload))
            } else {
                sessionStorage.removeItem('userInfo')
            }
        }
    },
    actions: {
        //创建一个修改userInfoactions
        changeUserInfoAction({ commit }, payload) {
            commit('CHANGE_USER', payload)
        }
    },
    modules: {
        menu,
        role,
        user,
        cate,
        specs,
        goods,
        banner,
        member,
        seck
    }
})